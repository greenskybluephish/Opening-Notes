import React, { Component } from "react"
import NavBar from "./components/nav/NavBar"
import ApplicationViews from "./components/ApplicationViews"





class App extends Component {

    state = {
        userLoggedIn: false
    }

    setLoginStatus = (status) => {
        this.setState({userLoggedIn: status})
    }


    render() {
        return (
            <React.Fragment>
                {this.state.userLoggedIn && <NavBar />}
                <ApplicationViews setLoginStatus={this.setLoginStatus} userLoggedIn={this.state.userLoggedIn} />
            </React.Fragment>
        )
    }
}

export default App
