import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button, Container } from "reactstrap";
import "./login.css";

class Login extends Component {
  
  handleClick = e => {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");
//uses OAuth.io to authenticate user and stores token needed for API calls.
    window.OAuth.popup("spotify", { cache: true }).done(spotify => {
    console.log("loggedIn")
      // do some stuff with result
        this.props.setLoginStatus(true);
    });
  };

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
