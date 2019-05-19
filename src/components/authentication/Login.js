import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Container } from "reactstrap";
import "./login.css";
import quizAPI from "../../modules/jsonAPIManager";

class Login extends Component {



  handleClick = e => {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");
    //uses OAuth.io to authenticate user and stores token needed for API calls.
    window.OAuth.popup("spotify", { cache: true }).done(spotify => {
      sessionStorage.setItem("access_token", spotify.access_token);

      spotify.me().done(data => {
        let spotifyUsername = data.name;
        let registeredUser = this.props.users.find(
          user => user.spotifyUsername === spotifyUsername
        );
        if (registeredUser) {
          this.props.setLoginStatus(registeredUser.id);
          sessionStorage.setItem("currentUser", registeredUser.id);
        } else {
          let newUser = {
            spotifyUsername: spotifyUsername,
            displayName: spotifyUsername
          };

          quizAPI.postOne("users", newUser).then(() => {
            quizAPI.getAll("users").then(userArray => {
              let registeredUser = userArray.find(
                user => user.spotifyUsername === spotifyUsername
              );
              sessionStorage.setItem("currentUser", registeredUser.id);
              this.props.setLoginStatus(registeredUser.id);
            });
          });
        }
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userLoggedIn !== this.props.userLoggedIn || this.props.userLoggedIn === true) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <Container className="login">
        <h1 >Opening Notes</h1>
        <h3 className="login-heading">A quiz app for concert goers.</h3>
        <h4 className="login-heading">Click the Spotify logo to begin</h4>
        <img id="spotify-login" src={require(`../../images/320px-Spotify_logo_horizontal_black.jpg`)} onClick={this.handleClick}/>
          {/* <span className="fa fa-spotify" /> Sign in with Spotify */}
        {/* </img> */}
      </Container>
    );
  }
}

export default withRouter(Login);
