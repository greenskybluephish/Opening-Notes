import React from "react";
import {
  CardTitle,
  Row,
  Col
} from "reactstrap";
import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';


import spotifyAPI from "../../modules/spotifyAPIManager"

class SongSlider extends React.Component {

    state ={
      value: 0,
      showSlider: true
    }

  
    onSliderChange = (value) => {
      this.setState({value: value});
    }

    onAfterChange = (value) => {
      console.log(value)
      spotifyAPI.put.playOneSong(this.props.trackURI, (this.state.value*1000))
    }

    saveStartButton = () => {
      this.setState({showSlider: !this.state.showSlider})
    }

  msToMinutes = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
  msToSeconds = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    return seconds;
  }

  render() {
    return (
      <Row>
      <Col xs={1}>0</Col>
        <Col >
        <Slider value={this.state.value} min={0} max={this.msToSeconds(this.props.length)} step={1}
          onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
        />
        </Col>
        <Col xs={1}>{this.msToMinutes(this.props.length)}</Col>
      </Row>
    );
  }
}

export default SongSlider;