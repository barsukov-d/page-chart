document.addEventListener('DOMContentLoaded', function () {
	const dataChartL = [50, 0, 20, 25, 5, 5, 5, 5, 20, 20, 30, 15]

	const colorsMan = ['#d90000', '#ff0000', '#ff4f4f', '#ff8484', '#ffb4b4', '#fff0f0', '#e3e3e3', '#a4a4a4', '#a4a4a4', '#7f7f7f', '#5a5a5a', '#393939']

	const chartOptions = (selector, dataChart, color) => ({
		series: dataChart,
		chart: {
			type: 'donut',

			height: '340px',
			// width: '100%',

			redrawOnWindowResize: false,
		},
		tooltip: {
			enabled: false,
		},
		legend: {
			show: false,
		},
		colors: color,
		plotOptions: {
			pie: {
				donut: {
					size: '45%',
				},
			},
		},
	})

	const chartLeft = new ApexCharts(document.querySelector('#chart-left'), chartOptions('#chart-left', dataChartL, colorsMan))
	chartLeft.render()

	const leftWrapper = document.querySelector('.chart-wrapper__left')
	const rightWrapper = document.querySelector('.chart-wrapper__right')
	const slices = document.querySelectorAll('#chart-left .apexcharts-series')
	const slicesArray = Array.from(slices)

	const slicesRight = slicesArray.slice(0, 6)
	const slicesLeft = slicesArray.slice(6, 12)

	const labels = document.querySelectorAll('#chart-left .apexcharts-datalabels')
	const labelsArray = Array.from(labels)

	const labelsRightLength = dataChartL.slice(0, 6).filter((item, index) => index < 6 && item > 5).length
	const labelsLeftLength = dataChartL.slice(6, 12).filter((item, index) => index < 6 && item > 5).length
	console.log(labelsRightLength, 'labelsRightLength')

	const labelsRight = labelsArray.slice(0, labelsRightLength)
	const labelsLeft = labelsArray.slice(labelsRightLength, labelsRightLength + labelsLeftLength)
	const manLegend = document.querySelector('.radio-grid-chart-legend.man')
	const womanLegend = document.querySelector('.radio-grid-chart-legend.woman')

	labelsRight.forEach((label) => {
		const percentage = parseFloat(label.firstElementChild.textContent) * 2
		console.log(label.firstElementChild.textContent, 'label.firstElementChild.textContent')

		label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	})

	labelsLeft.forEach((label) => {
		const percentage = parseFloat(label.firstElementChild.textContent) * 2

		label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	})

	const addClass = (elements, className) => elements.forEach((element) => element.classList.add(className))
	const removeClass = (elements, className) => elements.forEach((element) => element.classList.remove(className))

	let isTouch = false

	const handleMouseOver = (elements, className) => () => !isTouch && addClass(elements, className)
	const handleMouseOut = (elements, className) => () => !isTouch && removeClass(elements, className)
	const handleTouchStart = (elements, className) => () => {
		isTouch = true
		addClass(elements, className)
	}
	const handleTouchEnd = (elements, className) => () => {
		isTouch = false
		removeClass(elements, className)
	}

	// Hide labelsLeft and labelsRight
	labelsLeft.forEach((label) => (label.style.display = 'none'))
	labelsRight.forEach((label) => (label.style.display = 'none'))

	// Show labelsLeft when mouse is over leftWrapper
	leftWrapper.addEventListener('mouseover', () => {
		labelsLeft.forEach((label) => (label.style.display = 'block'))
		manLegend.style.opacity = 1
	})

	// Hide labelsLeft when mouse is out of leftWrapper
	leftWrapper.addEventListener('mouseout', () => {
		labelsLeft.forEach((label) => (label.style.display = 'none'))
		manLegend.style.opacity = 0
	})

	// Show labelsRight when mouse is over rightWrapper
	rightWrapper.addEventListener('mouseover', () => {
		labelsRight.forEach((label) => (label.style.display = 'block'))
		womanLegend.style.opacity = 1
	})

	// Hide labelsRight when mouse is out of rightWrapper
	rightWrapper.addEventListener('mouseout', () => {
		labelsRight.forEach((label) => (label.style.display = 'none'))
		womanLegend.style.opacity = 0
	})

	leftWrapper.addEventListener('mouseover', handleMouseOver([...slicesLeft, ...labelsLeft], 'shift-left'))
	leftWrapper.addEventListener('mouseout', handleMouseOut([...slicesLeft, ...labelsLeft], 'shift-left'))
	leftWrapper.addEventListener('touchstart', handleTouchStart([...slicesLeft, ...labelsLeft], 'shift-left'))
	leftWrapper.addEventListener('touchend', handleTouchEnd([...slicesLeft, ...labelsLeft], 'shift-left'))

	rightWrapper.addEventListener('mouseover', handleMouseOver([...slicesRight, ...labelsRight], 'shift-right'))
	rightWrapper.addEventListener('mouseout', handleMouseOut([...slicesRight, ...labelsRight], 'shift-right'))
	rightWrapper.addEventListener('touchstart', handleTouchStart([...slicesRight, ...labelsRight], 'shift-right'))
	rightWrapper.addEventListener('touchend', handleTouchEnd([...slicesRight, ...labelsRight], 'shift-right'))
})
