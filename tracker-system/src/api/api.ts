import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/constants";

const headers = {
  userID: 1,
};
const headers1 = {
  userID: "A01",
};
interface projectData {
  projectName: string;
  projectOwner: number;
  projectStartDate: string;
  projectEndDate: string;
}
export const getAllUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { teamName, userID }: { teamName?: string | null; userID?: number | null },
    thunkAPI,
  ) => {
    var params = {};
    try {
      if (teamName !== null && teamName !== undefined)
        params = { ...params, teamName: teamName };
      if (userID !== null && userID !== undefined)
        params = { ...params, userID: userID };
      return await axios
        .get(baseUrl + "/user", { params })
        .then((res) => res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const getIssues = createAsyncThunk(
  "issues/fetchIssues",
  async (
    {
      projectID,
      issueID,
    }: {
      projectID: string | null | undefined;
      issueID: string | null | undefined;
    },
    thunkAPI,
  ) => {
    var params = {};
    try {
      if (projectID !== null && projectID !== undefined)
        params = { ...params, projectID };
      if (issueID !== null && issueID !== undefined)
        return await axios
          .get(baseUrl + "/issue/" + issueID, { headers: headers1 })
          .then((res) => res.data);
      else
        return await axios
          .get(baseUrl + "/issue", { params, headers: headers1 })
          .then((res) => res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const getAllProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (arg, thunkAPI) => {
    try {
      return await axios
        .get(baseUrl + "/project", { headers })
        .then((res) => res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);

export const createProject = createAsyncThunk(
  "projects/postProject",
  async ({data} : {data: projectData}, thunkAPI) => {
    try {
      return await axios
        .post(baseUrl + "/project", data, { headers })
        .then((res) => res.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
);
