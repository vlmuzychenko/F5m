
(function() {

	const classes = {
		wrapper: 'custom-select',
		visible: 'custom-select__visible',
		text: 'custom-select__text',
		icon: 'custom-select__icon',
		dropdown: 'custom-select__dropdown',
		list: 'custom-select__list',

		//states
		placeholder: 'is-placeholder',
		selected: 'is-selected',
		open: 'is-open'
	};

	class Select {

		constructor(config) {

			this._select = config.select;
			this._options = this._select.find('option');
			this._values = [];
			this._text = [];

			this._createDOM(config);
			this._addEvents(config);
		}

		//EVENTS
		_addEvents(config) {
			this._openOnClick(config);
			this._closeOnBody();
			this._changeOnClick();
			this._changeValue();
		}

		_openOnClick(config) {
			this._visible.click(() => {
				if (this._wrapper.hasClass(classes.open)) {
					this._closeSelects();
					return;
				} else {
					this._closeSelects();
					config.onOpen({
						select: this._select,
						wrapper: this._wrapper,
						dropdown: this._dropdown
					});
				}

				this._wrapper.addClass(classes.open);
			});
		}

		_closeOnBody() {
			$('body').click((e) => {
				if (!$(e.target).closest(`.${classes.wrapper}`).length) this._closeSelects();
			});
		}

		//===CHANGE VALUE ON LIST ITEM CLICK===
		_changeOnClick() {
			let that = this;

			this._list.find('li').click(function() {
				let currentValue = $(this).data('value');

				that._options
					.attr('selected', false)
					.prop('selected', false)
					.filter(`[value="${currentValue}"]`)
					.prop('selected', true);

				that._select.trigger('change');
			});
		}

		//===CHANGE VALUE ON SELECT CHANGE EVENT===
		_changeValue() {
			this._select.on('change', () => {
				let currentOption = this._select.find(':selected');
				let currentText = currentOption.text();
				let currentValue = currentOption.val();

				this._currentValue = currentValue;

				this._closeSelects();

				this._text.text(currentText);
				this._list
					.find('li')
					.removeClass(classes.selected)
					.filter(`[data-value="${currentValue}"]`)
					.addClass(classes.selected);

				if (this._text.hasClass(classes.placeholder)) this._text.removeClass(classes.placeholder);
			});
		}

		_closeSelects() {
			$(`.${classes.wrapper}`).removeClass(classes.open);
		}

		//DOM
		_createDOM(config) {
			this._createWrapper(config);
			this._createText(config);
			this._createArrow(config);
			this._createOptions();
		}
		//===WRAPPER===
		_createWrapper(config) {
			this._wrapper = this._select
					.wrap(`<div class="${classes.wrapper}"></div>`)
					.closest(`.${classes.wrapper}`);

			this._wrapper.append(`<div class="${classes.visible}"></div>`);

			this._visible = this._wrapper.find(`.${classes.visible}`);

			if (config.selectClass && config.selectClass.length) this._wrapper.addClass(config.selectClass);
		}

		//===ARROW===
		_createArrow(config) {
			if (config.arrow) {
				this._visible.append(config.arrow);
			} else {
				this._visible.append(`<i class="${classes.icon}"></i>`);
			}
		}

		//===TEXT===
		_createText(config) {
			this._text = this._visible.append(
				`<div class="${classes.text}">${this._setActiveText()}</div>`
			).find(`.${classes.text}`);

			if (config.placeholder && config.placeholder.length) this._text.addClass(classes.placeholder);
		}

		_setActiveText() {
			let active = this._getActiveOption();

			if (active.length) {
				return active.text();
			} else {
				return this._options
					.eq(0)
					.text();
			}
		}

		//===ARROW===
		_createOptions() {
			this._list = this._wrapper
				.append(
					`<div class="${classes.dropdown}">
						<ul class="${classes.list}">
							${this._createOptionsItems()}
						</ul>
					</div>`
				)
				.find(`.${classes.list}`);
			this._dropdown = this._wrapper.find(`.${classes.dropdown}`);
		}

		_createOptionsItems() {
			let i = 0;
			let max = this._options.length;
			let active = this._getActiveOption();
			let items = '';

			let current = active.length ? active.get(0) : this._options.get(0);

			for (; i < max; i++) {
				let currentOption = this._options.eq(i);

				if (currentOption.get(0) == current) {
					this._currentValue = currentOption.val();
					items += `<li class="${classes.selected}" data-value="${currentOption.val()}">${currentOption.text()}</li>`;
				} else {
					items += `<li data-value="${currentOption.val()}">${currentOption.text()}</li>`;
				}

			}

			return items;
		}

		_getActiveOption() {
			return this._options.filter('[selected]');
		}


	}

	$('.js-select').each(function() {
		let _this = $(this);
		let placeholder = _this.data('placeholder');
		let selectClass = _this.data('class');

		new Select({
			select: _this,
			selectClass: selectClass,
			arrow: false,
			placeholder: placeholder,
			onOpen(select) {
				// console.log(select);
			}
		});
	});

	//callbacks: onOpen(config) (config: select, dropdown, wrapper)

})();
