import { URIEncodedQuestionId } from '@/types/Question';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AnswersState = Record<URIEncodedQuestionId, string>;
export type GivenAnswer = {
  questionId: string;
  value: string;
};

const initialState: AnswersState = {};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    answerGiven(state, action: PayloadAction<GivenAnswer>) {
      return {
        ...state,
        [action.payload.questionId]: action.payload.value,
      };
    },
  },
});

export const { answerGiven } = answersSlice.actions;

export default answersSlice.reducer;
