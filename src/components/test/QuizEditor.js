import React, { Component } from "react";
// import API from "../../modules/spotifyAPIManager";
import quizAPI from "../../modules/jsonAPIManager";
import "./test.css";
import {
  Button,
  ListGroup,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Form,
  Col
} from "reactstrap";
import QuizSongCreator from "./QuizSongCreator";
import RadioButtons from "./RadioButtons";
import QuizSongEditor from "./QuizSongEditor";

export default class QuizEditor extends Component {
  state = {
    quizName: "",
    quizDescription: "",
    clipLength: 12000,
    newQuizTracks: [],
    myQuizzes: [],
    showEditForm: false,
    selectedQuiz: 1
  };

  async componentDidMount() {
    let response = await quizAPI.getAll(
      `quizs?userId=${this.props.currentUser}`
    );
    this.setState({ myQuizzes: response });
  }

  showEditForm = () => {
    let quizToEdit = this.state.myQuizzes.find(
      quiz => quiz.id === this.state.selectedQuiz
    );
    this.setState({
      quizName: quizToEdit.quizName,
      quizDescription: quizToEdit.quizDescription,
      clipLength: quizToEdit.clipLength,
      newQuizTracks: quizToEdit.quizTrackIds,
      showEditForm: true
    });
  };

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleSelectQuiz = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = parseInt(event.target.value);
    this.setState(stateToChange);
  };

  addTrackToQuiz = trackInfo => {
    const addTrackToState = this.state.newQuizTracks.concat(trackInfo);
    this.setState({ newQuizTracks: addTrackToState });
  };

  addEditedTrack = (oldTrackId, newQuizTrack) => {
    let oldQuizTrack = this.state.newQuizTracks.find(
      quiz => quiz.id === oldTrackId
    );
    const filteredQuiz = this.state.newQuizTracks.filter(quiz => {
      return quiz !== oldQuizTrack;
    });
    let updatedQuiz = filteredQuiz.concat(newQuizTrack);
    this.setState({ newQuizTracks: updatedQuiz });
  };

  editTrack = track => {
    const filteredQuiz = this.state.newQuizTracks.filter(quiz => {
      return quiz.id !== track.id;
    });
    this.setState({ newQuizTracks: filteredQuiz });
  };

  removeFromQuizList = track => {
    this.props.removeFromQuiz(track);
    const filteredQuiz = this.state.newQuizTracks.filter(quiz => {
      return quiz.id !== track.id;
    });
    this.setState({ newQuizTracks: filteredQuiz });
  };

  submitEditedQuiz = event => {
    event.preventDefault();
    if (this.state.quizName === "") {
      alert("Please enter a name for your quiz");
    } else if (this.state.newQuizTracks.length < 2) {
      alert("Add more songs to your quiz");
    } else {
      const editedQuiz = {
        quizName: this.state.quizName,
        quizDescription: this.state.quizDescription,
        quizTrackIds: this.state.newQuizTracks,
        clipLength: this.state.clipLength
      };
      // add the new article
      quizAPI.patchEntry("quizs", this.state.selectedQuiz, editedQuiz);
      alert(`${this.state.quizName} has been edited!`);
      this.props.clearQuizTracks();
      let form = event.target.parentNode;
      form.reset();
      this.props.hideTracks();
    }
  };

  deleteQuiz = () => {
    if (window.confirm("Are you sure you want to delete the quiz?")) {
      quizAPI.deleteEntry("quizs", this.state.selectedQuiz).then(() => {
        alert("Quiz has been deleted.");
        this.props.hideTracks();
        this.props.clearQuizTracks();
      });
    }
  };

  changeClipLength = value => {
    this.setState({ clipLength: value });
  };

  render() {
    return (
      <>
        <Container>
          <Form>
            <FormGroup row>
              <Label for="selectedQuiz">Select Quiz</Label>
              <Input
                type="select"
                name="select"
                id="selectedQuiz"
                onChange={this.handleSelectQuiz}
                default={1}
              >
                {this.state.myQuizzes.map(quiz => {
                  return (
                    <option
                      className="option-text"
                      value={quiz.id}
                      key={quiz.id}
                    >
                      {quiz.quizName}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
            <Button onClick={this.showEditForm}>Edit this quiz.</Button>
          </Form>
        </Container>

        {this.state.showEditForm && (
          <Card>
            <CardTitle tag="h3">Quiz Editor</CardTitle>

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
                        value={this.state.quizName}
                        onChange={this.handleFieldChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={7}>
                    <FormGroup>
                      <Label for="quizDescription">Quiz Description</Label>
                      <Input
                        type="text"
                        name="text"
                        id="quizDescription"
                        onChange={this.handleFieldChange}
                        value={this.state.quizDescription}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <RadioButtons changeClipLength={this.changeClipLength} />
                </Row>
                <FormGroup>
                  <Label for="quizSongs">Quiz Songs:</Label>
                  <ListGroup id="quizSongs">
                    {this.state.newQuizTracks.map(track => {
                      return (
                        <QuizSongEditor
                          key={track.id}
                          addEditedTrack={this.addEditedTrack}
                          track={track}
                          clipLength={this.state.clipLength}
                          removeFromQuizList={this.removeFromQuizList}
                          addTrackToQuiz={this.addTrackToQuiz}
                          deviceId={this.props.deviceId}
                          editTrack={this.editTrack}
                        />
                      );
                    })}
                    {this.props.quizTracks.map(track => {
                      return (
                        <QuizSongCreator
                          key={track.id}
                          track={track}
                          removeFromQuiz={this.props.removeFromQuiz}
                          clipLength={this.state.clipLength}
                          addTrackToQuiz={this.addTrackToQuiz}
                          deviceId={this.props.deviceId}
                          editTrack={this.editTrack}
                          removeFromQuizList={this.removeFromQuizList}
                          editor={true}
                        />
                      );
                    })}
                  </ListGroup>
                </FormGroup>
                <Button onClick={this.submitEditedQuiz}>
                  Submit Edited Quiz
                </Button>{" "}
                <Button onClick={this.deleteQuiz}>Delete this quiz</Button>
              </Form>
            </CardBody>
          </Card>
        )}
      </>
    );
  }
}
