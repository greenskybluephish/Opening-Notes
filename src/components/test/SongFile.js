import React, { Component } from "react";
// import spotifyAPIManager from "../../modules/spotifyAPIManager"
import { Button } from 'reactstrap'
import "../../assets/css/nucleo-icons.css";

export default class SongFile extends Component {

handleClick = (event) => {
  this.props.addToQuiz(this.props.track.track)
}

render() {
  const  {
        "album": {
            "name": albumName
                  },
    "artists": [
          {
          "name": artistName
          }],
    "id": trackId,
    "name": trackName,
    // "uri": trackURI
    } = this.props.track.track

  return (
            <tr>
            <td className="text-center">{this.props.index}</td>
            <td>{trackName}</td>
            <td>{artistName}</td>
            <td className="text-center">{albumName}</td>

            <td className="text-right">
                <Button value={trackId} onClick={this.handleClick} className="btn-icon" color="success" size="sm">
                    <i value={trackId}  className="tim-icons icon-alert-circle-exc"></i>
                </Button>{` `}
                <Button className="btn-icon" color="danger" size="sm">
                    <i className="tim-icons icon-simple-delete" />
                </Button>
            </td>
        </tr>
  )}
}
