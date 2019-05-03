import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Test from "./test/Test"

class ApplicationViews extends Component {
  state = {
    isLoggedIn: false,
    access_token: ""
  };

  isAuthenticated = () => sessionStorage.getItem("access_token");

    componentDidMount() {
    if (this.state.access_token === "") {
      this.setState({access_token: sessionStorage.getItem("access_token"), isLoggedIn: true})
    }
  }



  authenticateUser = () => {
    window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");

    window.OAuth.popup("spotify", { cache: true }).done(spotify => {
      sessionStorage.setItem("access_token", spotify.access_token);
      this.setState({access_token: spotify.access_token})
      // do some stuff with result
      spotify.me().then(data => {
        sessionStorage.setItem("username", data.name);

})})}

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (!this.isAuthenticated()) {
              return <Redirect to="/login" />;
            } else {
              return <Redirect to="/home" />;
            }
          }}
        />
        <Route
          path="/home"
          render={() => {
            if (!this.isAuthenticated()) {
              return <Redirect to="/login" />;
            } else {
            return <Home access_token={this.state.access_token} currentUser={this.state.currentUser} />;
          }}}
        />
        <Route
          path="/login"
          render={() => {
            return <Login access_token={this.state.access_token} authenticateUser={this.authenticateUser} />;
          }}
        />
          <Route
          path="/test"
          render={() => {
            return <Test access_token={this.state.access_token} currentUser={this.state.currentUser} />;
          }}
        />
    </React.Fragment>
    );
  }
}



export default ApplicationViews