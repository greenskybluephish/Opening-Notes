import React from "react";
// reactstrap components
import { Link } from "react-router-dom";
import "./navbar.css"
import {

  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";



export default class NavBar extends React.Component {


  localLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
  }

  render() {
    return (

        <Navbar className="bg-info" light expand="lg">
        <Container>
          
              <Nav navbar>
                <NavItem className="active">
                  <NavLink tag={Link} to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/profile">
                    My Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/create">
                    Quiz Creator
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/" onClick={this.localLogout}>
                Log Out
                </NavLink>
                </NavItem>
              </Nav>
            </Container>
        </Navbar>

    );
  }
}

