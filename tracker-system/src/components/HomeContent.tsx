import React from "react";
import ProjectBoard from "./HomeContents/projectBoard";
import CreateIssues from "./HomeContents/createIssues";
import CreateProject from "./HomeContents/createProject";
import { tabs } from "../utils/constants";
import { useAppSelector } from "../redux/hooks";

const HomeContent = () => {
  const selectedTab = useAppSelector((state) => state.tabs);
  if (selectedTab === tabs.PROJECT_BOARD) return <ProjectBoard />;
  else if (selectedTab === tabs.CREATE_ISSUES) return <CreateIssues />;
  else if (selectedTab === tabs.CREATE_PROJECT) return <CreateProject />;
  else return <div>Error!!!!</div>;
};

export default HomeContent;
