import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

export default class NavigationMenu extends Component {
    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Michael's Shop</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="/">
                        Products
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Sales
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}