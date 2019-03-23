import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './components/pages/auth/Auth'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          {/* <Route exact path='/' component={Home} /> */}
          <Route path="/login" component={Auth} />
          <Route path="/register" component={Auth} />
        </div>
      </Router>
    );
  }
}

export default App;
