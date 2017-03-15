class Navigation {
	constructor() {
		this.obj = {
			el: '.js-navigation',
			step: '.js-navigation-step',
			openMore: '.js-open-navigation-more',
			more: '.js-navigation-more'
		};

		this.el = $('.js-navigation');
		this.step = $('.js-navigation-step');
		this.stepText = this.step.find('span');
		this.stepTextRoot = this.stepText.data('root-title');

		this.lastOpened = [];

		this.openMore = $('.js-open-navigation-more');

		this.openMore.on('click', this._openMore.bind(this));
		this.step.on('click', this._goBack.bind(this));

	}

	_openMore(e) {
		let target = $(e.target);
		let title = target.text();
		let toOpen = target.siblings(this.obj.more);

		this._pushStep(toOpen, title);
		this._updateStepText();

		toOpen.addClass('is-active');

		e.preventDefault();
	}

	_goBack() {

		let {item, title} = this.lastOpened.pop();

		this._updateStepText();

		item.removeClass('is-active');

	}

	_pushStep(item, title) {
		this.lastOpened.push({item, title });
	}

	_updateStepText() {

		let text;

		if(this.lastOpened.length == 1 ) {

			text = this.stepTextRoot;
			this.step.is(':hidden') && this.step.fadeIn();

		} else if(!this.lastOpened.length) {
			this.step.fadeOut();

			return false;

		} else {

			text = this.lastOpened[this.lastOpened.length-2].title;

		}

		this.stepText.text(text);


	}

 }
 new Navigation();