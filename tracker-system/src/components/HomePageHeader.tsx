import React, {useState, useEffect} from "react";
import { useOktaAuth } from "@okta/okta-react";
import DropDown from "@clayui/drop-down";
import { tabs } from "../utils/constants";
import "./../styles/Home/homePageHeader.scss";
import { useAppSelector } from "../redux/hooks";

const HomePageHeader = () => {
  const selectedTab = useAppSelector(state => state.tabs);
  const { authState, oktaAuth } = useOktaAuth();
  const logout = async () => {
    await oktaAuth.signOut();
  };
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  useEffect(() => {
    if (!authState || !authState.isAuthenticated || !authState.idToken) {
      setUserInfo(null);
    } else {
      setUserInfo(authState.idToken.claims);
    }
  }, [authState, oktaAuth]);
  
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
              <div className="text">{!userInfo ? "Anjali Gupta" : Object.entries(userInfo)[1][1]}</div>
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
