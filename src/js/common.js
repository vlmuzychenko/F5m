import Popup from './modules/Popup'
import mousewheel from 'jquery-mousewheel'

import './pluginsInit'
import './modules/Datepicker'
import './modules/Popup'
import './modules/_selects'
import './modules/Navigation'
import './modules/EventsDatepicker'
import './lib/mask'

window.$ = require('jquery');

let popupMap = new Popup({
	popup: '.js-popup-map',
	popupClose: '.js-close-popup-map',
	popupOpen: '.js-open-popup-map',
	afterOpen(popup) {

		if (popup.hasClass('is-init')) return;

		initialize();
		popup.addClass('is-init');
	}
});

let popupVideo = new Popup({
	popup: '.js-popup-video',
	popupIn: '.js-popup-video-in',
	popupClose: '.js-close-popup-video',
	popupOpen: '.js-open-popup-video',
	hideFromParent: true,
	afterClose() {
		ytPlayer.pauseVideo();
	}
});


let popup = new Popup({
	popup: '.js-popup',
	popupIn: '.js-popup-in',
	popupClose: '.js-close-popup',
	popupOpen: '.js-open-popup'
});

var popupMore = new Popup({
        popup: '.js-popup-more',
        popupClose: '.js-close-popup-more',
        popupOpen: '.js-open-popup-more',
        popupIn: '.js-popup-more-in',
        hideFromParent: true,
        beforeOpen: function beforeOpen(popup, e) {
            //var target = $(e.currentTarget);

            var more = $(e.currentTarget);
            var _more$data = more.data('information-for-popup'),
                title = _more$data.title,
                img = _more$data.img,
                text = _more$data.text,
                link = _more$data.link,
                moreBtn = _more$data.more,
                more_mess = _more$data.more_mess,
                actualBtn = _more$data.actual,
                actual_mess = _more$data.actual_mess,
                actual_link = _more$data.actual_link,
                writeBtn = _more$data.write;

            var moreTitle = popup.find('.js-more-title');
            var moreImg = popup.find('.js-more-photo');
            var moreText = popup.find('.js-more-text');
            var moreLink = popup.find('.js-more-link');

            moreTitle.text(title);
            moreText.html(text);
            moreImg.css('background-image', 'url(' + img + ')');
            moreLink.attr('href', link);


            if (moreBtn == 1) {
                $('.js-more-link').text(more_mess);
                $('.js-more-link').css('display', 'block');
            } else {
                $('.js-more-link').css('display', 'none');
            }
            if (actualBtn == 1) {
                $('.actual_items').text(actual_mess);
                $('.actual_items').attr('href', actual_link);
                $('.actual_items').css('display', 'block');
            } else {
                $('.actual_items').css('display', 'none');
            }
            if (writeBtn == 1) {
                $('.js-open-popup').css('display', 'block');
            } else {
                $('.js-open-popup').css('display', 'none');
            }

        }
    });

/*let popupMore = new Popup({
    popup: '.js-popup-more',
    popupClose: '.js-close-popup-more',
    popupOpen: '.js-open-popup-more',
    popupIn: '.js-popup-more-in',
    hideFromParent: true,
    beforeOpen(popup,e) {
        let target = $(e.currentTarget);

        let more = target.data('information-for-popup');
        const {
            title,
            img,
            text,
            link,
            moreBtn,
            more_mess,
            actualBtn,
            actual_mess,
            actual_link,
            writeBtn
        } = more;

        let moreTitle = popup.find('.js-more-title');
        let moreImg = popup.find('.js-more-photo');
        let moreText = popup.find('.js-more-text');
        let moreLink = popup.find('.js-more-link');

        moreTitle.text(title);
        moreText.html(text);
        moreImg.css('background-image', `url(${img})`);
        moreLink.attr('href', link);

        if(moreBtn == 1){
            $('.js-more-link').text(more_mess);
            $('.js-more-link').css('display','block');
        }else{
            $('.js-more-link').css('display','none');
        }
        if(actualBtn == 1){
            $('.actual_items').text(actual_mess);
            $('.actual_items').attr('href',actual_link);
            $('.actual_items').css('display','block');
        }else{
            $('.actual_items').css('display','none');
        }
        if(writeBtn == 1){
            $('.js-open-popup').css('display','block');
        }else{
            $('.js-open-popup').css('display','none');
        }

    }
});*/




(function() {
	let chapter = $('.js-chapter');
	let chapters = $('.js-chapters');
	let openChapter = $('.js-open-chapter');
	let closeChapter = $('.js-close-chapter');
	let chapterInner = $('.js-chapter-inner');

	let body = document.querySelector('body');
	let html = document.querySelector('html');

	openChapter.on('click', function(e) {
		let target = $(this);
		let data = target.data('open');
		let toShow = chapter.filter(`[data-chapter="${data}"]`);

		toShow.addClass('is-open');
		closeChapter.addClass('is-active');
		target.addClass('is-active');

		chapters.addClass('is-active');

		// console.log(window.height);
		updateTransform();

		e.preventDefault();
	});

	$(window).on('orientationchange', function() {
		// setTimeout(updateTransform, 300)
		closeChapter.click();
		setTimeout(function() {
			openChapter.click()

		}, 300)

	});



	function updateTransform() {
		let docHeight = getDocumentHeight();
		let winHeight = window.innerHeight;
		let division = docHeight - (docHeight - winHeight);

		if (chapters.hasClass('is-active')) {
			// setTimeout(function() {
				chapterInner.css({
					transform: `translate3d(0,-${division - chapterInner.height() - 60}px,0)`
				});
				if( (docHeight - winHeight) > 20) {
					console.log(chapterInner.parent().position().top);
					$('.chapters__items').css({
						transform: `translate3d(0,-${chapterInner.parent().position().top - (division - chapterInner.height() - 60)}px,0)`,
						position: 'relative',
						zIndex: 999
					});

					chapters.addClass('is-fixed');


				}
				console.log(chapterInner.offset().top);



		}

	}

	function getDocumentHeight() {
		return Math.max( body.scrollHeight, body.offsetHeight,
			html.clientHeight, html.scrollHeight, html.offsetHeight );
	}

	closeChapter.on('click', function(e) {
		chapterInner.css({
			transform: `translate3d(0,0,0)`
		});
		$(this).removeClass('is-active');
		chapters.removeClass('is-fixed');

		chapter
			.filter('.is-open')
			.removeClass('is-open');

		openChapter
			.filter('.is-active')
			.removeClass('is-active');

		chapters.removeClass('is-active');
		$('.chapters__items').attr('style', '');

		e.preventDefault();
	});

})();

(function() {
	/*let typeBtn = $('.js-type');
	let items = $('.js-item');

	typeBtn.on('click', function(e) {
		e.preventDefault();

		let target = $(this);
		let type = target.data('type');
		if(target.hasClass('is-active')) return null;

		typeBtn.removeClass('is-active');
		target.addClass('is-active');

		type == 'list'
			? items.addClass('item_list')
			: items.removeClass('item_list');

	});*/
})();

$(document).on('click', '.js-type', function(e){
	e.preventDefault();

	let typeBtn = $('.js-type');
	let items = $('.js-item');

	let target = $(this);
	let type = target.data('type');
	if(target.hasClass('is-active')) return null;

	typeBtn.removeClass('is-active');
	target.addClass('is-active');

	type == 'list'
		? items.addClass('item_list')
		: items.removeClass('item_list');
});

(function() {
	let moreBtn = $('.js-show-more');

	moreBtn.on('click', function(e) {
		e.preventDefault();

		let target = $(this);
		let targetText = target.find('span');
		let parent = target.parents('.js-more');
		let body = parent.find('.js-more-body');

		let text = targetText.text();
		let dataText = target.data('text');

		target.data('text', text);
		targetText.text(dataText);


		parent.toggleClass('is-open');
		body.slideToggle('300');

	});
})();

(function() {
	let openMenuBtn = $('.js-toggle-menu');
	let closeMenuBtn = $('.js-close-menu');
	let menu = $('.js-menu');

	openMenuBtn.on('click', function(e) {

		menu.fadeToggle();

		$(this).toggleClass('is-active');

		e.preventDefault();
	});

	closeMenuBtn.on('click', function(e) {

		menu.fadeOut();

		e.preventDefault();
	});

})();
(function() {
	$('.navigation__list  .navigation__list').mousewheel(function(e) {

		var event = e.originalEvent,
			d = event.wheelDelta || -event.detail;

		this.scrollTop += ( d < 0 ? 1 : -1 ) * 30;
		e.preventDefault();
	});


	/*$('.js-select-multiple').each(function () {
		 $(this).multipleSelect({
				width: '100%',
				placeholder: $(this).attr('placeholder'),
				countSelected: ' # из % выбрано',
				selectAll: false,
				allSelected: 'Все выбрано'
		 });
	});*/

	$('.js-select-multiple').each(function () {
			 var options = {
					 width: '100%',
					 placeholder: $(this).attr('placeholder'),
					 countSelected: ' # выбрано',
					 selectAll: false,
					 allSelected: 'Все выбрано'
			 };
			 if ($(this).attr('id') == 'regions') {
					 options['onClick'] = function (view) {
							if(view.value == 'all_regions'){
									if(view.checked){
											$('#regions').multipleSelect("checkAll");
									}else{
											$('#regions').multipleSelect("uncheckAll");
									}
							}
							 $("#countries").multipleSelect("uncheckAll");
							 $("#cities").multipleSelect("uncheckAll");
					 };
					 options['onClose'] = function () {
							 $("#countries").multipleSelect("uncheckAll");
							 $("#cities").multipleSelect("uncheckAll");
							 handleRegions();
					 };
			 }else if($(this).attr('id') == 'countries'){
					 options['onClick'] = function (view) {
							 if(view.value == 'all_countries'){
									 if(view.checked){
											 $('#countries').multipleSelect("checkAll");
									 }else{
											 $('#countries').multipleSelect("uncheckAll");
									 }
							 }
							 $("#cities").multipleSelect("uncheckAll");
					 };
					 options['onClose'] = function(){
							 $("#cities").multipleSelect("uncheckAll");
							 handleCountries();
					 }
			 }else if($(this).attr('id') == 'cities'){
					 options['onClick'] = function (view) {
							 if(view.value == 'all_cities'){
									 if(view.checked){
											 $('#cities').multipleSelect("checkAll");
									 }else{
											 $('#cities').multipleSelect("uncheckAll");
									 }
							 }
					 };
			 }

			 $(this).multipleSelect(options);
	 });

	$('.js-select-single').each(function () {
		 $(this).multipleSelect({
				width: '100%',
				placeholder: $(this).attr('placeholder'),
				single: true
		 });
	});

})();
