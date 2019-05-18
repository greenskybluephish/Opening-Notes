import React, { Component } from "react";
import spotifyAPI from "../../modules/spotifyAPIManager";
import UserPlaylists from "./UserPlaylists"
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Container, Button} from "reactstrap"
import "./test.css"
import QuizCreator from "./QuizCreator";
import QuizEditor from "./QuizEditor"

export default class Create extends Component {


  state = {
    playlistInfo: [],
    dropdownOpen: false,
    showTracks: false,
    activePlaylist: "",
    quizTracks: [],
    renderQuizCreator: true,
    renderQuizEditor: false
  }



    toggle = () => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }

    toggleEditor = () => {
      this.setState({
        renderQuizCreator: !this.state.renderQuizCreator, 
        renderQuizEditor: !this.state.renderQuizEditor 
      });
    };

    
  async componentDidMount () {
     let items = await spotifyAPI.getUserPlaylists();
      const playlistInfo = items.map(playlist => {
        return { name: playlist.name, URI: playlist.id}
      }); this.setState({playlistInfo: playlistInfo})
     }

    showTracks = (playlist, e) => {
      this.setState({showTracks: true, activePlaylist: playlist, dropdownOpen: false})
    }

    hideTracks = () => {
      this.setState({showTracks: false})
    }

    addToQuiz = (trackURI) => {

      const newState = this.state.quizTracks.concat(trackURI);
      this.setState({quizTracks: newState})
     } 

     removeFromQuiz = (trackURI) => {
      const filteredQuiz = this.state.quizTracks.filter(quiz => {
        return (quiz !== trackURI)
      }); this.setState({quizTracks: filteredQuiz})
     }

    clearQuizTracks = () => {
      this.setState({quizTracks: [], renderQuizEditor: false, renderQuizCreator: true})
    }


      render() {
      const showPlaylist = this.state.showTracks  
      return (
        <Container className="App">

  <Button onClick={this.toggleEditor} id="renderQuizCreator" color="primary" size="lg">Create a New Quiz</Button>{' '}
  <Button onClick={this.toggleEditor} id="renderQuizEditor" color="secondary" size="lg">Edit a previous quiz</Button>


  {this.state.renderQuizCreator && <QuizCreator currentUser={this.props.currentUser} deviceId={this.props.deviceId} quizTracks={this.state.quizTracks} clearQuizTracks={this.clearQuizTracks} hideTracks={this.hideTracks}></QuizCreator>}

  {this.state.renderQuizEditor && <QuizEditor deviceId={this.props.deviceId} quizTracks={this.state.quizTracks} clearQuizTracks={this.clearQuizTracks} hideTracks={this.hideTracks} removeFromQuiz={this.removeFromQuiz}
  currentUser={this.props.currentUser}></QuizEditor>}


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


