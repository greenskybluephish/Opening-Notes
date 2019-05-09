import React, { Component } from "react";
// import API from "../../modules/spotifyAPIManager";
import quizAPI from "../../modules/jsonAPIManager"
import "./test.css"
import { Button, ListGroup, FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  CardText,
Row,
Form,
Col } from 'reactstrap';
import QuizSongCreator from "./QuizSongCreator"
import RadioButtons from "./RadioButtons"



export default class QuizCreator extends Component {

  state = {
    quizName: "",
    quizDescription: "",
    clipLength: 11,
    newQuizTracks: [],
    currentUser: 1
  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
}

  addTrackToQuiz = (trackInfo) => {

  const addTrackToState = this.state.newQuizTracks.concat(trackInfo);
  this.setState({newQuizTracks: addTrackToState})
 } 

  submitNewQuiz = event => {
  event.preventDefault();
  if(this.state.quizName === ""){
      alert("Please enter a name for your quiz")
  } else if(this.state.newQuizTracks.length  < 6){
      alert("Add more songs to your quiz")
  } else {
      const newQuiz = {
          userId: 1,
          quizName: this.state.quizName,
          quizDescription: this.state.quizDescription,
          quizTrackIds: this.state.newQuizTracks,
          clipLength: this.state.clipLength
      }
      // add the new article 
      quizAPI.postOne("quizs", newQuiz)
      alert(`${this.state.quizName} has been created!`)
      this.props.clearQuizTracks();
      let form = event.target.parentNode
      form.reset();
      this.props.hideTracks();
      
  }
}

  changeClipLength = (value) => {
    this.setState({clipLength: value})
  }




  render() {
    return (
  <Card>
  <CardTitle tag="h3">Quiz Creator</CardTitle>
  
  
      <CardBody>
      <Row>
          <Col sm="12" md={{ size: 10, offset: 1 }}>
      <CardText>The quiz creator allows you to import any song off of Spotify into your quiz. The easiest way to add songs is to create a playlist on Spotify, then add the entire playlist at once by clicking the "Add All" button below. You can change the difficulty of the quiz by making the song clips 6, 12, or 24 seconds long. You can use the slider next to each track to adjust the starting time for each song, or leave it as is to have the song start at the beginning. </CardText></Col>
        </Row>
        <hr></hr>
      <Form>
      <Row form>
          <Col md={4}>
          <FormGroup>
            <Label for="quizName">Quiz Name</Label>
            <Input
              type="text"
              name="quizName"
              id="quizName"
              placeholder="New Quiz"
              onChange={this.handleFieldChange}
            />
          </FormGroup>
          </Col>
          <Col md={7}>
          <FormGroup>
            <Label for="quizDescription">Quiz Description</Label>
            <Input type="text" name="text" id="quizDescription" onChange={this.handleFieldChange}/>
          </FormGroup>

          </Col>
          </Row>
          <Row>
          
            <RadioButtons changeClipLength={this.changeClipLength}>
            </RadioButtons>
          </Row>
          <FormGroup>
            <Label for="quizSongs">Quiz Songs:</Label>
            <ListGroup id="quizSongs">
    {this.props.quizTracks.map(track => {
      return <QuizSongCreator key={track.id} track={track} clipLength={this.state.clipLength}  addTrackToQuiz={this.addTrackToQuiz} deviceId={this.props.deviceId}>
      </QuizSongCreator>
    })}
    </ListGroup>
          </FormGroup>
       
       
          <Button onClick={this.submitNewQuiz}>Submit New Quiz</Button>
          </Form>
      </CardBody>
    </Card>
    )
}}

