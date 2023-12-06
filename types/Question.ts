import { Answer, CreateAnswerDto } from './Answer';

export type URIEncodedQuestionId = string;
export type QuestionVariant = 'light' | 'dark';

export type Question = {
  id: URIEncodedQuestionId;
  dependsOn: URIEncodedQuestionId[];
  title: string;
  answers: Answer[];
  previousQuestionId: URIEncodedQuestionId | null;
  hasMultiplePreviousIds: boolean;
  variant: QuestionVariant;
  subtitle: string | null;
  centerText: boolean;
  subtitleBold: boolean;
};

export type CreateQuestionDto = {
  id: URIEncodedQuestionId;
  title: string;
  answers: CreateAnswerDto[];
  previousQuestionId: URIEncodedQuestionId | null;
  hasMultiplePreviousIds?: boolean;
  dependsOn?: URIEncodedQuestionId[];
  variant?: QuestionVariant;
  subtitle?: string | null;
  centerText?: boolean;
  subtitleBold?: boolean;
};
