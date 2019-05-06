import React, { Component } from "react";
import API from "../../modules/spotifyAPIManager";
import UserPlaylists from "./UserPlaylists"
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Container} from "reactstrap"
import "./test.css"
import QuizCreator from "./QuizCreator";


export default class Test extends Component {


  state = {
    playlistInfo: [],
    dropdownOpen: false,
    showTracks: false,
    activePlaylist: "",
    quizTracks: []
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
    
  async componentDidMount () {
     let items = await API.get.getUserPlaylists();
      const playlistInfo = items.map(playlist => {
        return { name: playlist.name, URI: playlist.id}
      }); this.setState({playlistInfo: playlistInfo})
     }

    showTracks = (playlist, e) => {
      this.setState({showTracks: true, activePlaylist: playlist})
      this.toggle();
    }

    addToQuiz = (trackURI) => {

      const addTrackToState = this.state.quizTracks.concat(trackURI);
      this.setState({quizTracks: addTrackToState})
     } 

    clearQuizTracks = () => {
      this.setState({quizTracks: []})
    }


      render() {
      const showPlaylist = this.state.showTracks  
      return (
        <Container className="App">

        <QuizCreator quizTracks={this.state.quizTracks} clearQuizTracks={this.clearQuizTracks}></QuizCreator>


          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        Playlists
        </DropdownToggle>
        <DropdownMenu>
          {this.state.playlistInfo.map(playlist => {
            let boundItemClick = this.showTracks.bind(this, playlist)
            return ( 
              <DropdownItem key={playlist.URI} onClick={boundItemClick} >{playlist.name}
              </DropdownItem>)
          })}
          </DropdownMenu>
      </Dropdown>
      {showPlaylist && <UserPlaylists addToQuiz={this.addToQuiz}  playlist={this.state.activePlaylist}></UserPlaylists>}
      


        </Container>
      );
    }
}


