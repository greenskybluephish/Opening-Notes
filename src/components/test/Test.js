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

    hideTracks = () => {
      this.setState({showTracks: false})
    }

    addToQuiz = (trackURI) => {

      const addTrackToState = this.state.quizTracks.concat(trackURI);
      this.setState({quizTracks: addTrackToState})
     } 

     removeFromQuiz = (trackURI) => {
      const filteredQuiz = this.state.quizTracks.filter(quiz => {
        return (quiz !== trackURI)
      }); this.setState({quizTracks: filteredQuiz})
     }

    clearQuizTracks = () => {
      this.setState({quizTracks: []})
    }


      render() {
      const showPlaylist = this.state.showTracks  
      return (
        <Container className="App">

        <QuizCreator quizTracks={this.state.quizTracks} clearQuizTracks={this.clearQuizTracks} hideTracks={this.hideTracks}></QuizCreator>


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
      {showPlaylist && <UserPlaylists addToQuiz={this.addToQuiz} removeFromQuiz={this.removeFromQuiz} playlist={this.state.activePlaylist}></UserPlaylists>}
      


        </Container>
      );
    }
}


