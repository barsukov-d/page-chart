document.addEventListener('DOMContentLoaded', function () {
	console.log('DOM loaded with JavaScript')
	const colorGray = '#393939'
	const colorRed = '#D90000'

	// function dataAuditory(dataMan, dataWoman) {
	// 	const dataChartL = dataMan.map((value) => value / 2) // делим все элементы на 2

	// 	const sumL = dataChartL.reduce((a, b) => a + b, 0) // суммируем все элементы
	// 	const newElementL = 100 - sumL // вычисляем новый элемент

	// 	dataChartL.unshift(newElementL) // добавляем новый элемент в начало массива

	// 	const dataChartR = dataWoman.map((value) => value / 2) // делим все элементы на 2

	// 	const sumR = dataChartR.reduce((a, b) => a + b, 0) // суммируем все элементы
	// 	const newElementR = 100 - sumR // вычисляем новый элемент

	// 	dataChartR.push(newElementR) // добавляем новый элемент в конец массива

	// 	return [dataChartL, dataChartR]
	// }

	// const dataMan = [20, 20, 20, 20, 10, 10]
	// const dataWoman = [10, 10, 20, 20, 20, 20]

	// const percentMan = 60
	// const percentWoman = 40

	// const [dataChartL, dataChartR] = dataAuditory(dataMan, dataWoman)
	const dataChartL = [10, 10, 20, 20, 20, 20, 10, 10, 20, 20, 20, 20]
	// const dataChartR = [2, 8, 10, 10, 10, 20, 40]

	function generateColors(count, baseColor) {
		const match = baseColor.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
		let r = parseInt(match[1], 16)
		let g = parseInt(match[2], 16)
		let b = parseInt(match[3], 16)

		let colors = []
		for (let i = 0; i < count; i++) {
			let newR = Math.min(r + i * 10, 255)
			let newG = Math.min(g + i * 10, 255)
			let newB = Math.min(b + i * 10, 255)

			let color = '#' + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)
			colors.push(color)
		}

		return colors
	}

	const colorsMan = ['#d90000', '#ff0000', '#ff4f4f', '#ff8484', '#ffb4b4', '#fff0f0', '#393939', '#5a5a5a', '#7f7f7f', '#a4a4a4', '#a4a4a4', '#e3e3e3']
	const colorsWoman = []

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
					size: '55%',
				},
			},
		},
	})

	// const chartRight = new ApexCharts(document.querySelector('#chart-right'), chartOptions('#chart-right', dataChartR, colorsWoman))
	// chartRight.render()

	const chartLeft = new ApexCharts(document.querySelector('#chart-left'), chartOptions('#chart-left', dataChartL, colorsMan))
	chartLeft.render()

	const leftWrapper = document.querySelector('.chart-wrapper__left')
	const rightWrapper = document.querySelector('.chart-wrapper__right')
	// const slicesRight = document.querySelectorAll('#chart-right .apexcharts-series')
	const slices = document.querySelectorAll('#chart-left .apexcharts-series')
	const slicesArray = Array.from(slices)
	const slicesRight = slicesArray.slice(0, 6)
	const slicesLeft = slicesArray.slice(6, 12)

	const labels = document.querySelectorAll('#chart-left .apexcharts-datalabels')
	const labelsArray = Array.from(labels)

	const labelsRight = labelsArray.slice(0, 6)
	const labelsLeft = labelsArray.slice(6, 12)
	const manLegend = document.querySelector('.radio-grid-chart-legend.man')
	const womanLegend = document.querySelector('.radio-grid-chart-legend.woman')

	// const removeElement = (elements, index) => elements[index].remove()
	// removeElement(slicesRight, slicesRight.length - 1)
	// removeElement(slicesLeft, 0)
	// removeElement(labelsRight, labelsRight.length - 1)
	// removeElement(labelsLeft, 0)

	console.log(labelsLeft[0], 'labelsLeft')

	labelsRight.forEach((label) => {
		const percentage = parseFloat(label.firstElementChild.textContent) * 2

		label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	})

	labelsLeft.forEach((label) => {
		const percentage = parseFloat(label.firstElementChild.textContent) * 2

		label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	})

	// labelsRight.forEach((label, index) => {
	// 	const percentage = dataWoman[index]

	// 	if (percentage !== undefined) {
	// 		label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	// 	}
	// })

	// Array.from(labelsLeft)
	// 	.slice(1)
	// 	.forEach((label, index) => {
	// 		const percentage = dataMan[index] // добавляем 1 к индексу, так как мы пропустили первый элемент

	// 		if (percentage !== undefined) {
	// 			label.firstElementChild.textContent = percentage.toFixed(1) + '%'
	// 		}

	// 		console.log(label.firstElementChild.textContent, 'label.firstElementChild.textContent')
	// 	})

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
