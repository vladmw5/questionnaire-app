import { Answer } from '@/types/Answer';
import AnswerButton from './AnswerButton';
import { QuestionVariant } from '@/types/Question';
import clsx from 'clsx';

export type QuestionProps = {
  questionId: string;
  title: string;
  answers: Answer[];
  variant: QuestionVariant;
  subtitle: string | null;
  centerText: boolean;
  subtitleBold: boolean;
};

const QuestionBlock: React.FC<QuestionProps> = ({
  title,
  answers,
  questionId,
  variant,
  subtitle,
  centerText,
  subtitleBold,
}) => {
  return (
    <div>
      <h1
        className={clsx(
          'text-2xl font-bold',
          subtitle ? 'mb-5' : 'mb-[30px]',
          centerText && 'text-center',
          variant === 'light' ? 'text-primary' : 'text-secondary',
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <h2
          className={clsx(
            'mb-10',
            centerText && 'text-center',
            variant === 'light' ? 'text-primary' : 'text-secondary',
            subtitleBold ? 'text-lg font-bold' : 'text-sm leading-[1.7857]',
          )}
        >
          {subtitle}
        </h2>
      )}
      <ul className='flex flex-col gap-5'>
        {answers.map((answer) => (
          <li key={answer.id}>
            <AnswerButton
              key={answer.id}
              id={answer.id}
              value={answer.value}
              nextQuestionId={answer.nextQuestionId}
              questionId={questionId}
              variant={variant}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionBlock;
