import { URIEncodedQuestionId } from '@/types/Question';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GivenAnswer = {
  questionId: URIEncodedQuestionId;
  answerId: string;
  value: string;
};
export type AnswersState = Record<URIEncodedQuestionId, GivenAnswer>;

const initialState: AnswersState = {};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    answerGiven(state, action: PayloadAction<GivenAnswer>) {
      state[action.payload.questionId] = action.payload;
    },
    answerDeleted(
      state,
      action: PayloadAction<Pick<GivenAnswer, 'questionId'>>,
    ) {
      const { [action.payload.questionId]: keyToDelete, ...newState } = state;

      return newState;
    },
  },
});

export const { answerGiven, answerDeleted } = answersSlice.actions;

export default answersSlice.reducer;
