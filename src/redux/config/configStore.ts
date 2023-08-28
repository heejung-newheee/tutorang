import { configureStore } from '@reduxjs/toolkit';
import { modalSlice, userSlice, matchSlice, reviewSlice } from '../modules';

const store = configureStore({
  reducer: {
    user: userSlice,
    match: matchSlice,
    modal: modalSlice,
    review: reviewSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
