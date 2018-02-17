import React, { Component } from 'react'
import '../css/App.css'
import Header from './Header'
import Scorecard from './Scorecard' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Scorecard />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App
