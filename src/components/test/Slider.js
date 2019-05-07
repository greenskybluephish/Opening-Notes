import React from "react";
import {
  CardTitle,
  Row,
  Col
} from "reactstrap";
// plugin that creates slider
import Slider from "nouislider"

class SongSlider extends React.Component {

  componentDidMount() {
    var slider1 = this.refs.slider1;
    Slider.create(slider1, {
      start: [0],
      connect: [true, false],
      step: 1,
      range: { min: 0, max: 100 }
    });
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <CardTitle tag="h4">Start Time</CardTitle>
          <div className="slider" ref="slider1" />

        </Col>
      </Row>
    );
  }
}

export default SongSlider;