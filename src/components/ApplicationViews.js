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
import spotifyAPI from "../modules/spotifyAPIManager"
import "../assets/scss/blk-design-system.scss"
import "../assets/css/nucleo-icons.css"


class ApplicationViews extends Component {
  state = {
    userLoggedIn: false,
    currentUser: "",
    deviceId: "",
    users: [],
    playerIsReady: false
  };

  componentDidMount() {

    quizAPI.getAll("users").then(userArray => {
      this.setState({ users: userArray });
    });
    if (
      localStorage.getItem("oauthio_cache") !== null &&
      this.props.userLoggedIn === false
    ) {
        this.setLoginStatus(
          parseInt(sessionStorage.getItem("currentUser"))
        );
      }
    }

  connectSpotifyPlayer = (sdk) => {
    let connected = sdk.connect();
    if (connected) {    
    sdk.addListener('ready', async ({ device_id }) => {
    await spotifyAPI.transferPlayback(device_id)
    const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
      if (iframe) {
        iframe.style.display = 'block';
        iframe.style.position = 'absolute';
        iframe.style.top = '-1000px';
        iframe.style.left = '-1000px';
      }
      this.setState({playerIsReady: true})
      console.log("true")
    })
  }
  }




  setLoginStatus = (id) => {
    this.props.setLoginStatus(true)
    this.setState({currentUser: id });
    playback.sPlayer().then(data => {
      this.connectSpotifyPlayer(data)
      this.setState({player: data, deviceId: data._options.id}) 
    })
  };

  render() {
    return (
      <React.Fragment>
        <AuthRoute
          path="/"
          Destination={Home}
          userLoggedIn={this.props.userLoggedIn}
          player={this.state.player}
          deviceId={this.state.deviceId}
          playerIsReady={this.state.playerIsReady}>
          </AuthRoute>
        <Route
          path="/login"
          render={() => {
            return (
              <Login
                userLoggedIn={this.props.userLoggedIn}
                setLoginStatus={this.setLoginStatus}
                users={this.state.users}
              />
            );
          }}
        />
        <AuthRoute
          path="/create"
          Destination={Create}
          deviceId={this.state.deviceId}
          currentUser={this.state.currentUser}
          player={this.state.player}
        />
        <AuthRoute
          path="/quiz"
          Destination={Quiz}
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
