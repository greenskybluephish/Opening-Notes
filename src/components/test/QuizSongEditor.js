import React, { Component } from "react";
import { Alert, Row, Col, ListGroupItem, Button, Badge } from "reactstrap";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import Slider, { createSliderWithTooltip } from "rc-slider";

import spotifyAPI from "../../modules/spotifyAPIManager";

const SliderTool = createSliderWithTooltip(Slider);

export default class QuizSongEditor extends Component {
  state = {
    value: 0,
    showSlider: false,
    saveButton: false,
    alertColor: "success",
    isPlaying: false,
    shouldPause: false,

  };

  // componentDidMount() {
  //   let startTime = this.props.startTime
  //     this.setState({value: startTime})
  //   }
  

  // log = value => {
  //   return this.secondsToMinutes(value); //eslint-disable-line
  // };

  // time() {this.secondsToMinutes(this.state.value);}

  // onSliderChange = value => {
  //   this.setState({ value: value });
  // };

  // onAfterChange = value => {
  //   let device = this.props.deviceId
  //   console.log(value);
  //   if (!this.state.isPlaying) {
  //     this.setState({ isPlaying: true, shouldPause: true });
  //     spotifyAPI.put
  //       .playOneSong(this.props.track.uri, this.state.value * 1000, device)
  //       .then(
  //         setTimeout(() => {
  //           if (this.state.shouldPause) {
  //             this.setState({ isPlaying: false, shouldPause: false });
  //             spotifyAPI.put.pauseSong();
  //           }
  //         }, this.props.clipLength * 1000)
  //       );
  //   } else {
  //     this.setState({ isPlaying: false, shouldPause: false });
  //     spotifyAPI.put
  //       .playOneSong(this.props.track.uri, this.state.value * 1000, device)
  //       .then(
  //         setTimeout(() => {
  //           if (!this.state.shouldPause) {
  //             spotifyAPI.put.pauseSong();
  //           }
  //         }, this.props.clipLength * 1000)
  //       );
  //   }
  // };


  // editTrackButton = () => {
  //   this.setState({
  //     showSlider: !this.state.showSlider,
  //     saveButton: !this.state.saveButton,
  //     alertColor: "danger"
  //   });
  // }




  msToMinutes = milliseconds => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  secondsToMinutes = numSeconds => {
    const minutes = Math.floor(numSeconds / 60);
    const seconds = (numSeconds % 60).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  msToSeconds = milliseconds => {
    const seconds = Math.floor(milliseconds / 1000);
    return seconds;
  };

  render() {
    return (
      <Alert color={this.state.alertColor}>
        <ListGroupItem>

          <Row className="song-name">
            <Col xs="8" md="6">
              {this.props.track.name} - {this.props.track.album}
            </Col>

            {!this.state.saveButton && (
              <Col xs="6" md="4">
                <Button>
                  {" "}
                  Edit this value{" "}
                </Button>{" "}
              </Col>
            )}
          </Row>
        </ListGroupItem>
      </Alert>
    );
  }
}