import React, { Component } from "react";
import { Alert, Row, Col, ListGroupItem, Button } from "reactstrap";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

import Slider, { createSliderWithTooltip } from "rc-slider";

import spotifyAPI from "../../modules/spotifyAPIManager";

const SliderTool = createSliderWithTooltip(Slider);

export default class QuizSongCreator extends Component {
  state = {
    value: 0,
    showSlider: true,
    saveButton: true,
    alertColor: "danger",
    isPlaying: false,
    shouldPause: false
  };

  componentDidMount() {
    spotifyAPI.spotifyTrackInfo(this.props.track.id).then(value => {
      this.setState({ value: value });
    });
  }

  log = value => {
    return this.secondsToMinutes(value); //eslint-disable-line
  };

  onSliderChange = value => {
    this.setState({ value: value });
  };

  removeTrack = () => {
    this.props.removeFromQuizList(this.props.track);
  };

  handleEdit = () => {
    this.props.editTrack(this.props.track);
    this.setState({
      showSlider: !this.state.showSlider,
      saveButton: !this.state.saveButton,
      alertColor: "danger"
    });
  };

  onAfterChange = value => {
    let device = this.props.deviceId;
    console.log(value);
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, shouldPause: true });
      spotifyAPI
        .playOneSong(this.props.track.uri, this.state.value * 1000, device)
        .then(
          setTimeout(() => {
            if (this.state.shouldPause) {
              this.setState({ isPlaying: false, shouldPause: false });
              spotifyAPI.pauseSong();
            }
          }, this.props.clipLength)
        );
    } else {
      this.setState({ isPlaying: false, shouldPause: false });
      spotifyAPI
        .playOneSong(this.props.track.uri, this.state.value * 1000, device)
        .then(
          setTimeout(() => {
            if (!this.state.shouldPause) {
              spotifyAPI.pauseSong();
            }
          }, this.props.clipLength)
        );
    }
  };

  saveStartButton = () => {
    const trackInfo = {
      album: this.props.track.album,
      artists: this.props.track.artists,
      id: this.props.track.id,
      name: this.props.track.name,
      startTime: this.state.value * 1000,
      uri: this.props.track.uri,
      duration: this.props.track.duration
    };
    this.props.addTrackToQuiz(trackInfo);
    if (this.props.editor) {
      this.props.removeFromQuiz(trackInfo);
    }
    this.setState({
      showSlider: !this.state.showSlider,
      saveButton: !this.state.saveButton,
      alertColor: "success"
    });
  };

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
          {this.state.showSlider && (
            <Row>
              <Col xs="1">0</Col>
              <Col>
                <SliderTool
                  tipFormatter={this.log}
                  tipProps={{ overlayClassName: "foo" }}
                  value={this.state.value}
                  min={0}
                  max={this.msToSeconds(this.props.track.duration)}
                  step={1}
                  onChange={this.onSliderChange}
                  onAfterChange={this.onAfterChange}
                />
              </Col>
              <Col sm="2" md="1">
                {this.msToMinutes(this.props.track.duration)}
              </Col>
            </Row>
          )}

          <Row className="song-name">
            <Col xs="8" md="6">
              {this.props.track.name} - {this.props.track.album}
            </Col>
            {this.state.saveButton && (
              <>
                <Col xs="6" md="3">
                  <Button onClick={this.saveStartButton}>
                    {" "}
                    Save this start value{" "}
                  </Button>{" "}
                </Col>
                <Col xs="6" md="3">
                  <Button onClick={this.removeTrack}> Remove song </Button>{" "}
                </Col>
              </>
            )}
            {!this.state.saveButton && (
              <Col xs="6" md="4">
                <Button onClick={this.handleEdit}> Edit this value </Button>{" "}
              </Col>
            )}
          </Row>
        </ListGroupItem>
      </Alert>
    );
  }
}
