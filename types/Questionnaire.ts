import { Question } from './Question';

export type Questionnaire = {
  name: string;
  questions: Record<keyof any, Question>;
};
