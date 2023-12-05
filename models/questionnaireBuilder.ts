import { Answer, CreateAnswerDto } from '@/types/Answer';
import {
  CreateQuestionDto,
  Question,
  URIEncodedQuestionId,
} from '@/types/Question';
import { Questionnaire } from '@/types/Questionnaire';
import { deepCopyOf } from '@/utils/deepCopyOf';

export class QuestionnaireBuilder {
  constructor(
    private _name: string = 'New Quiz',
    private _questions: Record<URIEncodedQuestionId, Question> = {},
  ) {}

  static createAnswer(fromDto: CreateAnswerDto): Answer {
    return {
      id: fromDto.id,
      value: fromDto.value,
      nextQuestionId: fromDto.nextQuestionId,
    };
  }

  static createQuestion(fromDto: CreateQuestionDto): Question {
    return {
      id: fromDto.id,
      title: fromDto.title,
      answers: fromDto.answers.map((answerDto) =>
        QuestionnaireBuilder.createAnswer(answerDto),
      ),
      previousQuestionId: fromDto.previousQuestionId,
    };
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
