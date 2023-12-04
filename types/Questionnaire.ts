import { Question, URIEncodedQuestionId } from './Question';

export type Questionnaire = {
  name: string;
  questions: Record<URIEncodedQuestionId, Question>;
};
