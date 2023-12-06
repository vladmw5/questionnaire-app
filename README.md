# Installation

## Install all the dependencies using

```bash
npm install
```

# Launching the project

## To launch the development server, run

```bash
npm run dev
```

## To run the project in the production mode, run

```bash
npm run build && npm run start
```

# Questionnaire Configuration Manual

## General

The questionnaire represents a Directed Graph-like data structure.
The application statically pre-renders all the question pages using this graph and the Next.js Static Site Generation feature.

The existing config can be found in the `data/questionnaire.ts` file. <i>This is the only file you need to edit to configure your questionnaire.</i>

## QuestionnaireBuilder API

Although nothing stops you from building the questionnaire by hand as a plain JavaScript object, I have created the `QuestionnaireBuilder` API that simplifies the process. Later in the document we will look at all the use cases this API supports.

## Use cases

### Creating a single question questionnaire

This is a very basic example the purpose of which is to demonstrate how to use the API basics.

First, create an id for your future question:

```ts
import { createQuestionIdFrom } from '@/utils/createQuestionIdFrom';

const firstQuestionId = createQuestionIdFrom('my-id');
```

A question id can be any plain string. This id will be used to keep <i>referential integrity</i> with other questions and as a future <i>route</i> of your question, so be aware that you have to URI <i>encode your id</i> in case it contains any 'special' characters. Luckily for you, I have already created a special utility function named `createQuestionIdFrom(seed)` that encodes and encrypts your id using the Caesar cipher algorithm.

Note: you can create your own method to generate ids, but the generated id must be URI encoded and the generating algorithm must be <i>pure</i>.

Now, when you have created your id, create your questionnaire with a single question:

```ts
import { createQuestionIdFrom } from '@/utils/createQuestionIdFrom';
import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';

const firstQuestionId = createQuestionIdFrom('my-id');

const myQuestionnaire = new QuestionnaireBuilder()
  .name('My first questionnaire')
  .question({
    id: firstQuestionId,
    title: 'My first question',
    previousQuestionId: null,
    answers: [
      {
        id: 'firstAnswerId',
        value: 'Choose me',
        nextQuestionId: null,
      },
      {
        id: 'secondAnswerId',
        value: 'Or me',
        nextQuestionId: null,
      },
    ],
  })
  .resolve();
```

In the example above, we use the `QuestionnaireBuilder` constructor to create our questionnaire.
<br/>

The `name()` method sets the questionnaire name (in the current implementation this property is unused).
<br/>

The `question()` method is used to generate your question from a template schema. You must specify:

`id` - the question id;

`title` - the question title;

`previousQuestionId` - self-explanatory. Since this is the first first question in our questionnaire, it must have this property set to `null`. Warning: you must have only one question with `previousQuestionId = null`, otherwise the app will fail to resolve the dependencies and find the entry point of the questionnaire.

`answers` - an array of objects each having `id` (self-explanatory, can be any string), `value` (will be displayed to the user) and `nextQuestionId` (self-explanatory, if set to `null` then this indicates that after answering of this the quiz 'ends').

The `resolve()` method returns a `Questionnaire` JavaScript object that can be JSON serialized. This object will be used by Next.js to generate paths and questions statically. Warning: don't forget to call resolve at the end, as QuestionnaireBuilder cannot be JSON serialized

Remember, a questionnaire is a graph embodied as a JavaScript object, and each graph has vertexes and arcs. <b>The questions are the vertexes and the ids are the arcs.</b>

### Creating multiple questions

You can chain `.question()` calls to create multiple questions:

```ts
import { createQuestionIdFrom } from '@/utils/createQuestionIdFrom';
import { QuestionnaireBuilder } from '@/models/questionnaireBuilder';

const genderQuestionId = createQuestionIdFrom('root-gender');
const relationshipStatusQuestionId = createQuestionIdFrom('relationship');

const myQuestionnaire = new QuestionnaireBuilder()
  .name('My Survey')
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
        nextQuestionId: null,
      },
      {
        id: 'in-a-relationship',
        value: 'In a relationship',
        nextQuestionId: null,
      },
    ],
  })
  .resolve();
```

As you can see, the first question answers are linked with the second question: when choosing either the user will be redirected to the the second question page.
<br/>

There is no difference in the order of calling the question methods, <b>the question order is defined only by the id values</b>

### Branching

If you need to branch your questionnaire, simply set question answers' `nextQuestionId` to different values:

```ts
new QuestionnaireBuilder()
  .question({
    id: 'base-id',
    title: 'Sample',
    previousQuestionId: null,
    answers: [
      {
        id: 'a1',
        value: 'A1',
        nextQuestionId: 'one-question-id', //look here
      },
      {
        id: 'a2',
        value: 'A2',
        nextQuestionId: 'another-question-id', //and here
      },
    ],
  })
  .resolve();
```

### Dynamic Question title

A dynamic question is a question some part of the content of which is dependent on the answers given to the previous questions.

The `QuestionnaireBuilder` API currently supports only three types of dynamic values:
You can have dynamic titles, nextQuestionId and previousQuestionId

To create a dynamic question you have to specify all the question ids on which this question depends in the `dependsOn` parameter as an array. Then, use the \`template string\` to set the question `title` and create slots for the future values in it using string interpolation and `QuestionnaireBuilder.slotFor()`:

```ts
const previousQuestionId = createQuestionIdFrom('prev');

new QuestionnaireBuilder()
  .question({
    id: 'base-id',
    dependsOn: [previousQuestionId],
    title: `Here is the answer on the previousQuestion: ${QuestionnaireBuilder.slotFor(
      previousQuestionId,
    )}`,
    previousQuestionId: previousQuestionId,
    answers: [],
  })
  .resolve();
```

Then, in the `previousQuestion`, for each answer specify the `dependents` property:

```ts
const previousQuestionId = createQuestionIdFrom('prev');
const currentQuestionId = createQuestionIdFrom('next');

new QuestionnaireBuilder()
  .question({
    //... other props
    answers: [
      {
        //... other answer props
        dependents: {
          [currentQuestionId]:
            'The value that will be displayed in the currentQuestionId instead of the slot if this answer has been chosen',
        },
      },
      {
        //... other answer props
        dependents: {
          [currentQuestionId]:
            'The value that will be displayed in the currentQuestionId instead of the slot if this answer has been chosen',
        },
      },
    ],
  })
  .question({
    id: currentQuestionId,
    dependsOn: [previousQuestionId],
    title: `Here is the answer on the previousQuestion: ${QuestionnaireBuilder.slotFor(
      previousQuestionId,
    )}`,
    previousQuestionId: previousQuestionId,
    answers: [],
  })
  .resolve();
```

The `dependents` property defines the value which will be substituted in the dependent question in case this answer has been chosen.

Warning: if you don't specify the `dependents` property for a question that depends on this question, you will encounter an error.

Warning: the `dependents` property must be specified for each answer of the question

Warning: currently you can create only one slot per dependent question and each answer can substitute only one value.

### Dynamic nextQuestionId

In case your answer can link to different questions depending on what answers were given previously, you can use the similar approach, but now your `nextQuestionId` should contain a slot:

```ts
new QuestionnaireBuilder()
  .question({
    id: 'qid',
    dependsOn: [tendToOverthinkQuestionId],
    title: 'Question with Dynamic next Question Id',
    previousQuestionId: tendToOverthinkQuestionId,
    answers: [
      {
        id: 'what-is-next',
        value: 'Go to next',
        nextQuestionId: QuestionnaireBuilder.slotFor(tendToOverthinkQuestionId),
      },
    ],
  })
  .resolve();
```

Warning: don't forget to specify the 'dependents' for each answer of the questions that this question depends on. 

### Dynamic previousQuestionId

In this case you have to add an additional parameter `hasMultiplePreviousIds = true` and the question's `previousQuestionId` must contain all the slots for the question's that this depends on:

```ts
new QuestionnaireBuilder()
  .question({
    id: 'qid',
    dependsOn: [tendToOverthinkQuestionId, otherDependsOnQuestionId],
    hasMultiplePreviousIds: true, //important!
    title: 'Question with Dynamic next Question Id',
    previousQuestionId: `${QuestionnaireBuilder.slotFor(
      tendToOverthinkQuestionId,
    )}${QuestionnaireBuilder.slotFor(otherDependsOnQuestionId)}`,
    answers: [
      {
        id: 'what-is-next',
        value: 'Go to next',
        nextQuestionId: null,
      },
    ],
  })
  .resolve();
```

## Styling features

You can specify `variant` of your question (`light` or `dark`), `subtitle`, `centerText` and `subtitleBold` to change the visual appearance of your questions.

## Know the limits

1. You have to always keep your eye on the referential integrity between questions. <b>Violating the integrity will make the app to crash</b>
2. The app currently handles only these two kinds of errors: `NoEntrypointQuestion` error and `PageNotFound` error. Other types may cause the app to crash.
3. There is no 'question protection' meaning that the user can use the browser address string to bypass some questions. However to do this, the user must know the question ID in advance, which is not possible unless the user passes the survey at least once
4. Read all the warning messages very carefully, it contains the additional information about all the pitfalls and other limitations.