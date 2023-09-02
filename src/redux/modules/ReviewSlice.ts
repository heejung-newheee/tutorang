import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tables } from '../../supabase/database.types';

const initialState: Tables<'review'> = {
  content: '',
  created_at: '',
  id: 0,
  rating: null,
  reviewed_id: '',
  title: '',
  user_id: '',
  author: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setReview: (state, action: PayloadAction<Tables<'review'>>) => {
      state = action.payload;
      return state;
    },
  },
});

export default reviewSlice.reducer;
export const { setReview } = reviewSlice.actions;
