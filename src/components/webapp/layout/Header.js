import React, { Component } from 'react'
import {
    Container,
    Navbar,
    NavbarBrand,} from 'reactstrap';
import './Header.css'
import Sidebar from './Sidebar';

export class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar fixed="top" className="bg-primary" dark expand="md">
            <Container>
            <Sidebar pageWrapId={ "container" } />
            <NavbarBrand className="ml-auto" href="/">Al Fatih College</NavbarBrand>
                {/* <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                      
                </Collapse> */}
            </Container>
        </Navbar>
        {/* <div className="mb-5 pb-5" /> */}
      </React.Fragment>
    )
  }
}

export default Header
