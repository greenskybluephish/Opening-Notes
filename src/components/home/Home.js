import React, { Component } from "react"
import { Container, Button } from "reactstrap"
import API from "../../modules/APIManager"
import QuizBox from "../quiz/QuizBox"


export default class Home extends Component {

  state = {
    token: "",
    deviceId: "",
    loggedIn: false,
    error: "",
    playerCheckInterval: null,
    quizTracks: [],
    currentTrack: "",
    nextTrack: "",
    nextStart: 0,
    offset: 1,
    startQuiz: false
  }






  render() {
      return (
        <Container>
          <div className="App">
            <div>
              <h2> Welcome to Phish Quiz! </h2>
              <Button onClick={this.handleStart}>Click Me to Start the Quiz!
            </Button>
            <Button onClick={this.testIt}>Test</Button>
            </div>
          </div>
        </Container>
      )
    }
  }