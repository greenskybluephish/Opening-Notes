import React, { Component } from "react";
// reactstrap components
import {

  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Label
} from "reactstrap";
import "./quiz.css"
import quizAPI from "../../modules/jsonAPIManager"


export default class QuizHeader extends Component {

state = {
  quizzes: [],
  selectedQuiz: 1
}

async componentDidMount() {
 let response = await quizAPI.getAll("quizs");
 this.setState({quizzes: response})
}

handleFieldChange = event => {
  const stateToChange = {}
  stateToChange[event.target.id] = event.target.value
  this.setState(stateToChange)
}

handleStart = (e) => {
  e.preventDefault();
  this.props.selectQuiz(this.state.selectedQuiz)
}




  render() {
    return (
      <Container>
          <div className="App">
            <div>
              <h2> Quiz Time </h2>
            </div>
          </div>
          <Form >
          <FormGroup row>
          <Label for="selectedQuiz">Select Quiz</Label>
          <Input type="select" name="select" id="selectedQuiz" onChange={this.handleFieldChange} default="1">
            {this.state.quizzes.map(quiz => {
      return (<option className="option-text" value={quiz.id} key={quiz.id}>{quiz.quizName}</option>)
    })}
          </Input>
          </FormGroup>
          <Button onClick={this.handleStart}>Click Me to Start the Quiz!
            </Button>
        </Form>


      </Container>
    );
  }
}