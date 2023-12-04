import Chevron from '@/public/chevron.svg';
import LogoBlack from '@/public/logo_black.png';
import LogoWhite from '@/public/logo_white.png';
import { NativeHTMLProps } from '@/types/NativeHTMLProps';
import Container from './Container';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { QuestionVariant } from '@/types/Question';
import { getQuestionUrl } from '@/utils/getQuestionUrl';

export type AppHeaderProps = {
  previousQuestionId?: string | null;
  variant?: QuestionVariant;
} & Pick<NativeHTMLProps<HTMLElement>, 'className'>;

const AppHeader: React.FC<AppHeaderProps> = ({
  previousQuestionId = null,
  variant = 'light',
  className,
}) => {
  return (
    <header className={clsx('h-[54px] flex items-center w-full', className)}>
      <Container className='relative'>
        {previousQuestionId && (
          <Link href={getQuestionUrl(previousQuestionId)}>
            <Image
              src={Chevron}
              width={24}
              height={24}
              alt='Go to the previous question'
              style={{
                fill: variant === 'light' ? '#333333' : '#FBFBFF',
              }}
            />
          </Link>
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
