import { URIEncodedQuestionId } from '@/types/Question';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GivenAnswer = {
  questionId: string;
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
  },
});

export const { answerGiven } = answersSlice.actions;

export default answersSlice.reducer;
