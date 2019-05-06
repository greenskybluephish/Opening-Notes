import React, { Component } from "react";
import spotifyAPIManager from "../../modules/spotifyAPIManager"
import { Button, Table } from 'reactstrap'
import SongFile from "./SongFile"


export default class UserPlaylists extends Component {

state = {
  playlistTracks: []
}

  componentDidUpdate(prevProps) {
    if (prevProps.playlistURI !== this.props.playlistURI) {
    const playlistURI = this.props.playlistURI
    spotifyAPIManager.get.getPlaylistTracks(playlistURI).then(tracks => {
      this.setState({playlistTracks: tracks})
    }
    )}} 




  render() {

    return (
      <div>
      <h2>Playlist:</h2> 
          <Table responsive>
            <thead>
                <tr>
                    <th className="text-center">#</th>
                    <th>Name</th>
                    <th>Artist</th>
                    <th className="text-center">Album</th>
                  
                    <th className="text-right">Add or remove tracks</th>
                </tr>
            </thead>
            <tbody>
            {this.state.playlistTracks.map((track, i) => {
              return <SongFile key={track.id} index={i+1} track={track}></SongFile>
            })}
            </tbody>
              </Table>
      </div>
    );
  }
}