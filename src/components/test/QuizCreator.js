import React, { Component } from "react";
// import API from "../../modules/spotifyAPIManager";
import quizAPI from "../../modules/jsonAPIManager"
import SongSlider from "./Slider"
import "./test.css"
import { Button, ListGroup, FormGroup,
  Label,
  Input,
  Card,
  CardBody,
Row,
Form,
Col } from 'reactstrap';
import QuizSongCreator from "./QuizSongCreator"


export default class QuizCreator extends Component {

  state = {
    quizName: "",
    quizDescription: ""

  }

  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
}
submitNewQuiz = event => {
  event.preventDefault();
  if(this.state.quizName === ""){
      alert("Please enter a name for your quiz")
  } else if(this.props.quizTracks.length  < 6){
      alert("Please add more songs to your quiz")
  } else {
    let quizTrackIds = this.props.quizTracks.map(track => track.uri)
      const newQuiz = {
          userId: 1,
          quizName: this.state.quizName,
          quizDescription: this.state.quizDescription,
          quizTrackIds: quizTrackIds
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





  render() {
    return (
  <Card>
      <CardBody>
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
          
          <FormGroup>
            <Label for="quizSongs">Quiz Songs:</Label>
            <ListGroup id="quizSongs">
    {this.props.quizTracks.map(track => {
      return <QuizSongCreator key={track.id} track={track}>
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

