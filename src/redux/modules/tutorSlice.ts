import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Views } from '../../supabase/database.types';

interface tutorState {
  tutor: Views<'tutor_info_join'>[] | null;
}
const initialState: tutorState = {
  tutor: null,
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    tutorInfo: (state, action: PayloadAction<Views<'tutor_info_join'>[]>) => {
      state.tutor = action.payload;
    },
  },
});

export default tutorSlice.reducer;
export const { tutorInfo } = tutorSlice.actions;
