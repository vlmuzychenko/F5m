import CalendarModal from './CalendarModal'
import {Datepicker} from 'jquery-ui-bundle'
import '../lib/datepicker-ru'

export default class Calendar {
	constructor() {
		this._data = {
			calendar		: '[data-calendar]',
			calendarPopup	: '[data-calendar-popup]',
			calendarTitle	: '[data-calendar-title]',
			calendarYear	: '[data-calendar-year]',
			closeCalendar	: '[data-close-calendar]',
			inputFrom		: '[data-calendar-from]',
			inputTo			: '[data-calendar-to]',
			saveBtn			: '[data-calendar-save]',
			calendarYearSelect: '.ui-datepicker-year'
		};

		this.calendar 		= $(this._data.calendar);
		this.calendarYear 	= $(this._data.calendarYear);
		this.inputs 		= $(this._data.inputFrom + ', ' + this._data.inputTo);
		this.saveBtn 		= $(this._data.saveBtn);

		//initialisations
		this.initCalendar();
		this.initModal();

		//binding events
		this.inputs
			.on('focus', this.showModal.bind(this));

		this.calendarYear
			.on('click', this.changeYear.bind(this));

		this.saveBtn
			.on('click', this.saveDate.bind(this));
	}

	initCalendar() {

		this.calendar.datepicker({
			inline: true,
			changeYear: true,
			showOtherMonths: true,
			selectOtherMonths: false,
			dateFormat: 'dd.mm.yy',
			minDate: new Date(),
			onChangeMonthYear: year => setActiveYear.call(this, year)
		});

		function setActiveYear(year) {

			this.calendarYear.removeClass('is-active');

			return (
				this.calendarYear
					.filter(`[data-value="${year}"]`)
					.addClass('is-active')
			)

		}

	}

	initModal() {

		let data = this._data;
		this.modal = new CalendarModal({
			modal: data.calendarPopup,
			closeEl: data.closeCalendar,
			beforeOpen: function(e, modal) {

				let titleBlock = modal.find(data.calendarTitle);
				let target = $(e.target);
				let titleText = target.data('title');

				titleBlock.text(titleText);

			}
		});

	}

	showModal(e) {
		this.currentInput = $(e.target);
		this.modal.show(e);
	}

	changeYear(e) {
		this.calendarYearSelect = this.calendar.find(this._data.calendarYearSelect);

		let target = $(e.target);
		let year = target.data('value');

		this.calendarYear.removeClass('is-active');
		target.addClass('is-active');

		this.calendarYearSelect.find(`option[value="${year}"]`).prop('selected', true);
		this.calendarYearSelect.change();

		e.preventDefault();
	}

	saveDate(e) {
		let date = this.calendar.datepicker().val();
		this.currentInput.val(date);

		this.modal.hide();
	}

}

new Calendar();
