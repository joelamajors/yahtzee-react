import './Main.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'redux-little-router'
import Helmet from 'react-helmet'

import { isGameFinished } from '../../../redux/gameState.js'

import Menu from '../../components/Menu/Menu.js'
import OfflineNotification from '../../components/OfflineNotification/OfflineNotification.js'
import RollBoard from '../../pages/RollBoard/RollBoard.js'
import EndingScreen from '../../pages/EndingScreen/EndingScreen.js'
import Settings from '../../pages/Settings/Settings.js'
import Account from '../../pages/Account/Account.js'
import About from '../../pages/About/About.js'

class Main extends Component {
  render() {
    // Define the page title and include it through a Helmet.
    const title = (this.props.router.result ? this.props.router.result.title : 'Yahtzee')

    // Define the page that should be shown for the game.
    const gamePage = isGameFinished(this.props.gameState) ? <EndingScreen/> : <RollBoard/>

    // Set up the right page.
    return (
      <div className="main">
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Menu />
        <OfflineNotification />
        <Fragment withConditions={router => router.pathname === '/' || !router.result}>{gamePage}</Fragment>
        <Fragment withConditions={router => router.pathname === '/settings'}><Settings /></Fragment>
        <Fragment withConditions={router => router.pathname === '/account'}><Account /></Fragment>
        <Fragment withConditions={router => router.pathname === '/about'}><About /></Fragment>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      router: state.router,
      gameState: state.gameState,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(Main)
