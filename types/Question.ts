import { Answer, CreateAnswerDto } from './Answer';

export type URIEncodedQuestionId = string;
export type QuestionVariant = 'light' | 'dark';

export type Question = {
  id: string;
  title: string;
  answers: Answer[];
  previousQuestionId: string | null;
};

export type CreateQuestionDto = {
  id: string;
  title: string;
  answers: CreateAnswerDto[];
  previousQuestionId: string | null;
};
