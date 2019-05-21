import React, { Component } from "react";
import spotifyAPI from "../../modules/spotifyAPIManager";
import UserPlaylists from "./UserPlaylists";
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Container,
  Button
} from "reactstrap";
import "./test.css";
import QuizCreator from "./QuizCreator";
import QuizEditor from "./QuizEditor";

export default class Create extends Component {
  state = {
    playlistInfo: [],
    dropdownOpen: false,
    showTracks: false,
    activePlaylist: "",
    quizTracks: [],
    renderQuizCreator: false,
    renderQuizEditor: false
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  showCreator = () => {
    this.setState({
      quizTracks: [],
      renderQuizCreator: true,
      renderQuizEditor: false
    });
  };
  showEditor = () => {
    this.setState({
      quizTracks: [],
      renderQuizCreator: false,
      renderQuizEditor: true
    });
  };

  async componentDidMount() {
    let items = await spotifyAPI.getUserPlaylists();
    const playlistInfo = items.map(playlist => {
      return { name: playlist.name, URI: playlist.id };
    });
    this.setState({ playlistInfo: playlistInfo });
  }

  showTracks = (playlist, e) => {
    this.setState({
      showTracks: true,
      activePlaylist: playlist,
      dropdownOpen: false
    });
  };

  hideTracks = () => {
    this.setState({ showTracks: false });
  };

  addToQuiz = trackURI => {
    const newState = this.state.quizTracks.concat(trackURI);
    this.setState({ quizTracks: newState });
  };

  removeFromQuiz = track => {
    const filteredQuiz = this.state.quizTracks.filter(quiz => {
      return quiz.id !== track.id;
    });
    this.setState({ quizTracks: filteredQuiz });
  };

  clearQuizTracks = () => {
    this.setState({
      quizTracks: [],
      renderQuizCreator: false,
      renderQuizEditor: false
    });
  };

  render() {
    const showPlaylist = this.state.showTracks;
    return (
      <Container className="App">
        <Button
          className="btn-neutral"
          onClick={this.showCreator}
          id="renderQuizCreator"
          color="info"
          size="lg"
        >
          Create a New Quiz
        </Button>{" "}
        <Button
          className="btn-neutral"
          onClick={this.showEditor}
          id="renderQuizEditor"
          color="info"
          size="lg"
        >
          Edit a previous quiz
        </Button>
        {this.state.renderQuizCreator && (
          <QuizCreator
            currentUser={this.props.currentUser}
            deviceId={this.props.deviceId}
            quizTracks={this.state.quizTracks}
            removeFromQuiz={this.removeFromQuiz}
            clearQuizTracks={this.clearQuizTracks}
            hideTracks={this.hideTracks}
          />
        )}
        {this.state.renderQuizEditor && (
          <QuizEditor
            deviceId={this.props.deviceId}
            quizTracks={this.state.quizTracks}
            clearQuizTracks={this.clearQuizTracks}
            hideTracks={this.hideTracks}
            removeFromQuiz={this.removeFromQuiz}
            currentUser={this.props.currentUser}
          />
        )}
        {(this.state.renderQuizCreator || this.state.renderQuizEditor) && (
          <Dropdown
            direction="right"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Playlists</DropdownToggle>
            <DropdownMenu>
              {this.state.playlistInfo.map(playlist => {
                let boundItemClick = this.showTracks.bind(this, playlist);
                return (
                  <DropdownItem key={playlist.URI} onClick={boundItemClick}>
                    {playlist.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        )}
        {showPlaylist && (
          <UserPlaylists
            addToQuiz={this.addToQuiz}
            removeFromQuiz={this.removeFromQuiz}
            playlist={this.state.activePlaylist}
          />
        )}
      </Container>
    );
  }
}
