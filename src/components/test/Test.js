
import React, { Component } from "react";
import API from "../../modules/spotifyAPIManager";
import UserPlaylists from "./UserPlaylists"
import { Button, Dropdown, DropdownToggle, DropdownItem, DropdownMenu} from "reactstrap"

export default class Test extends Component {


  state = {
    playlistInfo: [],
    dropdownOpen: false,
    showTracks: false,
    activePlaylist: ""
  }

   handlePlay = () => {
    API.get.spotifyAlbumTracks().then(tracks => {
      tracks.forEach(track => {
        setTimeout(() => {
          API.get.spotifyTrackInfo(track).then(async data => {
            let song = await data
                  let songObject = {
                  "spotifyURI": song[0],
                  "position_ms": song[1]
                 }
               API.post.toJSONServer("spotifyTracks", songObject)
        }, 100);

    })
})

    }  )}

    toggle = () => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
    



    componentDidMount () {
     API.get.getUserPlaylists().then(items => {
      const playlistInfo = items.map(playlist => {
        return { name: playlist.name, URI: playlist.id}
      }); this.setState({playlistInfo: playlistInfo})
     }
     )
    }

    showTracks = (event) => {
      const playlistURI = event.target.id
      this.setState({showTracks: !this.state.showTracks, activePlaylist: playlistURI})
    }

      render() {
      const showPlaylist = this.state.showTracks  
      return (
        <div className="App">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        Playlists
        </DropdownToggle>
        <DropdownMenu>
          {this.state.playlistInfo.map(playlist => {
            return ( 
              <DropdownItem key={playlist.URI}  header><Button id={playlist.URI} onClick={this.showTracks}>{playlist.name}</Button> 
              </DropdownItem> )
          })}
          </DropdownMenu>
      </Dropdown>
      {showPlaylist && <UserPlaylists playlistURI={this.state.activePlaylist}></UserPlaylists>}
      


        </div>
      );
    }
}


