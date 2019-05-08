import React, { Component } from "react";
import spotifyAPIManager from "../../modules/spotifyAPIManager"
import { Table } from 'reactstrap'
import SongFile from "./SongFile"


export default class UserPlaylists extends Component {

state = {
  playlistTracks: []
}

  componentDidMount() {
    spotifyAPIManager.get.getPlaylistTracks(this.props.playlist.URI).then(tracks => {
      this.setState({playlistTracks: tracks})
    }
    )}

  componentDidUpdate(prevProps) {
    if (prevProps.playlist !== this.props.playlist) {
      spotifyAPIManager.get.getPlaylistTracks(this.props.playlist.URI).then(tracks => {
        this.setState({playlistTracks: tracks})
      }
      )
    }
  }  





  render() {

    return (
      <div>
      <h2>{this.props.playlist.name}</h2> 
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
              return <SongFile addToQuiz={this.props.addToQuiz} key={track.track.id} index={i+1} track={track}></SongFile>
            })}
            </tbody>
              </Table>
      </div>
    );
  }
}