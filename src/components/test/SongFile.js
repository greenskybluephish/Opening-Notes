import React, { Component } from "react";
import spotifyAPIManager from "../../modules/spotifyAPIManager"
import { Button } from 'reactstrap'


export default class SongFile extends Component {



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
    "uri": trackURI
    } = this.props.track.track

  return (
            <tr>
            <td className="text-center">{this.props.index}</td>
            <td>{trackName}</td>
            <td>{artistName}</td>
            <td className="text-center">{albumName}</td>

            <td className="text-right">
                <Button className="btn-icon" color="success" size="sm">
                    <i className="icon-simple-add"></i>
                </Button>{` `}
                <Button className="btn-icon" color="danger" size="sm">
                    <i className="icon-simple-delete" />
                </Button>
            </td>
        </tr>
  )}
}
