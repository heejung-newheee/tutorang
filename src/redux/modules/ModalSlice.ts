import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = {
  type: string;
  isOpen: boolean;
  targetId?: string;
};

const initialState: ModalState = {
  type: '',
  isOpen: false,
  targetId: '',
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

    setTargetId: (state, action: PayloadAction<string>) => {
      state.targetId = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal, setTargetId } = modalSlice.actions;
