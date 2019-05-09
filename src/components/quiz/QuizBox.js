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
import "./quiz.css"
import spotifyAPI from "../../modules/spotifyAPIManager"




export default class QuizBox extends Component {

  state = {
    inputAnswer: "",
    correctAnswers: 0,
    questionIndex: 0,
    disableButton: false,
    disableSubmitButton: true,
    clipLength: 12000
}


// handle the field change when the input box is edited
handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
}

handleSubmit = event => {
  const index = this.state.questionIndex
  event.preventDefault();
    if (this.state.inputAnswer === "") {
      alert("Please enter an answer!")
    }
      else {
        this.toggle("disableButton")
        this.toggle("disableSubmitButton")
        let inputAnswer= this.state.inputAnswer.toLowerCase();
        let correctAnswer = this.props.quizTracks[index].name.toLowerCase();
        let form = event.target.parentNode;
        if (correctAnswer.includes(inputAnswer) && inputAnswer.length >= 3) {
        alert(`Correct, the answer is ${this.props.quizTracks[index].name}`)
        form.reset();
        this.setState({questionIndex: this.state.questionIndex + 1})
      } else {
        alert(`Sorry, the correct answer is ${this.props.quizTracks[index].name}`)
        this.setState({questionIndex: this.state.questionIndex + 1})
        form.reset();
      }
    }
   } 


    playSong = () => {
      const index = this.state.questionIndex
      const {uri, startTime} = this.props.quizTracks[index]
      spotifyAPI.put.playOneSong(uri, startTime, this.props.deviceId)
    }
    

    toggle = (stateToToggle) => {
      this.setState({
        [stateToToggle]: !this.state[stateToToggle]
      })
    }

    handlePlaySong = () => {
        this.toggle("disableButton")
        this.playSong();
        setTimeout(() => {
          spotifyAPI.put.pauseSong();
          this.toggle("disableSubmitButton")
        }, this.state.clipLength);
      }




  render() {
    return (
      <Container>
        <Jumbotron>
          <h2 className="display-4">Quiz Time</h2>
          <p className="lead">Click the play button to test your skills!</p>
          <hr className="my-2" />
          <Button onClick={this.handlePlaySong} disabled={this.state.disableButton}>Play song!
          </Button>
          <Badge>{this.state.correctAnswers}</Badge>

          
          <Form >
          <FormGroup row>
          <Label for="inputAnswer" sm={3}>What song is this?</Label>
          <Col sm={9}>
            <Input type="text" onChange={this.handleFieldChange} name="text" id="inputAnswer" placeholder="Enter your guess!" />
          </Col>
          </FormGroup>
          <Button onClick={this.handleSubmit} disabled={this.state.disableSubmitButton}>Submit</Button>
        </Form>

        </Jumbotron>
      </Container>
    );
  }
}