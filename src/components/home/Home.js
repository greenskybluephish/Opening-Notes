import React, { Component } from "react"
import { Container } from "reactstrap"
import Quiz from "../quiz/Quiz"
import { css } from '@emotion/core';
// First way to import
import { RingLoader } from 'react-spinners';




export default class Home extends Component {





  render() {
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

      return (
        <>
        <div className='sweet-loading'>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={!this.props.playerIsReady}
        />
      </div> 

       {this.props.playerIsReady && <Container>
          <div className="App">
          {/* <h1 className="title">Opening Notes</h1> */}
            <div>
              <Quiz          
               access_token={this.props.access_token}
              deviceId={this.props.deviceId}
              player={this.props.player}
              currentUser={this.props.currentUser}>
              </Quiz>
            </div>
          </div>
        
        </Container>}
        </>
      )
    }
  }