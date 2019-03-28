import React, { Component } from 'react'
import {
    Container,
    Navbar,
    Nav, NavItem, NavLink,
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
            <NavbarBrand href="/">Al Fatih College</NavbarBrand>
               
                    <Nav navbar>
                        <NavItem>
                            <NavLink onClick={this.props.handleLogOut} href="#">Logout</NavLink>
                        </NavItem>
                    </Nav>
                    
            </Container>
        </Navbar>
        {/* <div className="mb-5 pb-5" /> */}
      </React.Fragment>
    )
  }
}

export default Header
