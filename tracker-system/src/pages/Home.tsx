import React, { useState } from "react";
import { useOktaAuth, withOktaAuth } from "@okta/okta-react";
import "./../styles/home.scss";
import windowDimensions from "../utils/windowDimensions";
import SideNav from "../components/SideNav";
import HomePageHeader from "../components/HomePageHeader";
import HomeContent from "../components/HomeContent";
import { tabs } from "../utils/constants";


const Home: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [selectedTab, setSelectedTab] = useState<number>(tabs.PROJECT_BOARD);
  
  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const logout = async () => {
    await oktaAuth.signOut();
  };

  // let body = null;
  // if (authState?.isAuthenticated) {
  //   body = (
  //     <div className="Buttons">
  //       <button onClick={logout}>Logout</button>
  //     </div>
  //   );
  // } else {
  //   body = (
  //     <div className="Buttons">
  //       <button onClick={login}>Login</button>
  //     </div>
  //   );
  // }

  return (
    <div
      className="home"
      style={{
        width: windowDimensions().innerWidth,
        height: windowDimensions().innerHeight,
      }}
    >
      <SideNav
        selectedTab={selectedTab}
        changeTab={(tab: number) => {
          setSelectedTab(tab);
        }}
      />
      <div className="mainContent">
        <HomePageHeader selectedTab={selectedTab}/>
        <HomeContent selectedTab={selectedTab} />
      </div>
    </div>
  );
};

export default withOktaAuth(Home);
