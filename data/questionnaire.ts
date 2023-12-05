import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';
import { createQuestionIdFrom } from '@/utils/createQuestionIdFrom';

export const genderQuestionId = createQuestionIdFrom('root-gender');
const relationshipStatusQuestionId = createQuestionIdFrom('relationship');
const singleParentQuestionId = createQuestionIdFrom('single-parent');
const parentQuestionId = createQuestionIdFrom('parent');
const inRelationshipProblemQuestionId = createQuestionIdFrom(
  'in-relationship-problem',
);
const singleProblemQuestionId = createQuestionIdFrom('single-problem');
const tendToOverthinkQuestionId = createQuestionIdFrom('tend-to-overthink');
const partnerTemperQuestionId = createQuestionIdFrom('partner-temper');
const whatIsQuestionId = createQuestionIdFrom('what-is');
const partnerGenderQuestionId = createQuestionIdFrom('partner-gender');
const importantTraitsQuestionId = createQuestionIdFrom(
  'important-traits-question-id',
);
const emotionalControlQuestionId = createQuestionIdFrom('emotional-control');
const partnerPriorityQuestionId = createQuestionIdFrom('partner-priority');
const thinkAboutQuestionId = createQuestionIdFrom('think-about');
const aboutUsQuestionId = createQuestionIdFrom('about-us');

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
        dependents: {
          [inRelationshipProblemQuestionId]: 'A woman',
          [singleProblemQuestionId]: 'woman',
        },
      },
      {
        id: 'male',
        value: 'Male',
        nextQuestionId: relationshipStatusQuestionId,
        dependents: {
          [inRelationshipProblemQuestionId]: 'A man',
          [singleProblemQuestionId]: 'man',
        },
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
        nextQuestionId: singleParentQuestionId,
      },
      {
        id: 'in-a-relationship',
        value: 'In a relationship',
        nextQuestionId: parentQuestionId,
      },
    ],
  })
  .question({
    id: singleParentQuestionId,
    title: 'Are you a single parent?',
    previousQuestionId: relationshipStatusQuestionId,
    answers: [
      {
        id: 'yes_single_parent',
        value: 'Yes',
        nextQuestionId: inRelationshipProblemQuestionId,
        dependents: {
          [inRelationshipProblemQuestionId]: ', who has children',
        },
      },
      {
        id: 'no_single_parent',
        value: 'No',
        nextQuestionId: inRelationshipProblemQuestionId,
        dependents: {
          [inRelationshipProblemQuestionId]: '',
        },
      },
    ],
  })
  .question({
    id: parentQuestionId,
    title: 'Are you a parent',
    previousQuestionId: relationshipStatusQuestionId,
    answers: [
      {
        id: 'yes_parent',
        value: 'Yes',
        nextQuestionId: singleProblemQuestionId,
        dependents: {
          [singleProblemQuestionId]: ', who has children',
        },
      },
      {
        id: 'no_parent',
        value: 'No',
        nextQuestionId: singleProblemQuestionId,
        dependents: {
          [singleProblemQuestionId]: '',
        },
      },
    ],
  })
  .question({
    id: inRelationshipProblemQuestionId,
    dependsOn: [genderQuestionId, singleParentQuestionId],
    title: `${QuestionnaireBuilder.slotFor(
      genderQuestionId,
    )}${QuestionnaireBuilder.slotFor(
      singleParentQuestionId,
    )} needs a slightly different approach to improve their relationship. Which statement best describes you?`,
    previousQuestionId: singleParentQuestionId,
    answers: [
      {
        id: 'very-unhappy',
        value: 'I’m very unhappy with how things are going in my relationship',
        nextQuestionId: tendToOverthinkQuestionId,
      },
      {
        id: 'partially-unhappy',
        value:
          'I’m unhappy with parts of my relationship, but some things are working well',
        nextQuestionId: tendToOverthinkQuestionId,
      },
      {
        id: 'generally-unhappy',
        value: 'I’m generally happy in my relationship',
        nextQuestionId: tendToOverthinkQuestionId,
      },
    ],
  })
  .question({
    id: singleProblemQuestionId,
    dependsOn: [genderQuestionId, parentQuestionId],
    title: `Single ${QuestionnaireBuilder.slotFor(
      genderQuestionId,
    )}${QuestionnaireBuilder.slotFor(
      parentQuestionId,
    )} needs a slightly different approach to find their perfect partner. But first, how did you feel in your last relationship?`,
    previousQuestionId: parentQuestionId,
    answers: [
      {
        id: 'was-unhappy',
        value: 'I was unhappy with low things were going in my relationship',
        nextQuestionId: partnerTemperQuestionId,
      },
      {
        id: 'was-unhappy-partially',
        value:
          'I was unhappy with parts of my relationship, but some thing were working',
        nextQuestionId: partnerTemperQuestionId,
      },
      {
        id: 'was-generally-happy',
        value: 'I was generally happy with my relationship',
        nextQuestionId: partnerTemperQuestionId,
      },
      {
        id: 'never-been-in-a-relationship',
        value: 'I’ve never been in a relationship',
        nextQuestionId: partnerTemperQuestionId,
      },
    ],
  })
  .question({
    id: tendToOverthinkQuestionId,
    title: 'Do you tend to overthink',
    previousQuestionId: inRelationshipProblemQuestionId,
    answers: [
      {
        id: 'yes_overthink',
        value: 'Yes',
        nextQuestionId: whatIsQuestionId,
        dependents: {
          [whatIsQuestionId]: importantTraitsQuestionId,
        },
      },
      {
        id: 'no_overthink',
        value: 'No',
        nextQuestionId: whatIsQuestionId,
        dependents: {
          [whatIsQuestionId]: emotionalControlQuestionId,
        },
      },
    ],
  })
  .question({
    id: partnerTemperQuestionId,
    title: 'Is your partner an introvert or extrovert?',
    previousQuestionId: singleProblemQuestionId,
    answers: [
      {
        id: 'introvert',
        value: 'Introvert',
        nextQuestionId: partnerGenderQuestionId,
      },
      {
        id: 'extrovert',
        value: 'Extrovert',
        nextQuestionId: partnerGenderQuestionId,
      },
      {
        id: 'a-bit-of-both',
        value: 'A bit of both',
        nextQuestionId: partnerGenderQuestionId,
      },
    ],
  })
  .question({
    id: whatIsQuestionId,
    dependsOn: [tendToOverthinkQuestionId],
    title: 'So how does it work?',
    previousQuestionId: tendToOverthinkQuestionId,
    variant: 'dark',
    subtitle:
      'We analyze hundreds of data points to create your unique astrological blueprint. This is combined with AI to tailor-make your astrological insights, based on your answers. We’re going to change your relationship with astrology.',
    centerText: true,
    answers: [
      {
        id: 'what-is-next',
        value: 'Next',
        nextQuestionId: QuestionnaireBuilder.slotFor(tendToOverthinkQuestionId),
      },
    ],
  })
  .question({
    id: partnerGenderQuestionId,
    title: "What is your partner's gender",
    previousQuestionId: partnerTemperQuestionId,
    answers: [
      {
        id: 'male_partner',
        value: 'Male',
        nextQuestionId: partnerPriorityQuestionId,
      },
      {
        id: 'female_partner',
        value: 'Female',
        nextQuestionId: partnerPriorityQuestionId,
      },
    ],
  })
  .question({
    id: importantTraitsQuestionId,
    title: 'What is most important to you?',
    previousQuestionId: whatIsQuestionId,
    answers: [
      {
        id: 'success',
        value: 'Success',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: importantTraitsQuestionId,
        },
      },
      {
        id: 'romance',
        value: 'Romance',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: importantTraitsQuestionId,
        },
      },
      {
        id: 'stability',
        value: 'Stability',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: importantTraitsQuestionId,
        },
      },
      {
        id: 'freedom',
        value: 'Freedom',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: importantTraitsQuestionId,
        },
      },
    ],
  })
  .question({
    id: emotionalControlQuestionId,
    title: 'Is emotional control tricky for you',
    previousQuestionId: whatIsQuestionId,
    answers: [
      {
        id: 'yes_emotional_control',
        value: 'Yes',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: emotionalControlQuestionId,
        },
      },
      {
        id: 'sometimes_emotional_control',
        value: 'Sometimes',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: emotionalControlQuestionId,
        },
      },
      {
        id: 'rarely_emotional_control',
        value: 'Rarely',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: emotionalControlQuestionId,
        },
      },
      {
        id: 'not-at-all_emotional_control',
        value: 'Not at all',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: emotionalControlQuestionId,
        },
      },
    ],
  })
  .question({
    id: partnerPriorityQuestionId,
    title: 'Do you agree with the statement below?',
    subtitle: '“My partner and I make sex a priority in our relationship”',
    centerText: true,
    subtitleBold: true,
    previousQuestionId: partnerGenderQuestionId,
    answers: [
      {
        id: 'strongly-agree',
        value: 'Strongly agree',
        nextQuestionId: thinkAboutQuestionId,
      },
      {
        id: 'agree',
        value: 'Agree',
        nextQuestionId: thinkAboutQuestionId,
      },
      {
        id: 'neutral-agree',
        value: 'Neutral',
        nextQuestionId: thinkAboutQuestionId,
      },
      {
        id: 'disagree-agree',
        value: 'Disagree',
        nextQuestionId: thinkAboutQuestionId,
      },
      {
        id: 'strongly-disagree',
        value: 'Strongly disagree',
        nextQuestionId: thinkAboutQuestionId,
      },
    ],
  })
  .question({
    id: thinkAboutQuestionId,
    title: 'When you think about your relationship goals, you feel...?',
    previousQuestionId: partnerPriorityQuestionId,
    answers: [
      {
        id: 'optimistic',
        value: 'Optimistic! They are totally doable, with some guidance.',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: thinkAboutQuestionId,
        },
      },
      {
        id: 'cautious',
        value: 'Cautious. I’ve struggled before, but I’m hopeful.',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: thinkAboutQuestionId,
        },
      },
      {
        id: 'anxious',
        value: 'I’m feeling a little anxious, honestly.',
        nextQuestionId: aboutUsQuestionId,
        dependents: {
          [aboutUsQuestionId]: thinkAboutQuestionId,
        },
      },
    ],
  })
  .question({
    id: aboutUsQuestionId,
    dependsOn: [
      importantTraitsQuestionId,
      emotionalControlQuestionId,
      thinkAboutQuestionId,
    ],
    title: 'Where did you hear about us?',
    previousQuestionId: `${QuestionnaireBuilder.slotFor(
      importantTraitsQuestionId,
    )}${QuestionnaireBuilder.slotFor(
      emotionalControlQuestionId,
    )}${QuestionnaireBuilder.slotFor(thinkAboutQuestionId)}`,
    answers: [
      {
        id: 'poster-or-billboard',
        value: 'Poster or Billboard',
        nextQuestionId: null,
      },
      {
        id: 'friend-or-family',
        value: 'Friend or Family',
        nextQuestionId: null,
      },
      {
        id: 'instagram',
        value: 'Instagram',
        nextQuestionId: null,
      },
      {
        id: 'direct-mail',
        value: 'Direct Mail or Package Insert',
        nextQuestionId: null,
      },
      {
        id: 'online-tv',
        value: 'Online TV or Streaming TV',
        nextQuestionId: null,
      },
      {
        id: 'simply-tv',
        value: 'TV',
        nextQuestionId: null,
      },
      {
        id: 'radio',
        value: 'Radio',
        nextQuestionId: null,
      },
      {
        id: 'search-engine',
        value: 'Search Engine (Google, Bing, etc.)',
        nextQuestionId: null,
      },
      {
        id: 'newspaper-or-magazine',
        value: 'Newspaper or Magazine',
        nextQuestionId: null,
      },
      {
        id: 'facebook',
        value: 'Facebook',
        nextQuestionId: null,
      },
      {
        id: 'blog-post',
        value: 'Blog Post or Website Review',
        nextQuestionId: null,
      },
      {
        id: 'Podcast',
        value: 'Podcast',
        nextQuestionId: null,
      },
      {
        id: 'influencer',
        value: 'Influencer',
        nextQuestionId: null,
      },
      {
        id: 'youtube',
        value: 'Youtube',
        nextQuestionId: null,
      },
      {
        id: 'pinterest',
        value: 'Pinterest',
        nextQuestionId: null,
      },
      {
        id: 'other',
        value: 'Other',
        nextQuestionId: null,
      },
    ],
  })
  .resolve();
