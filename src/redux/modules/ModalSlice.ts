import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = {
  type: string;
  isOpen: boolean;
};

const initialState: ModalState = {
  type: '',
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
