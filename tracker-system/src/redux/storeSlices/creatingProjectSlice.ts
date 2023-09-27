import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createProject } from "../../api/api";

interface APIStatus {
  loading: boolean;
  response: any;
  error: string;
}

const initialStateValue: APIStatus = {
  loading: false,
  response: null,
  error: "",
};

const creatingPojectSlice = createSlice({
  name: "creatingProject",
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createProject.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.response = action.payload;
        state.error = "";
      },
    );
    builder.addCase(createProject.rejected, (state, action) => {
      state.loading = false;
      state.response = null;
      state.error = action.error.message ?? "Something Went Wrong";
    });
  },
});

export default creatingPojectSlice.reducer;
