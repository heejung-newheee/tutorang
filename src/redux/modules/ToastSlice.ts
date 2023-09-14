import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type toastState = {
  id: number;
  message: string;
  type: string;
};

export type toastMessageType = {
  toasts: toastState[];
};

const initialState: toastMessageType = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toastNotification',
  initialState,
  reducers: {
    displayToast: (state, action: PayloadAction<toastState>) => {
      state.toasts.push({
        id: action.payload.id,
        message: action.payload.message,
        type: action.payload.type,
      });
    },

    removeToast: (state, action: PayloadAction<number>) => {
      const toastIndex = state.toasts.findIndex((toastItem) => toastItem.id === action.payload);
      state.toasts.splice(toastIndex, 1);
    },

    hideToast: (state) => {
      state.toasts.shift();
    },
  },
});

export const displayToastAsync = createAsyncThunk<void, toastState>('toast/showToastAsync', async (message, { dispatch }) => {
  dispatch(toastSlice.actions.displayToast(message));
  await new Promise((resolve) => setTimeout(resolve, 13000));
  dispatch(toastSlice.actions.hideToast());
});

export default toastSlice.reducer;
export const { displayToast, hideToast, removeToast } = toastSlice.actions;
