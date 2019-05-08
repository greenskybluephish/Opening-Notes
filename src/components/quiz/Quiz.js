import React, { Component } from "react"
import { Container} from "reactstrap"
import spotifyAPI from "../../modules/spotifyAPIManager"
import QuizBox from "../quiz/QuizBox"
import quizAPI from "../../modules/jsonAPIManager"
import QuizHeader from "./QuizHeader"

export default class Quiz extends Component {

  state = {
    quizTracks: [],
    currentTrack: "",
    nextTrack: "",
    nextStart: "",
    offset: 1,
    startQuiz: false,
    trackURI: "",
    deviceId: "",
    loggedIn: false,
    error: "",
    playerCheckInterval: null,
  }

  componentDidMount() {
       this.playerCheckInterval = setInterval(() => this.checkForPlayer(this.props.access_token), 1000)
  }

  


  checkForPlayer = (token) => {
  
    if (window.Spotify !== null) {
      clearInterval(this.playerCheckInterval);

      this.player = new window.Spotify.Player({
        name: "Brians's Spotify Player",
        getOAuthToken: cb => { cb(token); }
      });

      this.createEventHandlers();

      // finally, connect!
      this.player.connect();
    }
  }

  createEventHandlers = () => {
    this.player.on('initialization_error', e => { console.error(e); });
    this.player.on('authentication_error', e => {
      console.error(e);
      this.setState({ loggedIn: false });
    });

    this.player.on('account_error', e => { console.error(e); });
    this.player.on('player_state_changed', state => { console.log(state); });

    // Ready
    this.player.on('ready', async data => {
      const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
      if (iframe) {
        iframe.style.display = 'block';
        iframe.style.position = 'absolute';
        iframe.style.top = '-1000px';
        iframe.style.left = '-1000px';
      }
      let { device_id } = data;
       await this.setState({ deviceId: device_id, loggedIn: true });
       console.log("Quiz time!");
    });
  }



  selectQuiz = (quizId) => {
    quizAPI.getOneEntry("quizs", quizId).then(quiz => {
      let quizTrackInfo = quiz.quizTrackIds
      let quizTracks = [];
      while (quizTrackInfo.length !== 0) {
        let randomIndex = Math.floor(Math.random() * quizTrackInfo.length)
          quizTracks.push(quizTrackInfo[randomIndex]);
          quizTrackInfo.splice(randomIndex, 1);
      }
      console.log(quizTracks);
      

       this.setState({ quizTracks: quizTracks, startQuiz: true})
  })
  }





  handleStart = () => { 
    const quizTrackIds = this.state.quizTracks.map(track => track.uri)
    const firstStart = this.state.quizTracks[0].startTime
      spotifyAPI.put.startPlayback(this.state.deviceId, quizTrackIds, (firstStart * 1000)).then(() => {
    setTimeout(() => {
      this.handleStop();
      this.nextTrackInfo();

    }, 12000);
    
  
    })


  }

  handleSeek = () => {
    this.player.nextTrack().then(()=> {
      this.player.seek(this.state.nextStart);
    });
  }




  handlePlay = () => {

    this.handleSeek();
    
      setTimeout(() => {
        this.nextTrackInfo();
        this.handleStop();
      }, 12000);
    }
  

  handleStop = () => {
    this.player.pause();
    };



  nextTrackInfo = () => {
    this.player.getCurrentState().then(status => {
      if (!status) {
        console.error('User is not playing music through the Web Playback SDK');
        alert("Please close spotify on all devices.")
        return;
      }
      console.log(status)
      let newState = {}
      let currentTrack = status.track_window.current_track.name
      newState.currentTrack = currentTrack
      let nextTrack = status.track_window.next_tracks[0].id;
      newState.nextTrack = nextTrack
      newState.offset = (this.state.offset + 1)
      let startTime = this.state.quizTracks[this.state.offset].startTime
      newState.nextStart = startTime
      this.setState(newState)
      });
      
      
    };
  



  render() {
      return (
        <Container>
          <div className="App">
              <h2> Phish Quiz! </h2>
      {!this.state.startQuiz && <QuizHeader selectQuiz={this.selectQuiz}></QuizHeader> }
          
      {this.state.startQuiz&& <QuizBox handleStart={this.handleStart} handlePlay={this.handlePlay} currentTrack={this.state.currentTrack}></QuizBox>}
      </div>
        </Container>
      )
      }
}