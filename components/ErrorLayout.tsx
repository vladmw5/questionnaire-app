import clsx from 'clsx';
import AppHeader from './AppHeader';
import Container from './Container';
import { Open_Sans } from 'next/font/google';

export type ErrorLayoutProps = {
  children: React.ReactNode;
};

const openSans = Open_Sans({ subsets: ['latin'] });

const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <main className={clsx(openSans.className, 'min-h-screen pb-5 bg-powder')}>
      <AppHeader className='mb-5' previousQuestionId={null} questionId={''} />
      <Container simple>{children}</Container>
    </main>
  );
};

export default ErrorLayout;
