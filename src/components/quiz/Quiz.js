import React, { Component } from "react";
import { Jumbotron } from "reactstrap";

import QuizBox from "../quiz/QuizBox";
import quizAPI from "../../modules/jsonAPIManager";
import QuizHeader from "./QuizHeader";

export default class Quiz extends Component {
  state = {
    quizTracks: [],
    offset: 0,
    startQuiz: false,
    clipLength: ""
  };

  selectQuiz = quizId => {
    quizAPI.getOneEntry("quizs", quizId).then(quiz => {
      let quizTrackInfo = quiz.quizTrackIds;
      let quizTracks = [];
      while (quizTrackInfo.length !== 0) {
        let randomIndex = Math.floor(Math.random() * quizTrackInfo.length);
        quizTracks.push(quizTrackInfo[randomIndex]);
        quizTrackInfo.splice(randomIndex, 1);
      }

      this.setState({
        quizTracks: quizTracks,
        startQuiz: true,
        quizDescription: quiz.quizDescription,
        clipLength: quiz.clipLength,
        quizName: quiz.quizName,
        quizId: quizId
      });
    });
  };

  endQuiz = () => {
    this.setState({ startQuiz: false, quizTracks: [] });
  };

  render() {
    return (
      <Jumbotron color="default">
        <div className="App">
          {!this.state.startQuiz && <QuizHeader selectQuiz={this.selectQuiz} />}

          {this.state.startQuiz && (
            <>
              <h2>{this.state.quizName}</h2>
              <p>{this.state.quizDescription}</p>
              <QuizBox
                endQuiz={this.endQuiz}
                quizTracks={this.state.quizTracks}
                deviceId={this.props.deviceId}
                player={this.props.player}
                clipLength={this.state.clipLength}
                currentUser={this.props.currentUser}
                quizId={this.state.quizId}
              />
            </>
          )}
        </div>
      </Jumbotron>
    );
  }
}
