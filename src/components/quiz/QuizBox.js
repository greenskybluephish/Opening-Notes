import React, { Component } from "react";
// reactstrap components
import {
  Jumbotron,
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Label,
  Col,
  Badge
} from "reactstrap";
import "./quiz.css";
import spotifyAPI from "../../modules/spotifyAPIManager";
import quizAPI from "../../modules/jsonAPIManager";


export default class QuizBox extends Component {
  state = {
    inputAnswer: "",
    correctAnswers: 0,
    questionIndex: 0,
    disableButton: false,
    disableSubmitButton: true,
  };

  // handle the field change when the input box is edited
  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleSubmit = event => {
    const index = this.state.questionIndex;
    event.preventDefault();
    if (this.state.inputAnswer === "") {
      alert("Please enter an answer!");
    } else {
      this.toggle("disableButton");
      this.toggle("disableSubmitButton");
      let inputAnswer = this.state.inputAnswer.toLowerCase();
      let correctAnswer = this.props.quizTracks[index].name.toLowerCase();
      let form = event.target.parentNode;
      if (correctAnswer.includes(inputAnswer) && inputAnswer.length >= 3) {
        alert(`Correct, the answer is ${this.props.quizTracks[index].name}`);
        form.reset();
        this.setState({
          questionIndex: this.state.questionIndex + 1,
          correctAnswers: this.state.correctAnswers + 1
        });
      } else {
        alert(
          `Sorry, the correct answer is ${this.props.quizTracks[index].name}`
        );
        this.setState({ questionIndex: this.state.questionIndex + 1 });
        form.reset();
      }
    }
  };

  componentDidUpdate() {
    if (this.state.questionIndex === this.props.quizTracks.length) {
      let quizScore = {
        quizId: parseInt(this.props.quizId),
        userId: parseInt(this.props.currentUser),
        score: (this.state.correctAnswers*100/this.props.quizTracks.length) 
      }
      quizAPI.postOne("quizLogs", quizScore)
      alert(`Quiz Complete! You answered ${this.state.correctAnswers} out of ${this.props.quizTracks.length} questions correctly. `)
      this.props.endQuiz();
    }
  }

  playSong = () => {
    const uris = this.props.quizTracks.map(track => track.uri)
    const startTime = this.props.quizTracks[0].startTime;
    spotifyAPI.startPlayback(uris, startTime, this.props.deviceId);
  };

  toggle = stateToToggle => {
    this.setState({
      [stateToToggle]: !this.state[stateToToggle]
    });
  };


  handleSeek = () => {
    const startTime = this.props.quizTracks[this.state.questionIndex].startTime;
    this.props.player.nextTrack().then(()=> {
      this.props.player.seek(startTime);
    });
  }

  // handleStop = () => {
  //   this.props.player.pause();
  //   };




  handlePlaySong = () => {
    if (this.state.questionIndex === 0) {
    this.playSong();
    } else {
      this.handleSeek()
    }
    this.toggle("disableButton");
    setTimeout(() => {
      this.props.player.pause();
      this.toggle("disableSubmitButton");
    }, this.props.clipLength);
  };

  render() {
    return (
      <Container>
        <Jumbotron>
          <h2 className="display-4">Quiz Time</h2>
          <p className="lead">Click the play button to test your skills!</p>
          <Badge color="primary" pill>
            Question {this.state.questionIndex + 1} of{" "}
            {this.props.quizTracks.length}
          </Badge>
          <Badge color="primary" pill>
            Current Score: {this.state.correctAnswers}
          </Badge>

          <hr className="my-2" />
          <Button
            onClick={this.handlePlaySong}
            disabled={this.state.disableButton}
          >
            Play song!
          </Button>

          <Form>
            <FormGroup row>
              <Label for="inputAnswer" sm={3}>
                What song is this?
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  onChange={this.handleFieldChange}
                  name="text"
                  id="inputAnswer"
                  placeholder="Enter your guess!"
                />
              </Col>
            </FormGroup>
            <Button
              onClick={this.handleSubmit}
              disabled={this.state.disableSubmitButton}
            >
              Submit
            </Button>
          </Form>
        </Jumbotron>
      </Container>
    );
  }
}
