import slick from 'slick-carousel';
import Swiper from 'swiper';
import {slider} from 'jquery-ui-bundle'
import 'jquery-ui-touch-punch'

let searchNavLine = $('.js-nav-line');

setTimeout(function(){
	let searchNav = new Swiper ('.js-nav', {
		centeredSlides: true,
		slidesPerView: 'auto',
		slideToClickedSlide: true,
		onSlideChangeStart: function(swiper) {
			let width = $(swiper.container).find('.swiper-slide-active').width();
			searchNavLine.css('width', width * 1.1 + 'px');
		}
	});
	let searchContent = new Swiper ('.js-content', {
		slidesPerView: 1,
		autoHeight: true
	});

	searchNav.params.control = searchContent;
	searchContent.params.control = searchNav;

	let cardNavi = new Swiper('.js-images', {
		slidesPerView: 1,
		pagination: '.swiper-pagination'
	})

}, 300);

(function() {

	$('.js-slider-main').each((i, slider) => {

		let $slider = $(slider);
		let parent = $slider.parents('.js-slider');
		let input = parent.find('.js-slider-input');
		let max = +input.data('max');
		let min = +input.data('min');
		let value = +input.val();

		let form = $slider.parents('form');

		$slider.slider({
			range: 'min',
			max,
			min,
			value,
			slide( event, ui ) {
				input.val(ui.value);
			}
		});

		input.on('change', handleChange);
		form.on('reset', handleChange);

		function handleChange() {

			setTimeout(function(){
				let val = +input.val();

				if (val > max) {
					val = max;
					$(this).val(val);
				} else if (val < min || val == '') {
					val = min;
					$(this).val(val);
				}

				$slider.slider('value', val);
			});

		}

	});

})();

(function () {

	$('.js-range-slider-main').each((i, range) => {
		let $range 	= $(range);
		let parent = $range.parents('.js-range-slider');
		let minInput = parent.find('.js-range-slider-from');
		let maxInput = parent.find('.js-range-slider-to');
		let from 	= +minInput.val();
		let to 		= +maxInput.val();
		let min 	= +minInput.data('min');
		let max 	= +maxInput.data('max');

		let form 	= $range.parents('form');

		$range.slider({
			range: true,
			min,
			max,
			values: [from, to],
			slide(event, ui) {
				minInput.val(ui.values[ 0 ]);
				maxInput.val(ui.values[ 1 ]);
			}
		});

		minInput.on('change', handleChangeMin);

		maxInput.on('change', handleChangeMax);

		form.on('reset', function() {
			setTimeout(function() {
				handleChangeMax();
				handleChangeMin();
			})
		});

		function handleChangeMin() {
			let val = +minInput.val();
			let to = maxInput.val();

			if (val > to) {
				val = to;
				$(this).val(val);
			} else if (val < min || val == '') {
				val = min;
				$(this).val(val);
			}

			$range.slider('values', 0, val);
		}

		function handleChangeMax() {
			let val = +maxInput.val();
			let from = minInput.val();

			if (val < from) {
				val = from;
				$(this).val(val);
			} else if (val > max || val == '') {
				val = max;
				$(this).val(val);
			}

			$range.slider('values', 1, val);
		}
	});

})();
