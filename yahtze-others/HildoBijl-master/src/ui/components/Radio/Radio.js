import './Radio.css'

import React, { Component } from 'react'

export default class Radio extends Component {
	componentDidMount() {
		this.update()
	}
	componentDidUpdate() {
		this.update()
	}
	update() {
		this.setItemTo(this.props.value)
	}
	setItemTo(value) {
		// Define style settings.
		const buttonMargin = 5;
	
		// Extract the button and the options.
		const containers = Array.from(this.field.children)
		const buttonContainer = containers.find(obj => obj.className.indexOf('radioButton') !== -1)
		const optionContainer = containers.find(obj => obj.className.indexOf('radioOptions') !== -1)
		const button = buttonContainer.children[0]
		const option = optionContainer.children[value]
		
		// Through the bounding rectangles, calculate the position of the button.
		const buttonContainerRect = buttonContainer.getBoundingClientRect()
		const optionRect = option.getBoundingClientRect()
		button.style.top = (optionRect.top - buttonContainerRect.top + buttonMargin) + 'px'
		button.style.height = (optionRect.height - 2*buttonMargin) + 'px'
		button.style.display = 'block';
	}
	getOption(evt) {
		// Extract the relevant DOM fields. 
		const containers = Array.from(this.field.children)
		const optionContainer = containers.find(obj => obj.className.indexOf('radioOptions') !== -1)
		const options = Array.from(optionContainer.children)
	
		// Find the option whose y-coordinate-range contains the click.
		return options.findIndex(option => {
			const optionRect = option.getBoundingClientRect()
			return evt.clientY >= optionRect.top && evt.clientY <= optionRect.bottom
		})
	}
  render() {
    return (
			<div className="radioField" ref={field => this.field = field}>
				<div className="radioButton" onClick={(evt) => this.props.changeFunction(this.getOption(evt))}>
					<label />
				</div>
				<div className="radioOptions">
					{this.props.options.map((option, i) => <span key={i} onClick={() => this.props.changeFunction(i)}>{option}</span>)}
				</div>
			</div>
    )
  }
}
