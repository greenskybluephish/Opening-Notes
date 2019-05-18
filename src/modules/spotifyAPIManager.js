
const remoteURL = "https://api.spotify.com/v1";


// const spotifyRequest = window.OAuth.create("spotify");
// const accessToken = spotifyRequest.access_token




export default {

    async getUserPlaylists() {
      const spotifyRequest = window.OAuth.create("spotify");
      const accessToken = spotifyRequest.access_token
      try {
        const playlistResponse = await fetch("https://api.spotify.com/v1/me/playlists", 
          {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        })
        let json = await playlistResponse.json(); 
           return json.items
      }
      catch(err) {
          console.error(err);
      }
  },
  async getPlaylistTracks(playlistURI) {
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    try { 
      let response = await fetch(`${remoteURL}/playlists/${playlistURI}/tracks?market=US&fields=items(track(id%2Cduration_ms%2Cname%2Curi%2C%20album(name)%2Cartists(name)))&limit=100`,         {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      let json = await response.json();
      let items = json.items;
      let tracks = items.map(tracks => tracks.track)
      return tracks
  
    } 
      catch(err) {
        //return error note.
        console.error(err);
    }
  },
    async spotifyTrackInfo(uri) {
      const spotifyRequest = window.OAuth.create("spotify");
      const accessToken = spotifyRequest.access_token
      const res = await fetch(`https://api.spotify.com/v1/audio-analysis/${uri}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      let sections = data.sections;
      let arrayLoudness = sections.map(section => section.loudness);
      let startingPoint = arrayLoudness.findIndex(section => section > -15.5);
      if (startingPoint <= 2 && startingPoint >= 0) {
        console.log([uri, sections[startingPoint].start * 1000, 1]);
        return (sections[startingPoint].start);
      }
      else {
        if (arrayLoudness[0] > arrayLoudness[1]) {
          return 0;
        }
        else {
          let firstSections = arrayLoudness.slice(0, 5);
          let averageLoudness = firstSections.reduce((a, b) => a + b) / firstSections.length;
          let newPoint = sections.findIndex(section => section.loudness > averageLoudness);
          console.log([uri, sections[newPoint].start * 1000, 3]);
          return (sections[newPoint].start);
        }
      }
    },
    async startPlayback(quizTracks, time) {
      const spotifyRequest = window.OAuth.create("spotify");
      const accessToken = spotifyRequest.access_token
      try { 
        await fetch(`https://api.spotify.com/v1/me/player/play`, {
          body: JSON.stringify({
            "uris": quizTracks,
            "position_ms": time
          }), 
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
          method: "PUT"
        })
      } 
      catch(err) {
        //return error note.
        console.error(err);
      }
    },

  async playOneSong(track, time, deviceId) {
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    try { 
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        body: JSON.stringify({
          "uris": [track],
          "position_ms": time
        }), 
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
    } 
    catch(err) {
      //return error note.
      console.error(err);
    }
  },
  async pauseSong() {
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    try { 
      await fetch(`https://api.spotify.com/v1/me/player/pause`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
    } 
    catch(err) {
      //return error note.
      console.error(err);
    }
  },
  
  async transferPlayback(deviceId) {
    const spotifyRequest = window.OAuth.create("spotify");
    const accessToken = spotifyRequest.access_token
    try { 
      await fetch(`https://api.spotify.com/v1/me/player/`, {
        body: JSON.stringify({
          "device_ids": [
            deviceId
          ],
        "play": false
        }), 
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
    } 
    catch(err) {
      //return error note.
      console.error(err);
    }
  }
}
