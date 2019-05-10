import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Create from "./test/Create";
import AuthRoute from "./authentication/AuthRoute";
import Quiz from "./quiz/Quiz";
import quizAPI from "../modules/jsonAPIManager";
import Profile from "./profile/Profile";
import playback from "../modules/spotifyPlayback"


class ApplicationViews extends Component {
  state = {
    access_token: "",
    userLoggedIn: false,
    currentUser: "",
    deviceId: "",
    users: []
  };

  componentDidMount() {

    quizAPI.getAll("users").then(userArray => {
      this.setState({ users: userArray });
    });
    if (
      localStorage.getItem("oauthio_cache") !== null &&
      this.state.userLoggedIn === false
    ) {
        this.setLoginStatus(
          true,
          parseInt(sessionStorage.getItem("currentUser"))
        );
      }
    }


  setLoginStatus = (status, id) => {
    this.setState({ userLoggedIn: status, currentUser: id });

    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token;
    sessionStorage.setItem("access_token", accessToken);
    this.setState({ access_token: accessToken });
    playback.sPlayer().then(data => {
      this.setState({player: data, deviceId: data._options.id}) 
    })
  };

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
          Destination={Home}
          userLoggedIn={this.state.userLoggedIn}
          player={this.state.player}
          access_token={this.state.access_token}
          deviceId={this.state.deviceId}
        />
        <Route
          path="/login"
          render={() => {
            return (
              <Login
                userLoggedIn={this.state.userLoggedIn}
                setLoginStatus={this.setLoginStatus}
                users={this.state.users}
                currentUser={this.state.currentUser}
              />
            );
          }}
        />
        <AuthRoute
          path="/create"
          Destination={Create}
          access_token={this.state.access_token}
          deviceId={this.state.deviceId}
          currentUser={this.state.currentUser}
          player={this.state.player}
        />
        <AuthRoute
          path="/quiz"
          Destination={Quiz}
          access_token={this.state.access_token}
          deviceId={this.state.deviceId}
          player={this.state.player}
        />
        <AuthRoute
          path="/profile"
          Destination={Profile}
          currentUser={this.state.currentUser}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews;
