var task = function(gulp) {
  'use strict';

  var addsrc = require('gulp-add-src');
  var config = require('../config');
  var templateCache = require('gulp-angular-templatecache');
  var cache  = require('gulp-memory-cache');
  var path = require('path');

  gulp.task('views', function () {
    // Concatenates and registers AngularJS templates in the $templateCache
    // TODO: Let angular-npolar handle this internally ?
    return gulp.src(config.deps.views, { base: path.join(process.cwd(), config.deps.root, '/') })
      .pipe(addsrc(config.src.views))
      .pipe(templateCache({ moduleSystem: 'Browserify', standalone: true}))
      .pipe(cache('views'));
  });
};

module.exports = task;
