import spotifyAPI from "./spotifyAPIManager"


export default {

  async waitForSpotifyWebPlaybackSDKToLoad () {
    return new Promise(resolve => {
      if (window.Spotify) {
        resolve(window.Spotify);
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve(window.Spotify);
        };
      }
    });
  },
  
  async sPlayer () {
    const spotifyRequest = await window.OAuth.create("spotify");
    const accessToken =  spotifyRequest.access_token;
    const { Player } = await this.waitForSpotifyWebPlaybackSDKToLoad();
    const sdk = new Player({
      name: "Quiz Player",
      volume: 1.0,
      getOAuthToken: callback => { callback(accessToken); }
    });
  //   let connected = await sdk.connect();
  //   if (connected) {    
  //   sdk.addListener('ready', async ({ device_id }) => {
  //   await spotifyAPI.transferPlayback(device_id)
  //   const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]');
  //     if (iframe) {
  //       iframe.style.display = 'block';
  //       iframe.style.position = 'absolute';
  //       iframe.style.top = '-1000px';
  //       iframe.style.left = '-1000px';
  //     }
  //     console.log("ready");
  //   })
  // }
    return sdk
  }
}