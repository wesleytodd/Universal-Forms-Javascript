
	/**
	 * Export
	 */
	if (typeof exports !== 'undefined') {
		exports.Field = Field;
		exports.Form = Form;
	} else {
		if (typeof require !== 'undefined' && typeof define === 'function') {
			define(function() {
				return {
					Form : Form,
					Field : Field
				};
			});
		} else {
			window.UniversalForms = window.UniversalForms || {};
			window.UniversalForms.Field = Field;
			window.UniversalForms.Form = Form;
		}
	}

})();
