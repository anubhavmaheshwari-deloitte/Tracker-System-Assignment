import React, { useState } from "react";
import { useOktaAuth, withOktaAuth } from "@okta/okta-react";
import "./../styles/home.scss";
import windowDimensions from "../utils/windowDimensions";
import SideNav from "../components/SideNav";
import HomePageHeader from "../components/HomePageHeader";
import HomeContent from "../components/HomeContent";


const Home: React.FC = () => {
  //const { oktaAuth, authState } = useOktaAuth();

  // const login = async () => {
  //   await oktaAuth.signInWithRedirect();
  // };

  // const logout = async () => {
  //   await oktaAuth.signOut();
  // };

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
      <SideNav />
      <div className="mainContent">
        <HomePageHeader />
        <HomeContent />
      </div>
    </div>
  );
};

export default withOktaAuth(Home);
