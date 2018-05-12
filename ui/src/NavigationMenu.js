import React, { Component } from 'react';
import { Navbar, Nav, NavItem} from 'react-bootstrap';

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
        </Nav>
              </Navbar>)
    }
}