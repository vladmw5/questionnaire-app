import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { myQuestionnaire } from '@/data/questionnaire';
import { Question, URIEncodedQuestionId } from '@/types/Question';
import QuestionBlock from '@/components/QuestionBlock';
import Container from '@/components/Container';
import AppHeader from '@/components/AppHeader';
import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';
import { useAnswers } from '@/redux/store';
import clsx from 'clsx';

export const getStaticPaths = (async () => {
  return {
    paths: Object.keys(myQuestionnaire.questions).map((questionId) => ({
      params: {
        id: questionId,
      },
    })),
    fallback: true,
  };
}) satisfies GetStaticPaths;

export type QuestionPageStaticProps = {
  question: Question;
  questionsOnWhichThisDepends: Question[];
};

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const questionId = context.params?.id as URIEncodedQuestionId;
  const question = myQuestionnaire.questions[questionId]!;
  const questionsOnWhichThisDepends = question.dependsOn.map(
    (dependencyId) => myQuestionnaire.questions[dependencyId]!,
  );

  return {
    props: {
      question,
      questionsOnWhichThisDepends,
    },
  };
}) satisfies GetStaticProps<QuestionPageStaticProps>;

const QuestionPage: NextPage<QuestionPageStaticProps> = ({
  question,
  questionsOnWhichThisDepends,
}) => {
  const answers = useAnswers();

  const resolvedQuestion = QuestionnaireBuilder.resolveQuestionDependencies(
    question,
    questionsOnWhichThisDepends,
    answers,
  );

  return (
    <main
      className={clsx(
        'min-h-screen pb-5',
        resolvedQuestion.variant === 'light'
          ? 'bg-powder'
          : 'with-nebula-gradient',
      )}
    >
      <AppHeader
        className='mb-5'
        previousQuestionId={resolvedQuestion.previousQuestionId}
        variant={resolvedQuestion.variant}
        questionId={resolvedQuestion.id}
      />
      <Container simple>
        <QuestionBlock
          title={resolvedQuestion.title}
          subtitle={resolvedQuestion.subtitle}
          answers={resolvedQuestion.answers}
          questionId={resolvedQuestion.id}
          variant={resolvedQuestion.variant}
          centerText={resolvedQuestion.centerText}
          subtitleBold={resolvedQuestion.subtitleBold}
        />
      </Container>
    </main>
  );
};

export default QuestionPage;
