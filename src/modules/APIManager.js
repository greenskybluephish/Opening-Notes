import SpotifyWebAPI from "./spotify-web-api"


const remoteURL = "https://api.spotify.com/v1";
const baseURL = "https://calm-mesa-57338.herokuapp.com";

const spotifyRequest = window.OAuth.create("spotify");
const accessToken = spotifyRequest.access_token

const spotifyAPI = new SpotifyWebAPI();
spotifyAPI.setAccessToken(accessToken);



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
      //returns an array of objects with playlist name (like "Favorite Smashing Pumpkins jamz")
      //and the id of the playlist. Use this to feed the playlists selection list
        
      try {
          const playlistsResponse = await spotifyAPI.getAlbumTracks("709gu2Yj2tfqmNMIEDfOPg", )
           console.log(playlistsResponse)

      }
      catch(err) {
          //return default array with note that can't download playlists
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
            return [uri, sections[startingPoint].start * 1000]
          } else {
            if (arrayLoudness[0] > arrayLoudness[1]) {
              // console.log([uri, 0, 2])
              return [uri, 0]
            } else {
              let firstSections = arrayLoudness.slice(0, 5);
              let averageLoudness = firstSections.reduce((a, b) => a + b) / firstSections.length;
              let newPoint = sections.findIndex(section => section.loudness > averageLoudness);
              // console.log([uri, sections[newPoint].start* 1000, 3])
              return [uri, sections[newPoint].start * 1000]

            }
          }
        })
    },

    JSONtracks() {
      return fetch(`${baseURL}/spotifyTracks`).then(res => res.json());
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
    }
  }

};
