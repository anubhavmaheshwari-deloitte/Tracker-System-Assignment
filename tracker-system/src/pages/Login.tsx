import React from "react";
import windowDimensions from "../utils/windowDimensions";
import "./../styles/login.scss";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) {
     return <div>Loading ...</div>;
  }

  const handleLogin = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: '/home' });
  };

  const handleLogout = async () => {
    await oktaAuth.signOut();
  };

  return (
    // <div id="home">
    //   <Link to="/">Home</Link> | &nbsp;
    //   <Link id="protected" to="/protected">
    //     Protected
    //   </Link>{" "}
    //   | &nbsp;
    //   {authState.isAuthenticated ? (
    //     <button id="logout-button" type="button" onClick={handleLogout}>
    //       Logout
    //     </button>
    //   ) : (
    //     <button id="login-button" type="button" onClick={handleLogin}>
    //       Login
    //     </button>
    //   )}
    // </div>

    <div
      className="login"
      style={{
        width: windowDimensions().innerWidth,
        height: windowDimensions().innerHeight,
      }}
    >
      <div className="left-navigation">
        <img className="icon" src={require("./../assets/Login/Icon.png")} />
        <img
          className="undraw-sorting"
          alt="Undraw sorting"
          src={require("./../assets/Login/undraw_sorting_thoughts_re_fgli 1.png")}
        />
        <div className="mat-btn">
          <div className="content">
            <img
              className="translate-white"
              alt="Translate white"
              src={require("./../assets/Login/translate_white_24dp 1.png")}
            />
            <div className="text-2">LANGUAGE</div>
          </div>
        </div>
      </div>
      <div className="group">
        <div className="heading-project">Login</div>
        {authState?.isAuthenticated ? (
          <button className="button-view-insights" onClick={handleLogout}>
            <div className="text">LOGOUT via OKTA SSO</div>
          </button>
        ) : (
          <button className="button-view-insights" onClick={handleLogin}>
            <div className="text">LOGIN via OKTA SSO</div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
