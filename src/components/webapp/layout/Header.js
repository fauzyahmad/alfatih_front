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
    if(this.props.location.pathname === '/exam') {
      return (
        <React.Fragment>
          <Navbar fixed="top" className="bg-primary" dark expand="md">
              <Container>
              <NavbarBrand href="#"
              onClick={() => this.props.history.push('/')}>
                Al Fatih College
              </NavbarBrand>
                
                      <Nav navbar>
                          <NavItem>
                              <NavLink onClick={this.props.handleLogOut} href="#">Logout</NavLink>
                          </NavItem>
                      </Nav>
                      
              </Container>
          </Navbar>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Navbar fixed="top" className="bg-primary" dark expand="md">
              <Container>
              <Sidebar pageWrapId={ "container" } />
              <NavbarBrand href="#"
              onClick={() => this.props.history.push('/')}>
                Al Fatih College
              </NavbarBrand>
                 
                      <Nav navbar>
                          <NavItem>
                              <NavLink onClick={this.props.handleLogOut} href="#">Logout</NavLink>
                          </NavItem>
                      </Nav>
                      
              </Container>
          </Navbar>
        </React.Fragment>
      )
    }
  }
}

export default Header
