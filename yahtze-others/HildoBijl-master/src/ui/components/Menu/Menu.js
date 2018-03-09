import './Menu.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import routes from '../../../config/routes.js'

import MenuItem from './MenuItem.js'

class Menu extends Component {
  render() {
    const menu = []
    for (let url in routes) {
      menu.push(<MenuItem key={url} page={routes[url]} />)
    }
    return (
      <nav className="menu">
        {menu}
      </nav>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      router: state.router,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(Menu)
