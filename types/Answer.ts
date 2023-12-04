export type Answer = {
  id: string;
  value: string;
  nextQuestionId: string | null;
};

export type CreateAnswerDto = Answer;
