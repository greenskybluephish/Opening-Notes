import React, { Component } from "react"
import { Container } from "reactstrap"
import spotifyPlayer from "../../modules/playback-function"


export default class Home extends Component {


componentDidMount() {
  // setTimeout(() => {
  //   spotifyPlayer.createSpotifyPlayer().then(id=> console.log(id))
  // }, 1000)
}






  render() {
      return (
        <Container>
          <div className="App">
            <div>
              <h2> Welcome to Phish Quiz! </h2>
            </div>
          </div>
        </Container>
      )
    }
  }