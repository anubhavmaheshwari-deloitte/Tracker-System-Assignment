import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./storeSlices/projectSlice";
import tabReducer from "./storeSlices/tabSlice";
import issueReducer from "./storeSlices/issuesSlice";
import userReducer from "./storeSlices/usersSlice";

const store = configureStore({
  reducer: {
    projects: projectReducer,
    tabs: tabReducer,
    issues: issueReducer,
    users: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
