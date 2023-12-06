import { answerGiven } from '@/redux/answers.slice';
import { useAppDispatch } from '@/redux/store';
import { Answer } from '@/types/Answer';
import { QuestionVariant, URIEncodedQuestionId } from '@/types/Question';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import clsx from 'clsx';
import { useRouter } from 'next/router';

export type AnswerButtonProps = {
  questionId: URIEncodedQuestionId;
  variant: QuestionVariant;
} & Omit<Answer, 'dependents'>;

const AnswerButton: React.FC<AnswerButtonProps> = ({
  questionId,
  nextQuestionId,
  value,
  id: answerId,
  variant,
}) => {
  const dispatch = useAppDispatch();
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
