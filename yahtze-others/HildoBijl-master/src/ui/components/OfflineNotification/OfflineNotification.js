import './OfflineNotification.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import { isSignedIn } from '../../../redux/user.js'

class OfflineNotification extends Component {
	shouldShowOfflineNotification() {
		if (this.props.online)
			return false // We're online. Everything is fine. No need to show anything.
		if (isSignedIn(this.props.user))
			return true // We're offline but logged in. The user expects data to be saved, but it won't. Inform the user of this.
		return false // No reason to inform the user. He's not trying to use any internet-related activities.
	}
  render() {
    return (
      <div className={classnames({
				offlineNotification: true,
				active: this.shouldShowOfflineNotification(),
			})}>
				<span>
					You seem to be offline.
				</span>
      </div>
    )
	}
}

export default connect(
  function mapStateToProps(state) {
    return {
			online: state.status.online,
			router: state.router,
			user: state.user,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {}
  }
)(OfflineNotification)
