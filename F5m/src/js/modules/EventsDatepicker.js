class Datepicker {
	constructor() {
		this.config = {
			el: '.js-datepicker',
			moveBtn: '.js-datepicker-btn',
			openBtn: '.js-open-datepicker',
			yearInput: '.js-datepicker-year',
			monthInput: '.js-datepicker-month',
			selectText: '.js-datepicker-text',
			dropdown: '.js-datepicker-dropdown'
		};

		this.openBtn = $(this.config.openBtn);
		this.el = $(this.config.el);
		this.inputs = this.el.find('input');

		this.selectText = $(this.config.selectText);
		this.initialText = this.selectText.text().split(' ');
		this.moveBtn = $(this.config.moveBtn);

		this.text = {
			month: this.initialText[0],
			year: this.initialText[1]
		};

		this.openBtn.on('click', this._toggleOpen.bind(this));
		this.inputs.on('change', this._handleChange.bind(this));
		this.moveBtn.on('click', this._move.bind(this));
	}

	_toggleOpen(e) {
		const {el, dropdown} = this.config;

		let target = $(e.target);
		let parent = target.parents(el);
		let dropDown = parent.find(dropdown);

		dropDown.toggleClass('is-open');

		e.preventDefault()

	}

	_handleChange(e) {
		const {el, dropdown} = this.config;

		let target = $(e.target);
		let parent = target.parents(el);
		let dropDown = parent.find(dropdown);
		let type = target.data('type');
		let val = target.data('val');

		this.text[type] = val;

		this._updateText();

		if (type == 'month') {
			dropDown.removeClass('is-open')
		}
	}

	_updateText() {
		const {month, year} = this.text;
		let text = `${month} ${year}`;

		this.selectText.text(text);
	}

	_move(e) {
		const {el, dropdown, monthInput, yearInput} = this.config;
		let target = $(e.currentTarget);
		let direction = target.data('direction');
		let parent = target.parents(el);

		const IS_LEAF_TO_NEXT_MONTH = (direction == 'next');

		//year data
		let yearInputs = parent.find(yearInput).find('input');
		let currentYearIndex = [].findIndex.call(yearInputs.toArray(), (item, i, array) => {
			return item.checked
		});

		let nextYearIndex = IS_LEAF_TO_NEXT_MONTH
			? currentYearIndex + 1
			: currentYearIndex - 1;

		let nextYear = $(yearInputs[nextYearIndex]);

		//month data
		let monthInputs = parent.find(monthInput).find('input');
		let currentMonthIndex = [].findIndex.call(monthInputs.toArray(), (item, i, array) => {
			return item.checked
		});

		let nextMonthIndex = IS_LEAF_TO_NEXT_MONTH
			? currentMonthIndex + 1
			: currentMonthIndex - 1;

		let nextMonth = $(monthInputs[nextMonthIndex]);

		//if it last or very first - do nothing
		if((nextMonthIndex > monthInputs.length-1 && nextYearIndex > yearInputs.length-1)
			|| (nextMonthIndex < 0 && nextYearIndex < 0)) return;

		const FIRST_MONTH = 0;
		const LAST_MONTH = monthInputs.length-1;

		let shouldLeaf = IS_LEAF_TO_NEXT_MONTH
			? currentMonthIndex == monthInputs.length-1 && currentYearIndex != yearInputs.length-1
			: currentMonthIndex == 0 && currentYearIndex != 0;

		if(shouldLeaf) {

			nextYear.prop("checked", true);

			let valYear = nextYear.data('val');

			this.text.year = valYear;

			let newMonthIndex = IS_LEAF_TO_NEXT_MONTH ? FIRST_MONTH : LAST_MONTH;

			nextMonth = $(monthInputs[newMonthIndex]);

		}

		nextMonth.prop("checked", true);

		let valMonth = nextMonth.data('val');

		this.text.month = valMonth;

		this._updateText();

	}

}

new	Datepicker();
