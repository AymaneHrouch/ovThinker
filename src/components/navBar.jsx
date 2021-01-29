import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const NavigationBar = ({ user, theme, themeToggler }) => {
  return (
    <Navbar bg={theme} variant={theme} expand="lg">
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
              {user && (
                <NavDropdown
                  title={user.name}
                  className="ml-md-auto mr-lg-4 pr-lg-4"
                >
                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/logout">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </React.Fragment>
          )}
          {!user && (
            <React.Fragment>
              <Nav.Link
                as={NavLink}
                exact
                to="/register"
                className="ml-lg-auto"
              >
                Register
              </Nav.Link>
              <Nav.Link as={NavLink} exact to="/login">
                Login
              </Nav.Link>
            </React.Fragment>
          )}
          <Nav.Link onClick={themeToggler}>
            <i
              class={`mr-2 fa fa-toggle-${theme === "dark" ? "on" : "off"}`}
              aria-hidden="true"
            ></i>
            <i class="fa fa-moon-o" aria-hidden="true"></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
