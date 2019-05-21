import React, { Component } from "react";
import {
  Button,
  Container,
  Jumbotron,
  FormGroup,
  Form,
  Input,
  Label,
  Col
} from "reactstrap";
import quizAPI from "../../modules/jsonAPIManager";

export default class Profile extends Component {
  state = {
    inputName: "",
    displayName: "",
    quizLogs: []
  };

  componentDidMount() {
    quizAPI.getOneEntry("users", this.props.currentUser).then(user => {
      this.setState({ displayName: user.displayName });
    });
    quizAPI
      .getAll(`quizLogs/?userId=${this.props.currentUser}`)
      .then(quizLogs => {
        let score = quizLogs.map(quiz => quiz.score);
        this.setState({ quizLogs: score });
      });
  }

  handleFieldChange = event => {
    const stateToChange = {};
    stateToChange[event.target.id] = event.target.value;
    this.setState(stateToChange);
  };

  handleSubmit = event => {
    let form = event.target.parentNode;
    quizAPI
      .patchEntry("users", this.props.currentUser, {
        displayName: this.state.inputName
      })
      .then(() => {
        quizAPI.getOneEntry("users", this.props.currentUser).then(user => {
          this.setState({ displayName: user.displayName });
          form.reset();
        });
      });
  };

  render() {
    return (
      <Container>
        <h1>{this.state.displayName}'s Profile</h1>
        <Jumbotron>
          <Form>
            <FormGroup row>
              <Label for="inputName" color="" className="label" sm={3}>
                Edit your display name:
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  onChange={this.handleFieldChange}
                  name="text"
                  id="inputName"
                />
              </Col>
            </FormGroup>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Form>
          <hr />
          <h2>Quiz History</h2>

          {this.state.quizLogs.length && (
            <>
              <p>Number of quizzes taken: {this.state.quizLogs.length} </p>
              <p>
                Average Score:{" "}
                {this.state.quizLogs.reduce((acc, cur) => acc + cur) /
                  this.state.quizLogs.length}
              </p>
            </>
          )}
        </Jumbotron>
      </Container>
    );
  }
}
