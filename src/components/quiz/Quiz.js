import React, { Component } from "react"
import { Container, Button } from "reactstrap"
import API from "../../modules/spotifyAPIManager"
import QuizBox from "../quiz/QuizBox"


export default class Home extends Component {

  state = {
    quizTracks: [],
    currentTrack: "",
    nextTrack: "",
    nextStart: 0,
    offset: 1,
    startQuiz: false,
    trackURI: ""
  }

  componentDidMount() {
    this.setState({ loggedIn: true });

    API.get.JSONtracks().then(tracks => {
      const quizTracks = tracks.map(track => {
        return [track.spotifyURI, track.position_ms]
      })
      const trackURIS = tracks.map(track => {
        return `spotify:track:${track.spotifyURI}`
      }); this.setState({ quizTracks: quizTracks, trackURI: trackURIS.slice(30,50) })
      }); 
  }



  handleStart = () => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${this.props.deviceId}`, {
      body: JSON.stringify({
        "uris": this.state.trackURI,
        "position_ms": this.state.quizTracks[5][1]
      }), 
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.props.access_token}`,
        "Content-Type": "application/json"
      },
      method: "PUT"
    })
    
    setTimeout(() => {
      this.setState({ startQuiz: true })
      this.nextTrack();
      this.handleStop();
    }, 8000);
  }

  handleSeek = () => {
    this.player.nextTrack().then(()=> {
      this.player.seek(this.state.nextStart);
    });
  }




  handlePlay = () => {

    this.handleSeek();
      setTimeout(() => {
        this.nextTrack();
        this.handleStop();
      }, 10000);
    }
  

  handleStop = () => {
    this.player.pause();
    };



  nextTrack = () => {
    this.player.getCurrentState().then(state => {
      if (!state) {
        console.error('User is not playing music through the Web Playback SDK');
        alert("Please close spotify on all devices.")
        return;
      }
      console.log(state)
      let currentTrack = state.track_window.current_track.name
      let nextTrack = state.track_window.next_tracks[0].id;
      let nextQuizTrack = this.state.quizTracks.find(quizTrack => quizTrack[0] === nextTrack);
      this.setState({
        currentTrack: currentTrack,
        nextTrack: nextQuizTrack[0],
        nextStart: nextQuizTrack[1],
        offset: this.state.offset + 1,
      })

    });
  }



  render() {
    if (!this.state.startQuiz) {
      return (
        <Container>
          <div className="App">
            <div>
              <h2> Phish Quiz! </h2>
              <Button onClick={this.handleStart}>Click Me to Start the Quiz!
            </Button>
            <Button onClick={this.testIt}>Test</Button>
            </div>
          </div>
        </Container>
      )
    } else {
      return <QuizBox handlePlay={this.handlePlay} currentTrack={this.state.currentTrack}></QuizBox>
    }
  }
}