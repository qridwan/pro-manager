import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: undefined,
  keyword: undefined,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSearchedData: (state, action) => {
      state.keyword = action.payload.keyword;
      state.data = action.payload.data;
    },
    clearSearchedData: (state) => {
      state.data = undefined;
      state.keyword = undefined;
    },
  },
});

export const { setSearchedData, clearSearchedData } = projectSlice.actions;
export default projectSlice.reducer;
