import './Settings.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import settingActions, { getSettings } from '../../../redux/settings.js'
import { isSignedIn } from '../../../redux/user.js'

import Checkbox from '../../components/Checkbox/Checkbox.js'
import Radio from '../../components/Radio/Radio.js'

class Settings extends Component {
  checkDeleteAccount() {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone!')) {
      window.alert('Oops! We haven\'t implemented this functionality yet. Please try again later.')
      // ToDo: delete account through redux.
    }
  }
  render() {
    return (
      <div className="page settings">
        <div>
          <h2>Hotkeys</h2>
          <Checkbox
            checked={this.props.settings.useHotkeys}
            label='Use hotkeys'
            changeFunction={(newValue) => this.props.applySetting({ useHotkeys: newValue })}
          />
          <p>During a game, press <strong>~</strong> to see the hotkeys</p>
        </div>

        <div>
          <h2>Direct feedback</h2>
          <Checkbox
            checked={this.props.settings.luckFeedback}
            label='Show the luck score of rolls'
            changeFunction={(newValue) => this.props.applySetting({ luckFeedback: newValue })}
          />
          <Checkbox
            checked={this.props.settings.choiceFeedback}
            label='Show feedback on choices made'
            changeFunction={(newValue) => this.props.applySetting({ choiceFeedback: newValue })}
          />
          <Checkbox
            checked={this.props.settings.scoreFeedback}
            label='Show the expected score'
            changeFunction={(newValue) => this.props.applySetting({ scoreFeedback: newValue })}
          />
        </div>

        <div>
          <h2>Report card (under construction)</h2>
          <Radio
            options={[
              'Always show report card',
              'Optional report card: show button',
              'Never show report card',
            ]}
            value={this.props.settings.showReport}
            changeFunction={(showReport) => this.props.applySetting({ showReport })}
          />
          <p style={{marginTop: '6px'}}>The report card is still being developed</p>
        </div>

        <div>
          <h2>Predictive mode (under construction)</h2>
          <p>Predictive mode is still being developed</p>
        </div>

        {this.renderDeleteData()}
      </div>
    )
  }
  renderDeleteData() {
    if (!isSignedIn(this.props.user))
      return ''
    return (
      <div>
        <h2>Delete account (under construction)</h2>
        <p>This will erase all your data</p>
        <span id="deleteAccount" className="btn" onClick={this.checkDeleteAccount.bind(this)}>Delete my account</span>
      </div>
    )
  }
}

export default connect(
  function mapStateToProps(state) {
    return {
      user: state.user,
      settings: getSettings(state.settings),
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      applySetting: (setting) => dispatch(settingActions.applySetting(setting)),
    }
  }
)(Settings)