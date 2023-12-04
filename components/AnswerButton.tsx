import { Answer } from '@/types/Answer';
import { getQuestionUrl } from '@/utils/getQuestionUrl';
import Link from 'next/link';

export type AnswerButtonProps = Omit<Answer, 'id'>;

const AnswerButton: React.FC<AnswerButtonProps> = ({
  nextQuestionId,
  value,
}) => {
  return nextQuestionId ? (
    <Link href={getQuestionUrl(nextQuestionId)} className='btn'>
      {value}
    </Link>
  ) : (
    <button className='btn' type='button'>
      {value}
    </button>
  );
};

export default AnswerButton;
