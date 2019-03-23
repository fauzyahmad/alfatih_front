import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './login/Login'
import Register from './register/Register'
import './Auth.css'
import logoImage from '../image/logo.png'

export class Auth extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
            <div className="row">
                <div className="bgAuth col-md-7 col-lg-8 d-none d-md-block">
                </div>
                <div className="colLogin col-md-5 col-lg-4">
                    <div className="mt-5">
                        <img alt="Logo" src={logoImage} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                    </div>
                </div>
            </div>
        </div>
      </Router>
    )
  }
}

export default Auth
