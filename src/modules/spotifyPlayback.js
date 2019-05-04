const spotifyRequest = window.OAuth.create("spotify");
const accessToken = spotifyRequest.access_token

async function waitForSpotifyWebPlaybackSDKToLoad () {
  return new Promise(resolve => {
    if (window.Spotify) {
      resolve(window.Spotify);
    } else {
      window.onSpotifyWebPlaybackSDKReady = () => {
        resolve(window.Spotify);
      };
    }
  });
};

(async () => {
  const { Player } = await waitForSpotifyWebPlaybackSDKToLoad();
  const sdk = new Player({
    name: "Phish Quiz",
    getOAuthToken: callback => { callback(accessToken); }
  });
  sdk.on("player_state_changed", state => {
    // Update UI with playback state changes
  });
  let connected = await sdk.connect();
  if (connected) {

    console.log("truth");
  }
})();