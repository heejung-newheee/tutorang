import { configureStore } from '@reduxjs/toolkit';
import { modalSlice, userSlice, matchSlice } from '../modules';

const store = configureStore({
  reducer: {
    user: userSlice,
    match: matchSlice,
    modal: modalSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
