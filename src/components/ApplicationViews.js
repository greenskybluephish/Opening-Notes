import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home";
import Login from "./authentication/Login";
import Create from "./test/Create"
import AuthRoute from "./authentication/AuthRoute"
import Quiz from "./quiz/Quiz"
import spotifyPlayer from "../modules/playback-function"
import quizAPI from "../modules/jsonAPIManager"


class ApplicationViews extends Component {
  state = {
    access_token: "",
    userLoggedIn: false,
    currentUser: "",
    deviceId: "",
    users: []
  };

  componentDidMount() {
    quizAPI.getAll("users").then(userArray =>{
      this.setState({users: userArray})  
    })
  if (localStorage.getItem("oauthio_cache") !== null && this.state.userLoggedIn === false) {
    if (!localStorage.getItem("oauthio_provider_spotify")) {
      localStorage.clear();
    } else {
      this.setLoginStatus(true);
    } 
  }
  }




  setLoginStatus = (status, id) => {
    this.setState({ userLoggedIn: status, currentUser: id })
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    sessionStorage.setItem("access_token", accessToken)
    this.setState({ access_token: accessToken });
    setTimeout(() => {
      spotifyPlayer.createSpotifyPlayer().then(id=> {
        this.setState({deviceId: id})
      }) 
    }, 1000)
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
          Destination={Home} userLoggedIn={this.state.userLoggedIn}
        />
        <Route
          path="/login"
          render={() => {
            return <Login userLoggedIn={this.state.userLoggedIn} setLoginStatus={this.setLoginStatus} users={this.state.users}/>;
          }}
        />
        <AuthRoute
          path="/create"
          Destination={Create} access_token={this.state.access_token}
          deviceId={this.state.deviceId}
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