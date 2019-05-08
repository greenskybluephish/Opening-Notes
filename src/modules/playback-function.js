
export default {

  async createSpotifyPlayer() {
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    // if the Spotify SDK has loaded
    let player = new window.Spotify.Player({
      name: "quizPlayer",
      getOAuthToken: cb => { cb(accessToken); },
    });
    if (window.Spotify !== null) {
      // cancel the interval

      // finally, connect!
      player.connect();
      player.addListener('ready', async ({ device_id }) => {
        const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
        if (iframe) {
          iframe.style.display = 'block';
          iframe.style.position = 'absolute';
          iframe.style.top = '-1000px';
          iframe.style.left = '-1000px';
        }
        console.log("ready");
      }); return player._options.id
    }
  }


  }

