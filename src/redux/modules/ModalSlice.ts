import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ModalState = {
  type: string;
  isOpen?: boolean;
  targetId?: string | number | null;
  matchingId?: string | null;
  userId?: string;
  message?: string | null;
  file?: File | null;
};

const initialState: ModalState = {
  type: '',
  isOpen: false,
  targetId: '',
  matchingId: '',
  userId: '',
  message: '',
  file: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.type = action.payload.type;
      state.targetId = action.payload.targetId;
      state.userId = action.payload.userId;
      state.matchingId = action.payload.matchingId;
      state.message = action.payload.message;
      state.isOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeModal: (state) => {
      state.isOpen = false;
      document.body.style.overflow = '';
    },

    successModal: (state, action: PayloadAction<Omit<ModalState, 'type'>>) => {
      state.isOpen = false;
      if (action?.payload.targetId) state.targetId = action.payload.targetId;
      if (action?.payload.matchingId) state.matchingId = action.payload.matchingId;
      if (action?.payload.userId) state.userId = action.payload.userId;
      if (action?.payload.message) state.message = action.payload.message;
      if (action?.payload.file) state.file = action.payload.file;
    },

    //make clear modal function
    clearModal: (state) => {
      state.type = '';
      state.isOpen = false;
      state.targetId = '';
      state.matchingId = '';
      state.userId = '';
      state.message = '';
      state.file = null;
    },

    setTargetId: (state, action: PayloadAction<string>) => {
      state.targetId = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const { openModal, closeModal, setTargetId, successModal } = modalSlice.actions;
