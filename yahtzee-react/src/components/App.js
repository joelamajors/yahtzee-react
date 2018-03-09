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
        <br />
      </div>
    );
  }
}

export default App
