import { Answer } from '@/types/Answer';
import Link from 'next/link';

export type AnswerButtonProps = Omit<Answer, 'id'>;

const AnswerButton: React.FC<AnswerButtonProps> = ({
  nextQuestionId,
  value,
}) => {
  return (
    <Link href={`/question/${nextQuestionId}`} className='btn'>
      {value}
    </Link>
  );
};

export default AnswerButton;
