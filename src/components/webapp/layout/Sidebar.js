import React, { Component } from 'react'
import { push as Menu } from "react-burger-menu";
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import './Sidebar.css'
import logoImage from '../../image/logo.png'

export class Sidebar extends Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen: false
        }
      }
    
      // This keeps your state in sync with the opening/closing of the menu
      // via the default means, e.g. clicking the X, pressing the ESC key etc.
      handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
      }
      
      // This can be used to close the menu, e.g. when a user clicks a menu item
      closeMenu () {
        this.setState({menuOpen: false})
      }
    
      // This can be used to toggle the menu, e.g. when using a custom icon
      // Tip: You probably want to hide either/both default icons if using a custom icon
      // See https://github.com/negomi/react-burger-menu#custom-icons
      toggleMenu () {
        this.setState({menuOpen: !this.state.menuOpen})
    }
    render () {
        return (
            <Menu 
              isOpen={this.state.menuOpen}
              onStateChange={(state) => this.handleStateChange(state)}
            >
              <img width="40%" 
                className="shadow-img d-table m-auto rounded-circle text-center" 
                alt="logo-alfatih" src={logoImage} 
              />
              <Link className="hover-side text-center p-2 mt-3" to='/' onClick={() => this.closeMenu()}>
                <div style={{display: '-webkit-inline-box'}}>
                  <h5 className="mr-2 text-light" style={{marginTop: '.42rem'}}>Beranda</h5>
                  <FontAwesomeIcon
                    icon={faChevronRight} 
                    size="1x" className="mt-2" color="#fff"/>
                </div>
              </Link>
              {/* <Link className="hover-side text-center p-2" to='/riwayat' onClick={() => this.closeMenu()}>
              <div style={{display: '-webkit-inline-box'}}>
                  <h5 className="mr-2 text-light" style={{marginTop: '.42rem'}}>Riwayat</h5>
                  <FontAwesomeIcon
                    icon={faChevronRight} 
                    size="1x" className="mt-2" color="#fff"/>
                </div>
              </Link> */}
            </Menu>
        )
      }
}

export default Sidebar
