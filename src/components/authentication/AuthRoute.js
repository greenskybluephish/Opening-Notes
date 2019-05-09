import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  if (localStorage.getItem("oauthio_cache") !== null) {
    return true;
  } else {
    return false;
  }
};

const AuthRoute = ({ path, Destination, ...superProps }) => {
  return (
    <Route
      exact
      path={path}
      render={props => {
        if (isAuthenticated()) {
          return <Destination {...props} {...superProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default AuthRoute;
