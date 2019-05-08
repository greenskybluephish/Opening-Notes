import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Test from "./test/Test"
import AuthRoute from "./authentication/AuthRoute"
import Quiz from "./quiz/Quiz"



class ApplicationViews extends Component {
  state = {
    access_token: "",
    userLoggedIn: false,
    currentUser: ""
 
  };

  componentDidMount() {
    if (localStorage.getItem("oauthio_cache") !== null && this.state.userLoggedIn === false) {
      this.setLoginStatus(true);
    } 
  }

  setLoginStatus = (status) => {
    this.setState({ userLoggedIn: status })
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    this.setState({ access_token: accessToken });
      
  }







  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.state.userLoggedIn) {
              return <Redirect to="/home" />;
            } else {
              return <Redirect to="/login" />;
            }
          }}
        />
        <AuthRoute
          path="/home"
          Destination={Home} access_token={this.state.access_token}
        />
        <Route
          path="/login"
          render={() => {
            return <Login userLoggedIn={this.state.userLoggedIn} setLoginStatus={this.setLoginStatus} />;
          }}
        />
        <AuthRoute
          path="/test"
          Destination={Test} access_token={this.state.access_token}
        />
        <AuthRoute
          path="/quiz"
          Destination={Quiz} player={this.player} access_token={this.state.access_token} deviceId={this.state.deviceId}
        />
      </React.Fragment>
    );
  }
}



export default ApplicationViews