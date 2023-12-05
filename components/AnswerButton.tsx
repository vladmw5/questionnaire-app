import { answerGiven } from '@/redux/answers.slice';
import { Answer } from '@/types/Answer';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export type AnswerButtonProps = { questionId: string } & Omit<Answer, 'id'>;

const AnswerButton: React.FC<AnswerButtonProps> = ({
  questionId,
  nextQuestionId,
  value,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <button
      className='btn'
      onClick={() => {
        dispatch(
          answerGiven({
            questionId,
            value,
          }),
        );
        if (nextQuestionId) {
          router.push(getQuestionUrl(nextQuestionId));
        }
      }}
    >
      {value}
    </button>
  );
};

export default AnswerButton;
