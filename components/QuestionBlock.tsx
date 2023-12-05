import { Answer } from '@/types/Answer';
import AnswerButton from './AnswerButton';

export type QuestionProps = {
  questionId: string;
  title: string;
  answers: Answer[];
};

const QuestionBlock: React.FC<QuestionProps> = ({
  title,
  answers,
  questionId,
}) => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-[30px] text-primary'>{title}</h1>
      <ul className='flex flex-col gap-5'>
        {answers.map((answer) => (
          <AnswerButton
            key={answer.id}
            id={answer.id}
            value={answer.value}
            nextQuestionId={answer.nextQuestionId}
            questionId={questionId}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuestionBlock;
