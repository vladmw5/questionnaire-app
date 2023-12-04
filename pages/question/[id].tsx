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
};

export const getStaticProps = (async (context: GetStaticPropsContext) => {
  const questionId = context.params?.id as string;

  return {
    props: {
      question: myQuestionnaire.questions[questionId]!,
    },
  };
}) satisfies GetStaticProps<QuestionPageStaticProps>;

const QuestionPage: NextPage<QuestionPageStaticProps> = ({ question }) => {
  return (
    <main>
      <AppHeader
        className='mb-5'
        previousQuestionId={question.previousQuestionId }
      />
      <Container simple>
        <QuestionBlock title={question.title} answers={question.answers} />
      </Container>
    </main>
  );
};

export default QuestionPage;
