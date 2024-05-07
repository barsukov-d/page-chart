const swiperRadio = new Swiper('.swiper', {
	// Optional parameters
	// loop: true,

	slidesPerView: 6, // Set to 'auto'
	// watchSlidesVisibility: true, // Add this line

	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 2,
			// spaceBetween: 20,
		},
		// when window width is >= 480px
		480: {
			slidesPerView: 3,
			// spaceBetween: 30,
		},
		// when window width is >= 640px
		640: {
			slidesPerView: 6,
			// spaceBetween: 40,
		},
	},
})

let activeIndex = 0

swiperRadio.on('click', function (swiper) {
	swiperRadio.slideTo(swiper.clickedIndex)
})

document.querySelectorAll('.value').forEach((element) => {
	const value = element.getAttribute('data-value')
	element.style.width = `${value}%`
})
