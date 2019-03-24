import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Exam from './pages/exam/Exam'
import Header from './layout/Header'
export class WebApp extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
            <Header />
            <Route path='/home' component={Home} />
            <Route path='/exam' component={Exam} />
        </React.Fragment>
      </Router>
     
    )
  }
}

export default WebApp
