import { URIEncodedQuestionId } from './Question';

export type Answer = {
  id: string;
  value: string;
  nextQuestionId: string | null;
  dependents: Record<URIEncodedQuestionId, string> | null;
};

export type CreateAnswerDto = {
  id: string;
  value: string;
  nextQuestionId: string | null;
  dependents?: Record<URIEncodedQuestionId, string> | null;
};
