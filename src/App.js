import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './components/auth/Auth'
import WebApp from './components/webapp/WebApp'
import './App.css';
// import Daftar from './components/webapp/pages/daftar/Daftar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={WebApp} />
          <Route path="/cluster" component={WebApp} />
          <Route path="/exam" component={WebApp} />
          <Route path="/riwayat" component={WebApp} />
          <Route path="/login" component={Auth} />
          <Route path="/register" component={Auth} />
        </div>
      </Router>
    );
  }
}

export default App;
