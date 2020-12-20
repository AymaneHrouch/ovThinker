import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          overThinker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100">
            <Nav.Link as={NavLink} exact to="/journals">
              Journals
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/random">
              random
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/locked">
              Locked
            </Nav.Link>
            <Nav.Link as={NavLink} exact to="/login">
              Login
            </Nav.Link>
            {/* <Nav.Link as={NavLink} exact to="/register">
              Register
            </Nav.Link> */}
            <Nav.Link as={NavLink} exact to="/profile" className="ml-md-auto">
              Aymane Hrouch
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
