import { Answer, CreateAnswerDto } from './Answer';

export type URIEncodedQuestionId = string;
export type QuestionVariant = 'light' | 'dark';

export type Question = {
  id: URIEncodedQuestionId;
  dependsOn: URIEncodedQuestionId[];
  title: string;
  answers: Answer[];
  previousQuestionId: string | null;
  variant: QuestionVariant;
  subtitle: string | null;
};

export type CreateQuestionDto = {
  id: URIEncodedQuestionId;
  title: string;
  answers: CreateAnswerDto[];
  previousQuestionId: string | null;
  dependsOn?: URIEncodedQuestionId[];
  variant?: QuestionVariant;
  subtitle?: string | null;
};
