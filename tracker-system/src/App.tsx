import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import {
  Security,
  SecureRoute,
  LoginCallback,
  useOktaAuth,
} from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Login from "./pages/Login";
import Home from "./pages/Home";
import config from "./config";
import Profile from "./Profile";
import "./App.css";

const LoginOrHome: React.FC = (props: any) => {
  const { oktaAuth, authState } = useOktaAuth();
  console.log(authState);
  if (!authState) return <div>Loading ...</div>;
  else if (!authState?.isAuthenticated) {
    return <Redirect to="/login" />;
  } else return <Redirect to="/home" />;
};

const oktaAuth = new OktaAuth(config.oidc);
const App: React.FC = () => {
  const history = useHistory();
  const restoreOriginalUri = async (
    _oktaAuth: OktaAuth,
    originalUri: string | undefined,
  ) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Route path="/login" component={Login} />
      <Route path="/login/callback" component={LoginCallback} />
      <SecureRoute path="/home" component={Home} />
      <SecureRoute path="/profile" component={Profile} />
      <Route exact path="/" component={LoginOrHome}></Route>
    </Security>
  );
};

export default App;
