import React, { Component } from "react";
import {
  Alert,
  Row,
  Col,
  ListGroupItem,
  Button
} from "reactstrap";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';


import Slider, { createSliderWithTooltip } from 'rc-slider';


import spotifyAPI from "../../modules/spotifyAPIManager"



const Range = createSliderWithTooltip(Slider.Range);


export default class QuizSongCreator extends Component {

    state ={
      value: [0, 15],
      showSlider: true,
      saveButton: true,
      alertColor: "danger",

    }

    log = (value) => {

     return this.secondsToMinutes(value); //eslint-disable-line
    }
    
  
    onSliderChange = (value) => {
      let slideRange = value[0]
      let valueToSet = [slideRange, slideRange+this.props.clipLength]
      this.setState({value: valueToSet});
    }

    onAfterChange = (value) => {
      console.log(value)
      spotifyAPI.put.playOneSong(this.props.track.uri, (this.state.value[0]*1000)).then(setTimeout(() => {
          spotifyAPI.put.pauseSong();
        }, (this.props.clipLength*1000)))

    }

    saveStartButton = () => {
      const trackInfo = {
        "album": this.props.track.album.name,
        "artists": this.props.track.artists[0].name,
        "id": this.props.track.id,
        "name": this.props.track.name,
        "startTime": this.state.value[0],
        "uri": this.props.track.uri
      }  
      this.props.addTrackToQuiz(trackInfo)
      this.setState({showSlider: !this.state.showSlider, saveButton: !this.state.saveButton, alertColor: "success"})
    }

  msToMinutes = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  secondsToMinutes = (numSeconds) => {
    const minutes = Math.floor(numSeconds / 60);
    const seconds = ((numSeconds % 60)).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  msToSeconds = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    return seconds;
  }

  render() {
    return (
      <Alert color={this.state.alertColor}>
      <ListGroupItem>

      {this.state.showSlider && 
      
      <Row>
      <Col xs="1">0</Col>
        <Col >
        <Range defaultValue={[0, this.props.clipLength]} tipFormatter={this.log} pushable={10}
        tipProps={{ overlayClassName: 'foo' }}
        value={this.state.value} min={0} max={this.msToSeconds(this.props.track.duration_ms)} step={1}
          onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
        ></Range>
        </Col>
        <Col sm="2" md="1">{this.msToMinutes(this.props.track.duration_ms)}</Col>
      </Row>}

      <Row className="song-name">
      
      <Col xs="8" md="6">{this.props.track.name} - {this.props.track.album.name}</Col>
      {this.state.saveButton &&
      <Col xs="6" md="4"><Button onClick={this.saveStartButton} > Save this start value </Button> </Col>}
      {!this.state.saveButton &&
      <Col xs="6" md="4"><Button onClick={this.saveStartButton} > Edit this value </Button> </Col>}
      </Row>
      </ListGroupItem>
      </Alert>
    );
  }
}
