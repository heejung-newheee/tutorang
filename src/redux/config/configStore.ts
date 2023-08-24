import { configureStore } from '@reduxjs/toolkit';
import { modalSlice, userSlice } from '../modules';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
