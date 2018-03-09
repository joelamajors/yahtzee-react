import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import ScoreBoard from './scoreBoard';
import Dice from './dice';

function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <ScoreBoard/>
        <Dice/>
      </div>
    </div>
  );
};

export default App;
