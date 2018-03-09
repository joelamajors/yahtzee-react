import './ScorePlot.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { select } from 'd3-selection'
import { histogram, min, max } from 'd3-array'
import { scaleLinear } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import tip from 'd3-tip'

import statisticsActions from '../../../redux/statistics.js'

const defaultBounds = [150, 300] // These are the default bounds of the horizontal axis of the statistics plot.
const binSizeIndex = 2000 // If you want larger bins in the statistics plot, increase this number.
const plotWidth = 400 // The width (within the SVG coordinate set) of the plot.
const plotHeight = 300 // The height of the plot.
const plotMargin = {top: 5, right: 10, bottom: 20, left: 20} // The margins we use on each side of the SVG plot. Note that on the left and bottom is an axis.

class ScorePlot extends Component {
	// Lifecycle functions.
	componentDidMount() {
		this.initializePlot()
		this.updatePlot()
	}
	componentDidUpdate(prevProps) {
		this.updatePlot()
	}

	// Plot management functions.
	initializePlot() {
		// Set up all containers.
		this.svgContainer = select('#scorePlot')
			.append('g')
		this.barContainer = this.svgContainer.append('g')
		this.xAxisContainer = this.svgContainer.append('g')
			.attr('transform', `translate(0,${plotHeight - plotMargin.bottom})`)
		this.yAxisContainer = this.svgContainer.append('g')
			.attr('transform', `translate(${plotMargin.left},0)`)

		// Initialize tooltips.
		this.tip = tip()
			.attr('class', 'd3-tip')
			.direction('n')
			.offset([-14, 0])
			.html(games => {
				const title = `${games.length}  games`
				const subtitle = (games.x1 - games.x0 === 1 ?
					`with scores of ${games.x0}` :
					`with scores between ${games.x0} and ${games.x1 - 1}`)
				return `
					<div class="scorePlotTip">
						<span class="games">${title}</span>
						<span class="scores">${subtitle}</span>
					</div>`
				})
		this.svgContainer.call(this.tip)
		window.t = this.tip
	}
	updatePlot() {
		// Calculate the bin size.
		const scoreBounds = this.getScoreBounds()
		const binSize = this.getBinSize(scoreBounds)
		const numBins = (scoreBounds[1] - scoreBounds[0]) / binSize
		const binStarts = [...Array(numBins)].map((_,i) => scoreBounds[0] + i*binSize)

		// Through D3, set up the Histogram.
		const histGenerator = histogram()
			.value(game => game.score)
			.domain(scoreBounds)
			.thresholds(numBins - 1)
		this.hist = histGenerator(this.props.statistics.games)
		const largestBin = max(this.hist.map(bin => bin.length))

		// Set up the scales.
		const xScale = scaleLinear().domain(scoreBounds).range([plotMargin.left, plotWidth - plotMargin.right])
		const yScale = scaleLinear().domain([0, largestBin]).range([plotHeight - plotMargin.bottom, plotMargin.top])
		const xAxis = axisBottom(xScale)
		const yAxis = axisLeft(yScale)

		// Apply the histogram to the graph, first adding new ones, updating existing ones and removing old ones.
		const rects = this.barContainer
			.selectAll('rect')
			.data(this.hist)
		rects.enter() // New rectangles.
			.append('rect')
			.on('mouseover', this.tip.show) // Add a tool tip.
			.on('mouseout', this.tip.hide)
			.on('click', (bin) => this.props.setStatisticsBounds([bin.x0, bin.x1]))
		.merge(rects) // New and existing rectangles.
			.attr("width", (bin,i) => xScale(binStarts[i] + binSize) - xScale(binStarts[i]))
			.attr("x", (bin,i) => xScale(binStarts[i]))
			.attr("height", bin => yScale(0) - yScale(bin.length))
			.attr("y", bin => yScale(bin.length))
		rects.exit() // Outdated rectangles.
			.remove()

		// Apply the axes.
		this.xAxisContainer.call(xAxis)
		this.yAxisContainer.call(yAxis)
	}

	// Calculation functions for the plot.
	getScoreBounds() {
		// If we don't have any games yet, we return the default bounds.
		const stat = this.props.statistics
		if (stat.games.length === 0)
			return defaultBounds

		// Calculate the bounds, based on the game scores. Then widen them to multiples of 20.
		const scores = stat.games.map(game => game.score)
		const scoreBounds = [Math.min(min(scores), defaultBounds[0]), Math.max(max(scores), defaultBounds[1])]
		scoreBounds[0] = scoreBounds[0] - scoreBounds[0] % 20
		scoreBounds[1] = scoreBounds[1] + ((-scoreBounds[1] % 20) + 20) % 20
		return scoreBounds
	}
	getBinSize(scoreBounds) {
		const desiredBinSize = binSizeIndex / (scoreBounds[1] - scoreBounds[0])
		const options = [25, 10, 5, 2, 1]
		const binSize = options.find(binSize => (desiredBinSize >= binSize))
		if (binSize)
			return binSize
		return options[options.length - 1]
	}

	render() {
		return (
			<svg id="scorePlot" viewBox={`0 0 ${plotWidth} ${plotHeight}`} />
		)
	}
}

export default connect(
  function mapStateToProps(state) {
    return {
      statistics: state.statistics,
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      setStatisticsBounds: (bounds) => dispatch(statisticsActions.setStatisticsBounds(bounds)),
    }
  }
)(ScorePlot)
