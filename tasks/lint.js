var task = function(gulp, config) {
  'use strict';

  var jshint = require('gulp-jshint');
  var fs = require('fs');
  var path = require('path');

  var jshintrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.jshintrc')));

  gulp.task('lint', function() {
    return gulp.src(config.src.js)
      .pipe(jshint(jshintrc))
      .pipe(jshint.reporter('jshint-stylish'));
      //.pipe(jshint.reporter('fail'));
  });
};

module.exports = task;
