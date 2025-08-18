import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
