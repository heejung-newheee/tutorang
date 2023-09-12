import { configureStore } from '@reduxjs/toolkit';
import { modalSlice, userSlice, matchSlice, reviewSlice, PageNumSlice } from '../modules';
import tutorSlice from '../modules/tutorSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    tutor: tutorSlice,
    match: matchSlice,
    modal: modalSlice,
    review: reviewSlice,
    PageNum: PageNumSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
