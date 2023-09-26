import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { tabs } from "../../utils/constants";

const initialState: number = tabs.PROJECT_BOARD;

const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<number>) =>
      (state = action.payload),
  },
});

export default tabSlice.reducer;
export const { changeTab } = tabSlice.actions;
