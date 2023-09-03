import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = {
  type: string;
  isOpen?: boolean;
  targetId?: string | number | null;
  matchingId?: string | null;
  message?: string | null;
};

const initialState: ModalState = {
  type: '',
  isOpen: false,
  targetId: '',
  matchingId: '',
  message: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.type = action.payload.type;
      state.targetId = action.payload.targetId;
      state.matchingId = action.payload.matchingId;
      state.message = action.payload.message;
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
