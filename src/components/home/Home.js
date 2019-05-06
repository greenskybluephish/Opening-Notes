import React, { Component } from "react"
import { Container } from "reactstrap"



export default class Home extends Component {

  // state = {
  //   token: "",
  //   deviceId: "",
  //   loggedIn: false,
  //   error: "",
  //   playerCheckInterval: null,
  //   quizTracks: [],
  //   currentTrack: "",
  //   nextTrack: "",
  //   nextStart: 0,
  //   offset: 1,
  //   startQuiz: false
  // }






  render() {
      return (
        <Container>
          <div className="App">
            <div>
              <h2> Welcome to Phish Quiz! </h2>
            </div>
          </div>
        </Container>
      )
    }
  }