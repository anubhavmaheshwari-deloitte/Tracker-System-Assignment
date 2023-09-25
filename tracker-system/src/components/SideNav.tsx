import React from "react";
import "./../styles/Home/sideNav.scss";
import { tabs } from "../utils/constants";
const SideNav = ({
  selectedTab,
  changeTab,
}: {
  selectedTab: number;
  changeTab: any;
}) => {
  return (
    <div className="sideNavigation">
      <img
        className="icon"
        alt="Icon"
        src={require("./../assets/Home/Icon.png")}
      />
      <div className="sideNavButtonGroup">
        <button
          className={
            selectedTab === tabs.PROJECT_BOARD ? "contentWrapperSelected" : "contentWrapper"
          }
          onClick={() => changeTab(tabs.PROJECT_BOARD)}
        >
          <div
            className={selectedTab === tabs.PROJECT_BOARD ? "rectangleSelected" : "rectangle"}
          />
          <div className="content">
            <div className={selectedTab === tabs.PROJECT_BOARD ? "textSelected" : "text"}>
              PROJECT BOARD
            </div>
          </div>
        </button>
        <button
          className={
            selectedTab === tabs.CREATE_ISSUES ? "contentWrapperSelected" : "contentWrapper"
          }
          onClick={() => changeTab(tabs.CREATE_ISSUES)}
        >
          <div
            className={selectedTab === tabs.CREATE_ISSUES ? "rectangleSelected" : "rectangle"}
          />
          <div className="content">
            <div className={selectedTab === tabs.CREATE_ISSUES ? "textSelected" : "text"}>
              CREATE ISSUES
            </div>
          </div>
        </button>
        <button
          className={
            selectedTab === tabs.CREATE_PROJECT ? "contentWrapperSelected" : "contentWrapper"
          }
          onClick={() => changeTab(tabs.CREATE_PROJECT)}
        >
          <div
            className={selectedTab === tabs.CREATE_PROJECT ? "rectangleSelected" : "rectangle"}
          />
          <div className="content">
            <div className={selectedTab === tabs.CREATE_PROJECT ? "textSelected" : "text"}>
              CREATE PROJECT
            </div>
          </div>
        </button>
      </div>
      <button className="mat-btn">
        <div className="content">
          <img
            className="translate-white"
            alt="Translate white"
            src={require("./../assets/translate_white_24dp 1.png")}
          />
          <div className="text">LANGUAGE</div>
        </div>
      </button>
    </div>
  );
};

export default SideNav;
