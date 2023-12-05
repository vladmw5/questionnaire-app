import { configureStore } from '@reduxjs/toolkit';
import answersReducer from './answers.slice';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'questionnaire',
  storage: storage,
};

const persistedAnswerReducer = persistReducer(persistConfig, answersReducer);

export const store = configureStore({
  reducer: {
    answers: persistedAnswerReducer,
  },
  devTools: true,
});

export const persistedStore = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
