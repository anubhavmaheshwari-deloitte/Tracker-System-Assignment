import React from "react";
import "./../../../styles/Home/ProjectBoard/blankProjectBoard.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { changeTab } from "../../../redux/storeSlices/tabSlice";
import { tabs } from "../../../utils/constants";
const BlankProjectBoard = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="blankProjectContainer">
      <h4 className="projectHeading">Welcome to Tracker</h4>
      <p className="projectBody">
        Seems like you haven’t created any project yet.{" "}
        <a
          onClick={() => dispatch(changeTab(tabs.CREATE_PROJECT))}
          className="link"
        >
          Click here
        </a>{" "}
        to onboad a new project.
      </p>
      <img
        className="blankProjectBackground"
        src={require("./../../../assets/Home/undraw_content_re_33px (1) 1.png")}
      />
    </div>
  );
};
export default BlankProjectBoard;
