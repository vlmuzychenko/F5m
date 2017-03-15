class Nav {
	constructor(opt) {
		this.options = opt;

		this.el = $(opt.el);
		this.link = this.el.find(opt.link);
		this.list = this.el.find(opt.list);
		this.listLink = this.list.find(opt.listLink);
		this.catalog = $(opt.catalog);
		this.openBtn = $(opt.openBtn);

		this.dataOpen = this.openBtn.data('open');
		this.dataLevel = this.openBtn.data('level');

		this.more = opt.more;
		this.stepBtn = $(opt.step);
		this.stepBtnText = this.stepBtn.find('> span');
		this.stepBtn.history = [];

		this.stepBtn.step = 'home';
		this.stepBtn.stepLevel = 0;

		this.openBtn.on('click', this._openMain.bind(this));
		this.link.on('click', this._openList.bind(this));
		this.listLink.on('click', this._openMore.bind(this));
		this.stepBtn.on('click', this._goToStep.bind(this));

	}

	_openMain(e) {
		let link = this.link.filter(`[data-chapter="${this.dataOpen}"]`);
		let nav = link.parents(this.options.el);
		let lLink = nav.find(this.options.listLink).filter(`[data-more-open="${this.dataLevel}"]`);

		this.catalog.addClass('is-open');

		if(this.dataOpen != '') {
			link.click();
		}

		if(this.dataLevel != '' && this.dataOpen != '') {
			lLink.click();
		}

		return false;
	}

	updateStep(stepName, stepText) {

		this.stepBtn.step = stepName;
		this.stepBtn.history[this.stepBtn.stepLevel] = this.stepBtnText.text();
		this.stepBtnText.text(stepText);

		this.stepBtn.stepLevel++;
	}

	_openList(e) {
		let text = $(e.currentTarget).find('span').text();
		let parent = $(e.target).parents(this.options.el);
		let listLink = parent.find(this.options.listLink);
		let listLinkActive = listLink.filter('.is-active');

		if (parent.hasClass('is-open')) {
			this.hide();

			return false;
		}

		$('.js-filter').removeClass('is-open');

		$(this.options.el).removeClass('is-open');
		parent.addClass('is-open');

		$(this.more).removeClass('is-open');

		if (listLinkActive.length) {
			let data = listLinkActive.data('more-open');
			let toShow = parent.find(this.options.more + `[data-more='${data}']`);
			toShow.addClass('is-open');

		} else {

			listLink.eq(0).addClass('is-active');
			let data = listLink.eq(0).data('more-open');
			let toShow = parent.find(this.options.more + `[data-more='${data}']`);
			toShow.addClass('is-open');

		}

		this.updateStep('chapter', text);

		return false;
	}

	_openMore(e) {
		let target = $(e.target);
		let text = $(e.currentTarget).text();
		let parent = target.parents(this.options.el);
		let link = target.data('more-open');
		let toHide = parent.find(this.options.more);
		let toShow = parent.find(this.options.more + `[data-more='${link}']`);

		if(target.hasClass('is-active')) {
			target.removeClass('is-active');
			toHide.removeClass('is-open');
			this.stepBtn.step = 'home';

			return false;
		}

		parent.find(this.options.listLink).removeClass('is-active');
		target.addClass('is-active');

		toHide.removeClass('is-open');
		toHide.parent().removeClass('is-active');

		toShow.addClass('is-open');
		toShow.parent().addClass('is-active');

		this.updateStep('submenu', text);
		return false;
	}

	_goToStep(e) {

		let upd = (step) => {
			this.stepBtn.stepLevel--;
			this.stepBtn.step = step;
			this.stepBtnText.text(this.stepBtn.history[this.stepBtn.stepLevel]);
		};

		switch(this.stepBtn.step) {
			case 'home':
				this.hide();
				break;

			case 'chapter':
				$(this.options.el).removeClass('is-open');
				upd('home');

				break;

			case 'submenu' :

				$(this.options.more).parent().removeClass('is-active');
				upd('chapter');

				break;

			case 'filters' :

				$('.js-filter').removeClass('is-open');

				if(this.stepBtn.stepLevel == 3) {
					upd('submenu');
				} else if(this.stepBtn.stepLevel == 2) {
					upd('chapter');

				} else if(this.stepBtn.stepLevel == 1) {
					upd('home');
				}

				break;

			default:
				console.error('something went wrong');
		}

	}

	hide() {
		$(this.options.el).removeClass('is-open');
		$(this.options.more).removeClass('is-open');

			$(this.options.listLink).removeClass('is-active');
			$(this.options.more).parent().removeClass('is-active');
			$('.js-catalog-nav').removeClass('is-open');



	}
	isOpen() {
		return this.el.hasClass('is-open') || $('.js-catalog-nav').hasClass('is-open');
	}

}

let nav = new Nav({
	el: '.js-nav',
	link: '.js-nav-open',
	list: '.js-nav-list',
	listLink: '.js-list-link',
	more: '.js-nav-more',
	step: '.js-nav-moves',
	catalog: '.js-catalog-nav',
	openBtn: '.js-open-catalog'
});

$('.js-nav').on('click', function(e) {
	e.stopPropagation();
});

BODY.on('click tap', function(e) {

	if ($(e.target).closest('.js-catalog-nav').length) {
		return;
	}
	if(nav.isOpen()) {
		nav.hide();
	}

});




