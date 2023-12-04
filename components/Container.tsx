import { NativeHTMLProps } from '@/types/NativeHTMLProps';
import clsx from 'clsx';

export type ContainerProps = {
  simple?: boolean;
} & NativeHTMLProps<HTMLDivElement>;

const Container: React.FC<ContainerProps> = ({
  simple = false,
  children,
  className,
  ...nativeProps
}) => {
  return (
    <div
      className={clsx(
        'mx-auto px-[15px]',
        !simple ? 'container' : 'min-[360px]:max-w-[360px]',
        className,
      )}
      {...nativeProps}
    >
      {children}
    </div>
  );
};

export default Container;
