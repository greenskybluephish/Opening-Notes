import React from "react";
// reactstrap components
import { Link } from "react-router-dom";
import "./navbar.css"
import {
  // Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'



export default class NavBar extends React.Component {

  state = {
    collapseOpen: false,
    color: "bg-info",
    collapseOut: ""
  }

  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  // changeColor = () => {
  //   if (
  //     document.documentElement.scrollTop > 99 ||
  //     document.body.scrollTop > 99
  //   ) {
  //     this.setState({
  //       color: "bg-info"
  //     });
  //   } else if (
  //     document.documentElement.scrollTop < 100 ||
  //     document.body.scrollTop < 100
  //   ) {
  //     this.setState({
  //       color: "navbar-transparent"
  //     });
  //   }
  // };
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
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  localLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
  }
  
  render() {
    return (
       <Navbar
        className={this.state.color}
        // color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
            to="/"
            data-placement="bottom"
            tag={Link}>QuizTime</NavbarBrand>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
            <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
          <Collapse             
          className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}>
                        <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  QuizTime
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                   <FontAwesomeIcon icon={faBars} />
                  </button>
                </Col>
              </Row>
            </div>
              <Nav navbar>
                <NavItem className="active">
                  <NavLink tag={Link} to="/home">
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

