import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tables } from '../../supabase/database.types';

const initialState: Tables<'user'>[] = [];

const userSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    patchUser: (state, action) => {},
  },
});

export default userSlice.reducer;
export const { patchUser } = userSlice.actions;
