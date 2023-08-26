import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tables } from '../../supabase/database.types';

interface MatchState {
  match: Tables<'matching'>[] | null;
}

const initialState: MatchState = {
  match: null,
};

const matchSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    matchingList: (state, action: PayloadAction<Tables<'matching'>[]>) => {
      state.match = action.payload;
    },
  },
});

export default matchSlice.reducer;
export const { matchingList } = matchSlice.actions;
