var task = function(gulp, config) {
  'use strict';

  var mocha = require('gulp-mocha');

  gulp.task('test', function () {
    return gulp.src(config.tests, {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'dot'
        }));
  });
};

module.exports = task;
