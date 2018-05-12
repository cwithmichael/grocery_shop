import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class NavigationMenu extends Component {
    render() {
        return(
        <Navbar>
        <Nav>
          <NavItem eventKey={1} href="/">
            Home
          </NavItem>
          <NavItem eventKey={2} href="#">
            Products
          </NavItem>
          <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Sign-In</MenuItem>
            <MenuItem eventKey={3.2}>Register</MenuItem>
          </NavDropdown>
        </Nav>
              </Navbar>)
    }
}