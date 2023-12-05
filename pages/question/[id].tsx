import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';
import { myQuestionnaire } from '@/data/questionnaire';
import { Question } from '@/types/Question';
import QuestionBlock from '@/components/QuestionBlock';
import Container from '@/components/Container';
import AppHeader from '@/components/AppHeader';
import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';
import { useAnswers } from '@/redux/store';

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
  const questionId = context.params?.id as string;
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
    <main>
      <AppHeader
        className='mb-5'
        previousQuestionId={resolvedQuestion.previousQuestionId}
      />
      <Container simple>
        <QuestionBlock
          title={resolvedQuestion.title}
          answers={resolvedQuestion.answers}
          questionId={resolvedQuestion.id}
        />
      </Container>
    </main>
  );
};

export default QuestionPage;
