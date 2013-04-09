
	/**
	 * Export
	 */
	if (typeof exports !== 'undefined') {
		exports.Field = Field;
		exports.Form = Form;
	} else {
		window.UniversalForms = {
			Field : Field,
			Form : Form
		};
	}

})(jQuery);
