import React from 'react'

export default {
	getField,
	setItemTo,
	getOption
}

function getField(options, value, changeFunction, saveFunction) {
	return (
		<div className="radioField" ref={saveFunction}>
			<div className="radioButton" onClick={(evt) => changeFunction(getOption(evt))}>
				<label />
			</div>
			<div className="radioOptions">
				{options.map((option, i) => <span key={i} onClick={() => changeFunction(i)}>{option}</span>)}
			</div>
		</div>
	)
}

function setItemTo(radioField, value) {
	// Define style settings.
	const buttonMargin = 5;

	// Extract the button and the options.
	const containers = Array.from(radioField.children)
	const buttonContainer = containers.find(obj => obj.className.indexOf('radioButton') !== -1)
	const optionContainer = containers.find(obj => obj.className.indexOf('radioOptions') !== -1)
	const button = buttonContainer.children[0]
	const option = optionContainer.children[value]
	
	// Through the bounding rectangles, calculate the position of the button.
	const buttonContainerRect = buttonContainer.getBoundingClientRect()
	const optionRect = option.getBoundingClientRect()
	window.b = button
	button.style.top = (optionRect.top - buttonContainerRect.top + buttonMargin) + 'px'
	button.style.height = (optionRect.height - 2*buttonMargin) + 'px'
	button.style.display = 'block';
}

function getOption(evt) {
	// Extract the radio field, being the outer container of everything.
	let button = evt.target
	if (button.className.indexOf('radioButton') === -1)
		button = button.parentElement
	const radioField = button.parentElement

	// Extract the other DOM fields. 
	const containers = Array.from(radioField.children)
	const optionContainer = containers.find(obj => obj.className.indexOf('radioOptions') !== -1)
	const options = Array.from(optionContainer.children)

	// Find the option whose y-coordinate-range contains the click.
	return options.findIndex(option => {
		const optionRect = option.getBoundingClientRect()
		return evt.clientY >= optionRect.top && evt.clientY <= optionRect.bottom
	})
}