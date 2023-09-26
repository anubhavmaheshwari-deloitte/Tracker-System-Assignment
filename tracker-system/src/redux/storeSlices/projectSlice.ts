import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllProjects } from "../../api/api";

interface Project {
  projectID: string;
  projectName: string;
  projectStartDate: string;
  projectEndDate: string;
  projectOwner: {
    id: number;
    name: string;
    email: string;
    teamName: string;
    desination: string;
  };
}

interface initialState {
  loading: boolean;
  projects: Project[];
  selected: Project | null | undefined;
  error: string;
}

const initialStateValue: initialState = {
  loading: false,
  projects: [],
  selected: null,
  error: "",
};

const projectSlice = createSlice({
  name: "projects",
  initialState: initialStateValue,
  reducers: {
    changeSelectedProject: (
      state,
      action: PayloadAction<Project | undefined>,
    ) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllProjects.fulfilled,
      (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
        state.selected = action.payload[0];
        state.error = "";
      },
    );
    builder.addCase(getAllProjects.rejected, (state, action) => {
      state.loading = false;
      state.projects = [];
      state.selected = null;
      state.error = action.error.message ?? "Something Went Wrong";
    });
  },
});

export default projectSlice.reducer;
export const { changeSelectedProject } = projectSlice.actions;
