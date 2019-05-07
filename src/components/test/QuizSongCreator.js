import React from "react";
import {
  CardTitle,
  Row,
  Col,
  ListGroupItem,
  Button
} from "reactstrap";
import 'rc-slider/assets/index.css';

import Slider, { createSliderWithTooltip } from 'rc-slider';


import spotifyAPI from "../../modules/spotifyAPIManager"


const SliderWithTooltip = createSliderWithTooltip(Slider);

class SongSlider extends React.Component {

    state ={
      value: 0,
      showSlider: true,
      saveButton: true
    }

    log = (value) => {

     return this.secondsToMinutes(value); //eslint-disable-line
    }
    
  
    onSliderChange = (value) => {
      this.setState({value: value});
    }

    onAfterChange = (value) => {
      console.log(value)
      spotifyAPI.put.playOneSong(this.props.track.uri, (this.state.value*1000))
    }

    saveStartButton = () => {
      this.setState({showSlider: !this.state.showSlider, saveButton: !this.state.saveButton})
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
      <ListGroupItem>

      {this.state.showSlider && <Row>
      <Col xs={1}>0</Col>
        <Col >
        <SliderWithTooltip  tipFormatter={this.log}
        tipProps={{ overlayClassName: 'foo' }}
        value={this.state.value} min={0} max={this.msToSeconds(this.props.track.duration_ms)} step={1}
          onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
        ></SliderWithTooltip>
        </Col>
        <Col xs={1}>{this.msToMinutes(this.props.track.duration_ms)}</Col>
      </Row>}

      <Row className="song-name">
      <Col xs="9">{this.props.track.name} - {this.props.track.album.name}</Col>
      {this.state.saveButton &&
      <Col><Button onClick={this.saveStartButton} > Save this start value </Button> </Col>}
      {!this.state.saveButton &&
      <Col><Button onClick={this.saveStartButton} > Edit this value </Button> </Col>}
      </Row>
      </ListGroupItem>
    );
  }
}

export default SongSlider;