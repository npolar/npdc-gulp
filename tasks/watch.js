var task = function(gulp, config) {
  'use strict';

  var gutil = require('gulp-util');
  var fs = require('fs');
  var path = require('path');

  gulp.task('watch-html', function() {
    return gulp.watch(config.src.html, ['copy-html']);
  });

  gulp.task('watch-css', function() {
    return gulp.watch([].concat(config.src.css), ['copy-css']);
  });

  gulp.task('watch-static', function() {
    return gulp.watch([].concat(config.src.config, config.src.img), ['copy-static']);
  });

  gulp.task('watch-views', function() {
    return gulp.watch(config.src.views, ['views']);
  });

  gulp.task('watch-test', function() {
    return gulp.watch([].concat(config.src.js, config.tests), ['lint', 'test']);
  });

  gulp.task('watch-deps', function(cb) {
    fs.readdirSync(config.deps.root).forEach(function(file) {
      var stats = fs.lstatSync(path.join(config.deps.root, file));
      if (stats.isSymbolicLink()) {
        config.deps.css.forEach(function(glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['copy-css', 'copy-deps-assets']);
            gutil.log('Watching npm linked asset ' + file + ' for css changes');
          }
        });
        config.deps.views.forEach(function(glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['views']);
            gutil.log('Watching npm linked asset ' + file + ' for template changes');
          }
        });
      }
    });
    cb();
  });

  gulp.task('watch-all', ['watch-html', 'watch-css', 'watch-static', 'watch-views', 'watch-test', 'watch-deps']);
};

module.exports = task;
