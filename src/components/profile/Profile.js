import React, { Component } from "react";
import { Button, Container,
  FormGroup,
  Form,
  Input,
  Label,
Col } from "reactstrap";
import quizAPI from "../../modules/jsonAPIManager"


export default class Profile extends Component {

  state = {
    inputName: "",
    displayName: ""
  }

  componentDidMount() {
    quizAPI.getOneEntry("users", this.props.currentUser).then(user => {
      this.setState({displayName: user.displayName})
    })
  }


  handleFieldChange = event => {
    const stateToChange = {}
    stateToChange[event.target.id] = event.target.value
    this.setState(stateToChange)
  }

    handleSubmit = event => {
      quizAPI.patchEntry("users", this.props.currentUser, {"displayName": this.state.inputName}).then(()=> {
        quizAPI.getOneEntry("users", this.props.currentUser).then(user => {
          this.setState({displayName: user.displayName})
      })

    })}
  

  render() {
    return (
      <Container>
      <h1>{this.state.displayName}'s Profile</h1>

  <Form >
  <FormGroup row>
  <Label for="inputName" sm={3}>Edit your display name:</Label>
  <Col sm={9}>
    <Input type="text" onChange={this.handleFieldChange} name="text" id="inputName" />
  </Col>
  </FormGroup>
  <Button onClick={this.handleSubmit}>Submit</Button>
</Form>
</Container>
    )
}
}