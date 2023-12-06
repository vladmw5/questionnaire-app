import ErrorLayout from '@/components/ErrorLayout';
import { useRouter } from 'next/router';

const Error404Page = () => {
  const router = useRouter();

  const handleGoBackClick = () => {
    router.back();
  };

  return (
    <ErrorLayout>
      <p className='text-lg text-center text-primary mb-5'>
        This page does not exist
      </p>
      <button className='btn' onClick={handleGoBackClick}>
        Go back
      </button>
    </ErrorLayout>
  );
};

export default Error404Page;
