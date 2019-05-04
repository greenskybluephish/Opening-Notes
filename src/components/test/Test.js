// import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import API from "../../modules/spotifyAPIManager";



export default class Test extends Component {


   handlePlay = () => {
    API.get.spotifyAlbumTracks().then(tracks => {
      tracks.forEach(track => {
        setTimeout(() => {
          API.get.spotifyTrackInfo(track).then(async data => {
            let song = await data
                  let songObject = {
                  "spotifyURI": song[0],
                  "position_ms": song[1]
                 }
               API.post.toJSONServer("spotifyTracks", songObject)
        }, 100);

    })
})

    }  )}
    



    handleTest = () => {
      API.get.getUserPlaylists()
    }



      render() {

      return (
        <div className="App">

          <button onClick={this.handleTest}>Get tracks
            </button>
        </div>
      );
    }
}


