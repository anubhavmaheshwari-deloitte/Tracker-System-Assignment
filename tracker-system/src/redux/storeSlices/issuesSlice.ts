import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getIssues } from "../../api/api";
import { issuePriority } from "../../utils/constants";

export interface Issue {
  id: string;
  summary: string;
  type: number;
  projectID: string;
  description: string;
  priority: number;
  assignee: {
    id: number;
    name: string;
    email: string;
    teamName: string;
    desination: string;
  };
  tags: string[];
  sprint: string;
  storyPoint: number;
  status: number;
  createdBy: any;
  createdOn: string;
  updatedBy: {
    id: number;
    name: string;
    email: string;
    teamName: string;
    desination: string;
  };
  updatedOn: number;
}

interface initialState {
  loading: boolean;
  issues: Issue[];
  filteredIssues: Issue[];
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const initialState: initialState = {
  loading: false,
  issues: [],
  filteredIssues: [],
  error: "",
};

const issuesSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    filterIssues: (
      state,
      action: PayloadAction<{
        assigneeId?: number | undefined;
        low?: boolean | undefined;
        medium?: boolean | undefined;
        high?: boolean | undefined;
      }>,
    ) => {
      let tempIssues: Issue[] = [...state.issues];
      if (action.payload.assigneeId)
        tempIssues = tempIssues.filter(
          (item) => item.assignee.id === action.payload.assigneeId,
        );
      let finalFilteredIssues: Issue[] = [];
      if (action.payload.low ?? false)
        finalFilteredIssues = [
          ...finalFilteredIssues,
          ...tempIssues.filter((item) => item.priority === issuePriority.LOW),
        ];
      if (action.payload.medium ?? false)
        finalFilteredIssues = [
          ...finalFilteredIssues,
          ...tempIssues.filter(
            (item) => item.priority === issuePriority.MEDIUM,
          ),
        ];
      if (action.payload.high ?? false)
        finalFilteredIssues = [
          ...finalFilteredIssues,
          ...tempIssues.filter((item) => item.priority === issuePriority.HIGH),
        ];
      //if (!action.payload.low && !action.payload.medium && !action.payload.high)
      //  finalFilteredIssues = [...tempIssues];
      state.filteredIssues = finalFilteredIssues;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIssues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getIssues.fulfilled,
      (state, action: PayloadAction<Issue[]>) => {
        state.loading = false;
        state.issues = action.payload;
        state.filteredIssues = action.payload
        state.error = "";
      },
    );
    builder.addCase(getIssues.rejected, (state, action) => {
      state.loading = false;
      state.issues = [];
      state.filteredIssues = [];
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      state.error = action.error.message ?? "Something Went Wrong";
    });
  },
});

export default issuesSlice.reducer;
export const { filterIssues } = issuesSlice.actions;
