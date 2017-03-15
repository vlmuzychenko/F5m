export default class Popup {
	constructor(opt) {
		this.options = opt;


		this.popup = $(opt.popup);
		this.popupIn = $(opt.popupIn);
		this.popupClose = $(opt.popupClose);
		this.popupOpen = $(opt.popupOpen);

		this.afterOpen = opt.afterOpen;
		this.beforeOpen = opt.beforeOpen;
		this.afterClose = opt.afterClose;

		this.popupOpen.on('click', this.open.bind(this));
		this.popupClose.on('click', this.hide.bind(this));

		if(this.options.hideFromParent) this.popup.on('click', this._hideFromParent.bind(this))
	}

	open(e, dataPopup) {
		let target = $(e.currentTarget) || {};
		let data = dataPopup || target.data('open') ;
		let popup = this.popup.filter(`[data-popup="${data}"]`);


		if($('.popup').hasClass('is-open')) {

			let zIndexList = [].map.call($('.popup.is-open'), (item) => +getComputedStyle(item).zIndex);
			let zIndex = Math.max(zIndexList);

			popup.css( "zIndex", zIndex + 1);

		}

		if(this.beforeOpen && isFunction(this.beforeOpen)) this.beforeOpen(this.popup, e);

		popup.fadeIn('fast');
		popup.addClass('is-open');

		this._scrollTop = $(window).scrollTop();
		$('body')
			.css('top', -this._scrollTop)
			.addClass('popup-open');


		//callback
		function isFunction(functionToCheck) {
			let getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}


		if(this.afterOpen && isFunction(this.afterOpen)) this.afterOpen(this.popup);

		e.preventDefault();
	}

	hide(e, dataPopup) {
		let target = $(e.currentTarget) || {};
		let data = dataPopup || target.data('open') ;
		let popup =
			dataPopup
				? this.popup.filter(`[data-popup="${data}"]`)
				: target.closest(this.options.popup);

		$('body')
			.removeAttr('style')
			.removeClass('popup-open')
			.scrollTop(this._scrollTop);


		popup.fadeOut('fast');
		popup.removeClass('is-open');

		function isFunction(functionToCheck) {
			let getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}

		if(this.afterClose && isFunction(this.afterClose)) this.afterClose(this.popup);


		e.preventDefault();
	}

	_hideFromParent(e) {

		if(!$(e.target).closest(this.options.popupIn).length) {
			this.hide(e);
		}
	}

}



