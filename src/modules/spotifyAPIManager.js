


const remoteURL = "https://api.spotify.com/v1";
const baseURL = "https://calm-mesa-57338.herokuapp.com";

const spotifyRequest = window.OAuth.create("spotify");
const accessToken = spotifyRequest.access_token




export default {
  get: {
    spotifyAlbumTracks() {
      return fetch(
        `${remoteURL}/albums/709gu2Yj2tfqmNMIEDfOPg/tracks?market=US&limit=50`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }
      ).then(response => response.json()).then(data => {

        let tracks = data.items
        let mapTracks = tracks.map(track => track.id)
        return mapTracks
      }
      )
    },
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
          //return default array with note that can't download playlists
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


    spotifyTrackInfo(uri) {
      return fetch(`https://api.spotify.com/v1/audio-analysis/${uri}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        }).then(res => res.json()).then(data => {
          let sections = data.sections
          let arrayLoudness = sections.map(section => section.loudness);
          let startingPoint = arrayLoudness.findIndex(section => section > -15.5)
          if (startingPoint <= 2 && startingPoint >= 0) {
            // console.log([uri, sections[startingPoint].start*1000, 1])
            return (sections[startingPoint].start * 1000)
          } else {
            if (arrayLoudness[0] > arrayLoudness[1]) {
              // console.log([uri, 0, 2])
              return 0
            } else {
              let firstSections = arrayLoudness.slice(0, 5);
              let averageLoudness = firstSections.reduce((a, b) => a + b) / firstSections.length;
              let newPoint = sections.findIndex(section => section.loudness > averageLoudness);
              // console.log([uri, sections[newPoint].start* 1000, 3])
              return (sections[newPoint].start * 1000)

            }
          }
        })
    }
  },
  post: {
    toJSONServer(endpoint, objectToPost) {
      return fetch(`${baseURL}/${endpoint}`, {
        method: "POST",
        body: JSON.stringify(objectToPost),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(e => e.json());

    },
    spotifyNextTrack() {
      fetch(`${remoteURL}/me/player/next`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "POST"
      })
    }
  },
  put: {
    spotifyShuffle(deviceId) {
      fetch(`${remoteURL}/me/player/shuffle?state=true&device_id=${deviceId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        method: "PUT"
      })
    },
    async startPlayback(deviceId, quizTracks, time) {
      const spotifyRequest = window.OAuth.create("spotify");
      const accessToken = spotifyRequest.access_token
      try { 
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
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
  }
  
}
}
