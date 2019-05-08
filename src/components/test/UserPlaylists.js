import React, { Component } from "react";
import spotifyAPIManager from "../../modules/spotifyAPIManager"
import { Table, Button } from 'reactstrap'
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