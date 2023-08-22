import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Tables } from '../../supabase/database.types';

interface UserState {
  user: Tables<'profiles'> | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tables<'profiles'> | null>) => {
      state.user = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
