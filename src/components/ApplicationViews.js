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
    deviceId: "",
    loggedIn: false,
    error: "",
    playerCheckInterval: null,
    userLoggedIn: false,
    currentUser: ""
  };

    componentDidMount() {
      if (localStorage.getItem("oauthio_cache") !== null && this.state.userLoggedIn === false) {
        this.setLoginStatus(true);
      }
    }

    setLoginStatus = (status) => {
      this.setState({userLoggedIn: status})
      const spotifyRequest = window.OAuth.create("spotify");
      const accessToken = spotifyRequest.access_token
      this.setState({access_token: accessToken})
            // check every second for the player.
      this.playerCheckInterval = setInterval(() => this.checkForPlayer(accessToken), 1000);
  }


    checkForPlayer = (token) => {
  
      if (window.Spotify !== null) {
        clearInterval(this.playerCheckInterval);

        this.player = new window.Spotify.Player({
          name: "Brians's Spotify Player",
          getOAuthToken: cb => { cb(token); },
        });
  
        this.createEventHandlers();
  
        // finally, connect!
        this.player.connect();
      }
    }

    createEventHandlers = () => {
      this.player.on('initialization_error', e => { console.error(e); });
      this.player.on('authentication_error', e => {
        console.error(e);
        this.setState({ loggedIn: false });
      });

      this.player.on('account_error', e => { console.error(e); });
      this.player.on('player_state_changed', state => { console.log(state); });
  
      // Ready
      this.player.on('ready', async data => {
        const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
        if (iframe) {
          iframe.style.display = 'block';
          iframe.style.position = 'absolute';
          iframe.style.top = '-1000px';
          iframe.style.left = '-1000px';
        }
        let { device_id } = data;
         await this.setState({ deviceId: device_id, loggedIn: true });
         console.log("Quiz time!");
      });
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
          }}}
        />
        <AuthRoute
          path="/home"
          Destination={Home} access_token={this.state.access_token}
        />
        <Route
          path="/login"
          render={() => {
            return <Login userLoggedIn={this.state.userLoggedIn} setLoginStatus={this.setLoginStatus}/>;
          }}
        />
        <AuthRoute
          path="/test"
          Destination={Test} access_token={this.state.access_token}
        />
          <AuthRoute
          path="/quiz"
          Destination={Quiz} access_token={this.state.access_token} deviceId={this.state.deviceId}
        />
    </React.Fragment>
    );
  }
}



export default ApplicationViews