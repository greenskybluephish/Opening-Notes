

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
    return sdk
  }
}