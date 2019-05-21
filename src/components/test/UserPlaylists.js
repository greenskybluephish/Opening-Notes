import React, { Component } from "react";
import spotifyAPI from "../../modules/spotifyAPIManager"
import { Table, Button } from 'reactstrap'
import SongFile from "./SongFile"


export default class UserPlaylists extends Component {

state = {
  playlistTracks: []
}

  componentDidMount() {
    spotifyAPI.getPlaylistTracks(this.props.playlist.URI).then(tracks => {
      const playlistTracks = tracks.map(track => {
        let trackInfo = {
        album: track.album.name,
        artists: track.artists[0].name,
        id: track.id,
        name: track.name,
        uri: track.uri,
        duration: track.duration_ms
      };
       return trackInfo})

      this.setState({playlistTracks: playlistTracks})
    }
    )}

  componentDidUpdate(prevProps) {
    if (prevProps.playlist !== this.props.playlist) {
      spotifyAPI.getPlaylistTracks(this.props.playlist.URI).then(tracks => {
        const playlistTracks = tracks.map(track => {
          let trackInfo = {
          album: track.album.name,
          artists: track.artists[0].name,
          id: track.id,
          name: track.name,
          uri: track.uri,
          duration: track.duration_ms
        };
         return trackInfo})
  
        this.setState({playlistTracks: playlistTracks})
      }
      )}
  }  

  handleClick = () => {
    this.props.addToQuiz(this.state.playlistTracks)
  }


  render() {

    return (
      <div>
      <h2>{this.props.playlist.name}</h2> <Button onClick={this.handleClick}>Add all songs</Button>
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
              return <SongFile key={track.id} index={i+1} track={track} addToQuiz={this.props.addToQuiz} removeFromQuiz={this.props.removeFromQuiz}></SongFile>
            })}
            </tbody>
              </Table>
      </div>
    );
  }
}