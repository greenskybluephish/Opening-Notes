import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Container } from "reactstrap";
import "./login.css";
import quizAPI from "../../modules/jsonAPIManager"


class Login extends Component {
  
  handleClick = e => {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");
//uses OAuth.io to authenticate user and stores token needed for API calls.
    window.OAuth.popup("spotify", { cache: true }).done(spotify => {
    console.log("loggedIn");
    spotify.me().done(data => {
      let spotifyUsername = data.name;
      let registeredUser = this.props.users.find(user => user.spotifyUsername === spotifyUsername)
      if (registeredUser) {
        this.props.setLoginStatus(true, registeredUser.id);
        sessionStorage.setItem("currentUser", registeredUser.id)
      }
      else {
        let newUser = {
          "spotifyUsername": spotifyUsername,
          "displayName": spotifyUsername
        }
        quizAPI.postOne("users", newUser).then(()=> {
          quizAPI.getAll("users").then(userArray => {
            let registeredUser = userArray.find(user => user.spotifyUsername === spotifyUsername)
            sessionStorage.setItem("currentUser", registeredUser.id);
            this.props.setLoginStatus(true, registeredUser.id);
            
        })
      }
  )}
      // do some stuff with result
        
    });
  })};

  componentDidUpdate(prevProps) {
    if (prevProps.userLoggedIn !== this.props.userLoggedIn) {
      this.props.history.push("/home");
    }
  }

  render() {
    return (
      <Container>
        <h1>Welcome to Common Ground</h1>
        <h3>Please log in to continue</h3>
        <Button onClick={this.handleClick} size="lg" bg-color="primary">
          <span className="fa fa-spotify" /> Sign in with Spotify
        </Button>
      </Container>
    );
  }
}

export default withRouter(Login);
