import { answerGiven } from '@/redux/answers.slice';
import { Answer } from '@/types/Answer';
import { QuestionVariant } from '@/types/Question';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export type AnswerButtonProps = {
  questionId: string;
  variant: QuestionVariant;
} & Omit<Answer, 'dependents'>;

const AnswerButton: React.FC<AnswerButtonProps> = ({
  questionId,
  nextQuestionId,
  value,
  id: answerId,
  variant,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <button
      className={clsx('btn', variant === 'dark' && 'dark')}
      onClick={() => {
        dispatch(
          answerGiven({
            questionId,
            value,
            answerId,
          }),
        );
        if (nextQuestionId) {
          router.push(getQuestionUrl(nextQuestionId));
        } else {
          alert('This was the last question. Thank you!');
        }
      }}
    >
      {value}
    </button>
  );
};

export default AnswerButton;
