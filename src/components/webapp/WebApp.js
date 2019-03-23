import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Header from './layout/Header'
export class WebApp extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
            <Header />
            <Route path='/' component={Home} />
        </React.Fragment>
      </Router>
     
    )
  }
}

export default WebApp
