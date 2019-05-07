import React from "react";
// reactstrap components
import { Link } from "react-router-dom";
import {
  Collapse,
  NavbarBrand,
  NavbarToggler,
  Navbar,
  NavItem,
  NavLink,
  Nav,

} from "reactstrap";





export default class NavBar extends React.Component {

  state = {
    isOpen: true
  }

  toggle =() => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };

  localLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
  }
  
  render() {
    return (
      <div>
        <Navbar className="bg-info" expand="lg">
          <NavbarBrand>QuizTime</NavbarBrand>
          <button onClick={this.toggle} className="navbar-toggler" id="navbarNav" type="button">
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse isOpen={!this.state.isOpen} navbar>
          
              <Nav navbar>
                <NavItem className="active">
                  <NavLink tag={Link} to="/home">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/create">
                    Quiz Creator
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/quiz" >
                    Quiz
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" onClick={this.localLogout}>
                Log Out
                </NavLink>
                </NavItem>

              </Nav>
            </Collapse>
        </Navbar>
        </div>
    );
  }
}

