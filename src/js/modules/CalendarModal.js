export default class CalendarModal {
	constructor(config) {
		this.el = $(config.modal);
		this.btnClose = $(config.closeEl);
		this.beforeOpen = config.beforeOpen;

		this.btnClose.on('click', this.hide.bind(this));
	}

	show(e) {

		function isFunction(functionToCheck) {
			let getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}

		if(this.beforeOpen && isFunction(this.beforeOpen)) this.beforeOpen(e, this.el);

		this.el.fadeIn();
	}

	hide() {

		this.el.fadeOut();
	}

}
