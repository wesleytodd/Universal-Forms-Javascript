var fs = require('fs'),
	path = require('path');

module.exports = function(grunt) {
	
	grunt.initConfig({

		regarde : {
			all : {
				files : getAllFiles(),
				tasks : ['default']
			}
		},

		concat : {
			core : {
				src : ['core/prefix.js', 'core/field.js', 'core/form.js', 'core/suffix.js'],
				dest : 'build/universal-forms-core.js'
			},
			drivers : {
				files : formatDriversConcat()
			}
		},

		uglify : {
			core : {
				files : {
					'build/universal-forms-core.min.js' : 'build/universal-forms-core.js'
				}
			},
			drivers : {
				files : formatDriversUglify()
			}
		},

		jshint : {
			all : getAllFiles(),
			options : {
				browser: true,
				curly: true,
				eqeqeq: true,
				eqnull: true,
				expr: true,
				immed: true,
				newcap: true,
				noarg: true,
				smarttabs: true,
				sub: true,
				undef: true,
				globals: {
					$: true,
					jQuery: true,
					UniversalForms: true,
					Form: true,
					Field: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-regarde');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};

var formatDriversConcat = function() {
	var out = {},
		drivers = getDrivers();
	for (var d in drivers) {
		var outputFile = path.join('build', 'drivers', 'universal-forms-' + drivers[d] + '.js');
		out[outputFile] = getDriverFiles(drivers[d]);
		out[outputFile].unshift('core/form.js');
		out[outputFile].unshift('core/field.js');
		out[outputFile].unshift('core/prefix.js');
		out[outputFile].push('core/suffix.js');
	}
	return out;
};

var formatDriversUglify = function() {
	var out = {},
		drivers = getDrivers();
	for (var d in drivers) {
		out[path.join('build', 'drivers', 'universal-forms-' + drivers[d] + '.min.js')] = path.join('build', 'drivers', 'universal-forms-' + drivers[d] + '.js');
	}
	return out;
};

// Get all the files
var allFiles; 
var getAllFiles = function() {
	if (!allFiles) {
		allFiles = [];
		var drivers = getDrivers();
		for (var d in drivers) {
			files = getDriverFiles(drivers[d]);
			for (var f in files) {
				allFiles.push(files[f]);
			}
		}
	}
	return allFiles;
};

// Get the available drivers
var avlDrivers;
var getDrivers = function() {
	if (!avlDrivers) {
		avlDrivers = fs.readdirSync('drivers');
	}
	return avlDrivers;
};

// Get the files from a driver
var driverFiles = {};
var getDriverFiles = function(driver) {
	if (typeof driverFiles[driver] === 'undefined') {
		var driverPath = path.join('drivers', driver, 'src');
		var files = fs.readdirSync(driverPath);
		for (var f in files) {
			files[f] = path.join(driverPath, files[f]);
		}
		driverFiles[driver] = files;
	}
	return driverFiles[driver];
};
