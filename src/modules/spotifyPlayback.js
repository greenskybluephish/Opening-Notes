import React, { Component } from "react"
import spotifyAPI from "../../modules/spotifyAPIManager"


export default class SpotifyPlayer extends Component {

  state = {
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

      let player = new window.Spotify.Player({
        name: "Brians's Spotify Player",
        getOAuthToken: cb => { cb(token); }
      });

      this.createEventHandlers();

      // finally, connect!
      player.connect();
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
  render()  {
    return
  }
}