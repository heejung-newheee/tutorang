import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type PageState = {
  currentPageNum: number | undefined;
};

const initialState: PageState = {
  currentPageNum: 1,
};

const PageNumSlice = createSlice({
  name: 'pageNum',
  initialState,
  reducers: {
    setPageNum: (state, action: PayloadAction<number | undefined>) => {
      state.currentPageNum = action.payload;
      return state;
    },
  },
});

export default PageNumSlice.reducer;
export const { setPageNum } = PageNumSlice.actions;
