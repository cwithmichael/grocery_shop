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
            </Navbar>
        )
    }
}