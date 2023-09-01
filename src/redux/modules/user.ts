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
    setUser: (state, action: PayloadAction<Tables<'profiles'>>) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, logOutUser } = userSlice.actions;
