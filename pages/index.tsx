import ErrorLayout from '@/components/ErrorLayout';
import { myQuestionnaire } from '@/data/questionnaire';
import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';

export const getServerSideProps = (async () => {
  const firstQuestion =
    QuestionnaireBuilder.getFirstQuestionOf(myQuestionnaire);

  if (!firstQuestion) {
    return {
      props: {
        errorMessage: `The app has failed to resolve the questionnaire entry point.
          The entry question must have previousQuestionId set to null`,
      },
    };
  }

  return {
    redirect: {
      destination: getQuestionUrl(firstQuestion.id),
      permanent: false,
    },
  };
}) satisfies GetServerSideProps;

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ errorMessage }) => {
  return (
    <ErrorLayout>
      <p className='text-lg text-center text-primary'>{errorMessage}</p>
    </ErrorLayout>
  );
};

export default Home;
