import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Button, Container } from 'reactstrap';
import "./login.css"


class Login extends Component {


  handleClick = (e) => {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
      window.OAuth.initialize("rKtNmq0HtvZws6tMLOJFcXiyypo");
  
      window.OAuth.popup("spotify", { cache: true }).done(spotify => {
        sessionStorage.setItem("access_token", spotify.access_token);
        // do some stuff with result
        spotify.me().then(data => {
          sessionStorage.setItem("username", data.name);
          this.props.history.push("/home")
  })})}



  render() {
    return (
    <Container>
    
    <h1>Welcome to Common Ground</h1>
    <h3>Please log in to continue</h3>
    <Button onClick={this.handleClick} size="lg" bg-color="primary" >
             <span className="fa fa-spotify"></span> Sign in with Spotify
           </Button>
           </Container>
    )}
}

export default withRouter(Login)