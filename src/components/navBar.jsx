import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const NavigationBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        overThinker
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="w-100">
          {user && (
            <React.Fragment>
              <Nav.Link as={NavLink} exact to="/journals">
                Journals
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/random">
                random
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/locked">
                Locked
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/logout">
                Logout
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/profile" className="ml-md-auto">
                {user ? user.name : ""}
              </Nav.Link>
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <Nav.Link
                as={NavLink}
                exact
                to="/register"
                className="ml-md-auto"
              >
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/login">
                Login
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
