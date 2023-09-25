import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import DropDown from "@clayui/drop-down";
import { tabs } from "../utils/constants";
import "./../styles/Home/homePageHeader.scss";

const HomePageHeader = ({ selectedTab }: { selectedTab: number }) => {
  const { oktaAuth } = useOktaAuth();
  const logout = async () => {
    await oktaAuth.signOut();
  };

  return (
    <header className="header">
      {selectedTab === tabs.PROJECT_BOARD ? (
        <div className="searchBarWrapper">
          <img
            className="searchIcon"
            src={require("./../assets/Home/searchIcon.png")}
          ></img>
          <input className="searchBar" placeholder="Search"></input>
        </div>
      ) : null}
      <div className="profile">
        <DropDown
          closeOnClick={true}
          alignmentPosition={3}
          trigger={
            <button className="profileButton">
              <div className="text">Anjali Gupta</div>
              <img
                className="profileIcon"
                src={require("./../assets/Home/Profile picture.png")}
              />
            </button>
          }
        >
          <DropDown.ItemList>
            <DropDown.Item className="dropdownListItem">
              <div className="dropdownText">
                <img src={require("./../assets/Home/personIcon.png")} />
                &nbsp; &nbsp; My Profile
              </div>
            </DropDown.Item>
            <DropDown.Divider />
            <DropDown.Item className="dropdownListItem" onClick={logout}>
              <div className="dropdownText">
                <img src={require("./../assets/Home/logoutIcon.png")} />
                &nbsp; Sign out
              </div>
            </DropDown.Item>
          </DropDown.ItemList>
        </DropDown>
      </div>
    </header>
  );
};

export default HomePageHeader;
