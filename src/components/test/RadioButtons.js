import React, { Component } from "react";

import {
  FormGroup,
  Label,
  Input,
  Card,
  CardBody
} from "reactstrap";

export default class RadioButtons extends Component {


  state= {
    selectedOption: 12000
  }


  handleOptionChange = event => {
    const clipLength = parseInt(event.target.value)
    this.setState({
      selectedOption: clipLength
    });
    this.props.changeClipLength(clipLength)
  };


  render() {
  return (
    <>
    
      <Card>
      
        <CardBody>
        <FormGroup tag="fieldset">
          <legend className="col-form-label">Select the clip length for your quiz:</legend>
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
                <Input type="radio" name="clipLength" id="clipLength1" value={6000} checked={this.state.selectedOption === 6000} onChange={this.handleOptionChange}/>
                6 Seconds
                <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
              <Input type="radio" name="clipLength" id="clipLength2" value={12000} checked={this.state.selectedOption === 12000} onChange={this.handleOptionChange}/>
              12 Seconds
              <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          <FormGroup check inline className="form-check-radio">
            <Label className="form-check-label">
              <Input type="radio" name="clipLength" id="clipLength3" value={24000} checked={this.state.selectedOption === 24000} onChange={this.handleOptionChange}/>
              24 Seconds
              <span className="form-check-sign"></span>
            </Label>
          </FormGroup>
          </FormGroup>
        </CardBody>
      </Card>
    </>
  );
}

}