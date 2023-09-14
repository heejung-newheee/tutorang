import { configureStore } from '@reduxjs/toolkit';
import { modalSlice, userSlice, matchSlice, reviewSlice, PageNumSlice, toastSlice } from '../modules';
import tutorSlice from '../modules/tutorSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    tutor: tutorSlice,
    match: matchSlice,
    modal: modalSlice,
    review: reviewSlice,
    PageNum: PageNumSlice,
    toast: toastSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
