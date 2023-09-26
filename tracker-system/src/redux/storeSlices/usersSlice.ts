import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllUsers } from "../../api/api";

interface User {
  id: number;
  name: string;
  email: string;
  teamName: string;
  desination: string;
}

interface initialState {
  loading: boolean;
  users: User[];
  error: string;
}

const initialStateValue: initialState = {
  loading: false,
  users: [],
  error: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialStateValue,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      },
    );
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message ?? "Something Went Wrong";
    });
  },
});

export default usersSlice.reducer;
