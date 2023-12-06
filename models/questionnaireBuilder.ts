import { AnswersState } from '@/redux/answers.slice';
import { Answer, CreateAnswerDto } from '@/types/Answer';
import {
  CreateQuestionDto,
  Question,
  URIEncodedQuestionId,
} from '@/types/Question';
import { Questionnaire } from '@/types/Questionnaire';
import { deepCopyOf } from '@/utils/deepCopyOf';
import { replaceSubstring } from '@/utils/replaceSubstring';

export class QuestionnaireBuilder {
  constructor(
    private _name: string = 'New Quiz',
    private _questions: Record<URIEncodedQuestionId, Question> = {},
  ) {}

  static createAnswer(fromDto: CreateAnswerDto): Answer {
    return {
      dependents: fromDto.dependents ?? null,
      id: fromDto.id,
      value: fromDto.value,
      nextQuestionId: fromDto.nextQuestionId,
    };
  }

  static createQuestion(fromDto: CreateQuestionDto): Question {
    return {
      id: fromDto.id,
      dependsOn: fromDto.dependsOn ?? [],
      title: fromDto.title,
      answers: fromDto.answers.map((answerDto) =>
        QuestionnaireBuilder.createAnswer(answerDto),
      ),
      previousQuestionId: fromDto.previousQuestionId,
      hasMultiplePreviousIds: fromDto.hasMultiplePreviousIds ?? false,
      variant: fromDto.variant ?? 'light',
      centerText: fromDto.centerText ?? false,
      subtitle: fromDto.subtitle ?? null,
      subtitleBold: fromDto.subtitleBold ?? false,
    };
  }

  static slotFor(questionId: URIEncodedQuestionId): string {
    return `__q_id_${questionId}`;
  }

  static fillSlotsFor(
    question: Question,
    questionId: URIEncodedQuestionId,
    withValue: string,
  ): Question {
    const slotQuestionId = QuestionnaireBuilder.slotFor(questionId);
    const newQuestionTitle = replaceSubstring(
      question.title,
      slotQuestionId,
      withValue,
    );

    const newAnswers = question.answers.map((answer) =>
      QuestionnaireBuilder.createAnswer({
        ...answer,
        nextQuestionId: answer.nextQuestionId
          ? replaceSubstring(answer.nextQuestionId, slotQuestionId, withValue)
          : null,
      }),
    );

    return QuestionnaireBuilder.createQuestion({
      ...deepCopyOf(question),
      title: newQuestionTitle,
      answers: newAnswers,
    });
  }

  static fillSlotsForPreviousQuestionId(
    question: Question,
    withValue: URIEncodedQuestionId,
  ): Question {
    const newPreviousQuestionId = question.previousQuestionId
      ? withValue
      : null;

    return QuestionnaireBuilder.createQuestion({
      ...deepCopyOf(question),
      previousQuestionId: newPreviousQuestionId,
    });
  }

  static resolveQuestionDependencies(
    question: Question,
    questionsOnWhichThisDepends: Question[],
    alreadyGivenAnswers: AnswersState,
  ): Question {
    const noDependenciesLength = 0;

    if (questionsOnWhichThisDepends.length === noDependenciesLength) {
      return question;
    }

    let newQuestion = deepCopyOf(question);

    questionsOnWhichThisDepends.forEach((dependsOnQuestion) => {
      const answerValueOfWhichToSubstitute = dependsOnQuestion.answers.find(
        (answer) =>
          answer.id === alreadyGivenAnswers[dependsOnQuestion.id]?.answerId,
      );

      if (!answerValueOfWhichToSubstitute) {
        return;
      }

      const substitutionValue =
        answerValueOfWhichToSubstitute.dependents![question.id]!;

      newQuestion = QuestionnaireBuilder.fillSlotsFor(
        newQuestion,
        dependsOnQuestion.id,
        substitutionValue,
      );
      if (newQuestion.hasMultiplePreviousIds) {
        newQuestion = QuestionnaireBuilder.fillSlotsForPreviousQuestionId(
          newQuestion,
          substitutionValue,
        );
      }
    });

    return newQuestion;
  }

  static getFirstQuestionOf(
    questionnaire: Questionnaire,
  ): Question | undefined {
    return Object.values(questionnaire.questions).find(
      (question) => question.previousQuestionId === null,
    );
  }

  name(newName: string): this {
    this._name = newName;

    return this;
  }

  question(fromDto: CreateQuestionDto): this {
    this._questions[fromDto.id] = QuestionnaireBuilder.createQuestion(fromDto);
    return this;
  }

  resolve(): Questionnaire {
    return {
      name: this._name,
      questions: deepCopyOf(this._questions),
    };
  }
}
