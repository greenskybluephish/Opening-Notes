import React, { Component } from "react"
import { Container} from "reactstrap"
import spotifyAPI from "../../modules/spotifyAPIManager"
import QuizBox from "../quiz/QuizBox"
import quizAPI from "../../modules/jsonAPIManager"
import QuizHeader from "./QuizHeader"

export default class Quiz extends Component {

  state = {
    quizTracks: [],
    offset: 0,
    startQuiz: false,
  }

  selectQuiz = (quizId) => {
    quizAPI.getOneEntry("quizs", quizId).then(quiz => {
      let quizTrackInfo = quiz.quizTrackIds
      let quizTracks = [];
      while (quizTrackInfo.length !== 0) {
        let randomIndex = Math.floor(Math.random() * quizTrackInfo.length)
          quizTracks.push(quizTrackInfo[randomIndex]);
          quizTrackInfo.splice(randomIndex, 1);
      }
      
       this.setState({ quizTracks: quizTracks, startQuiz: true})
  })
  }


  playSong = () => {
    const index = this.state.offset
    const {uri, startTime} = this.props.quizTracks[index]
    spotifyAPI.put.playOneSong(uri, startTime, this.props.deviceId)
  }


  handlePlay = () => {
    this.playSong();
      setTimeout(() => {
        spotifyAPI.put.pauseSong();
      }, this.state.clipLength);
    }
  






  render() {
      return (
        <Container>
          <div className="App">
              <h2> Phish Quiz! </h2>
      {!this.state.startQuiz && <QuizHeader selectQuiz={this.selectQuiz}></QuizHeader> }
          
      {this.state.startQuiz&& <QuizBox quizTracks={this.state.quizTracks} deviceId={this.props.deviceId}></QuizBox>}
      </div>
        </Container>
      )
      }
}