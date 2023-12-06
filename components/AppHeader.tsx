import Chevron from '@/public/chevron.svg';
import WhiteChevron from '@/public/chevron_white.svg';
import LogoBlack from '@/public/logo_black.png';
import LogoWhite from '@/public/logo_white.png';
import { NativeHTMLProps } from '@/types/NativeHTMLProps';
import Container from './Container';
import Image from 'next/image';
import clsx from 'clsx';
import { QuestionVariant, URIEncodedQuestionId } from '@/types/Question';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/store';
import { answerDeleted } from '@/redux/answers.slice';

export type AppHeaderProps = {
  questionId: URIEncodedQuestionId;
  previousQuestionId?: URIEncodedQuestionId | null;
  variant?: QuestionVariant;
} & Pick<NativeHTMLProps<HTMLElement>, 'className'>;

const AppHeader: React.FC<AppHeaderProps> = ({
  previousQuestionId = null,
  variant = 'light',
  className,
  questionId,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handBackButtonClick = (toQuestionId: URIEncodedQuestionId) => {
    dispatch(
      answerDeleted({
        questionId,
      }),
    );
    router.push(getQuestionUrl(toQuestionId));
  };

  return (
    <header className={clsx('h-[54px] flex items-center w-full', className)}>
      <Container className='relative'>
        {previousQuestionId && (
          <button onClick={() => handBackButtonClick(previousQuestionId)}>
            <Image
              src={variant === 'light' ? Chevron : WhiteChevron}
              width={24}
              height={24}
              alt='Go to the previous question'
            />
          </button>
        )}
        <Image
          src={variant === 'light' ? LogoBlack : LogoWhite}
          width={24}
          height={24}
          alt='Nebula Logo'
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        />
      </Container>
    </header>
  );
};

export default AppHeader;
