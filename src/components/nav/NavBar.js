import React from "react";
// reactstrap components
import { Link } from "react-router-dom";
import {
  Collapse,

  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";





export default class NavBar extends React.Component {

  state = {
    collapseOpen: false
  }

  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
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
        <Navbar className="bg-info" expand="lg">
          <Container>
            <button className="navbar-toggler" id="navbarNav" type="button" onClick={this.toggleCollapse}>
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
              <Nav navbar>
                <NavItem className="active">
                  <NavLink tag={Link} to="/home">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/test">
                    Test
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
          </Container>
        </Navbar>
      
    );
  }
}

