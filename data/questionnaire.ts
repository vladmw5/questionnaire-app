import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';
import { createQuestionIdFrom } from '@/utils/createQuestionIdFrom';

export const genderQuestionId = createQuestionIdFrom('root-gender');
const relationshipStatusQuestionId = createQuestionIdFrom('relationship');

export const myQuestionnaire = new QuestionnaireBuilder()
  .name('My First Questionnaire')
  .question({
    id: genderQuestionId,
    title: 'Select your gender:',
    previousQuestionId: null,
    answers: [
      {
        id: 'female',
        value: 'Female',
        nextQuestionId: relationshipStatusQuestionId,
      },
      {
        id: 'male',
        value: 'Male',
        nextQuestionId: relationshipStatusQuestionId,
      },
    ],
  })
  .question({
    id: relationshipStatusQuestionId,
    title:
      'So we can get to know you better, tell us about your relationship status.',
    previousQuestionId: genderQuestionId,
    answers: [
      {
        id: 'single',
        value: 'Single',
        nextQuestionId: genderQuestionId,
      },
      {
        id: 'in-a-relationship',
        value: 'In a relationship',
        nextQuestionId: genderQuestionId,
      },
    ],
  })
  .resolve();
