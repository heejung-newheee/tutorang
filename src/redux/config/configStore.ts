import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../modules/user';
import matchSlice from '../modules/matching';

const store = configureStore({
  reducer: {
    user: userSlice,
    match: matchSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
