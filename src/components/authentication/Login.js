import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Button, Container } from 'reactstrap';
import "./login.css"


class Login extends Component {

  // Downloads oauth.js from CDN, pretty much like adding external scripts
  componentDidMount () {

  
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    this.props.authenticateUser()
    

      
  }

  componentDidUpdate(prevProps) {
    if (prevProps.access_token !== this.props.access_token) {
      this.props.history.push("/home")
    }
  }
  

  render() {
    return (
    <Container>
    
    <h1>Welcome to Common Ground</h1>
    <h3>Please log in to continue</h3>
    <Button onClick={this.handleClick.bind(this)} size="lg" bg-color="#E3E0DA" >
             <span className="fa fa-spotify"></span> Sign in with Spotify
           </Button>
           </Container>
    )}
}

export default withRouter(Login)