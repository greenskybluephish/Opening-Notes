import React, { Component } from "react"
import { Container, Button } from "reactstrap"
import Quiz from "../quiz/Quiz"

export default class Home extends Component {


  render() {
      return (
        <Container>
          <div className="App">
          <h2> Hey bro...what song is this? </h2>
            <div>
              <Quiz          
               access_token={this.props.access_token}
              deviceId={this.props.deviceId}
              player={this.props.player}
              currentUser={this.props.currentUser}>
              </Quiz>
            </div>
          </div>
        
        </Container>
      )
    }
  }