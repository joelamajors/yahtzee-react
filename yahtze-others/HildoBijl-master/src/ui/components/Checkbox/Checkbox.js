import './Checkbox.css'

import React, { Component } from 'react'
import classnames from 'classnames'

export default class Checkbox extends Component {
  render() {
		const onClick = () => this.props.changeFunction(!this.props.checked)
    return (
      <div>
				<span className={classnames(
					'checkboxField',
					{ 'checked': this.props.checked },
				)} onClick={onClick}>
					<span />
					<label />
				</span>
				<span onClick={onClick}>{this.props.label}</span>
			</div>
    )
  }
}
