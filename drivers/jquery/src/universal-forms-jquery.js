/*
 * jQuery Validation
 */
Form.on('init', function() {
	this.$el = $('#' + this.attributes.id);
});

var ruleRegex = /([a-z]+)(?:\[(.*)\])?/;

var rulesMap = {
	required : {
		method : 'required',
		callback : function() {
			return true;
		}
	},
	email : {
		method : 'email',
		callback : function() {
			return true;
		}
	},
	length : {
		method : 'rangelength',
		callback : function(min, max) {
			if (typeof min === 'undefined' || min === '') {
				min = 0;
			}
			if (typeof max === 'undefined' || max === '') {
				max = Number.MAX_VALUE;
			}
			return [min, max];
		}
	},
	alpha : {
		method : 'alpha',
		callback : function() {
			return true;
		}
	},
	matches : {
		method : 'equalTo',
		callback : function(field) {
			return '[name=' + field + ']';
		}
	}
};

$.validator.addMethod('alpha', function(value, element) {
	return (/[a-z]*/i).test(value);
}, 'Please use only alphabetical characters');

Form.prototype.validate = function(opts) {
	opts = $.extend({rules:{}}, opts);
	this.eachField(function(field) {
		if (field.rules.length > 0) {
			opts.rules[field.name] = {};
			for (var i = 0, l = field.rules.length; i < l; i++) {
				var temp = ruleRegex.exec(field.rules[i]),
					rule = temp[1],
					args = [];
				if (temp.length > 2 && typeof temp[2] !== 'undefined') {
					args = temp[2].split(',');
				}
				opts.rules[field.name][rulesMap[rule].method] = rulesMap[rule].callback.apply(this, args);
			}
		}
	});
	this.$el.validate(opts);
};
