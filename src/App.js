import React, { Component } from "react"
import NavBar from "./components/nav/NavBar"
import ApplicationViews from "./components/ApplicationViews"



class App extends Component {

    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default App
