var task = function(gulp, config) {
  'use strict';

  var mocha = require('gulp-mocha');
  var errorHandler = require('../util/errorHandler')({plugin: 'mocha', verbose: false});
  var istanbul = require('gulp-istanbul');
  var debug = require('gulp-debug');

  gulp.task('pre-test', function() {
    return gulp.src(config.src.jsNoTests)
      .pipe(debug())
      // Covering files
      .pipe(istanbul({includeUntested: true}).on('error', errorHandler))
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire());
  });

  gulp.task('test', ['pre-test'], function() {
    return gulp.src(config.tests, {
        read: false
      })
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'dot'
      }).on('error', errorHandler))
      // .pipe(istanbul.writeReports({
      //   reporters: ['text-summary', 'lcov']
      // }))
      .on('error', errorHandler);
  });
};

module.exports = task;
