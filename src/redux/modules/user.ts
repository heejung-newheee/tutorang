import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TypeSigninUserDataForRedux = {
  age?: number | null;
  avatar_url?: string | null;
  basic_authority?: boolean;
  birth?: string | null;
  deleted_at?: string | null;
  email?: string | null;
  gender?: string | null;
  id: string;
  location1_gugun?: string | null;
  location1_sido?: string | null;
  location2_gugun?: string | null;
  location2_sido?: string | null;
  role?: string | null;
  updated_at?: string | null;
  username?: string | null;
  signinProvider?: string;
  signinProviders?: string[];
};
interface UserState {
  user: TypeSigninUserDataForRedux | null;
}
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TypeSigninUserDataForRedux>) => {
      state.user = action.payload;
    },

    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { setUser, logOutUser } = userSlice.actions;
