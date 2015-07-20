var task = function(gulp, config) {
  'use strict';

  var gutil = require('gulp-util');
  var fs = require('fs');
  var path = require('path');

  gulp.task('watch', ['browserSync'], function() {

    // Scripts are automatically watched and rebundled by Watchify inside Browserify task
    gulp.watch(config.src.html, ['copy-html']);
    gulp.watch(config.src.css, ['copy-css']);
    gulp.watch([].concat(config.src.config, config.src.img), ['copy-static']);
    gulp.watch(config.src.views, ['browserify']);
    gulp.watch([].concat(config.src.js, config.tests), ['lint', 'test']);

    // Watch assets if 'npm link'ed
    fs.readdirSync(config.deps.root).forEach(function (file) {
      var stats = fs.lstatSync(path.join(config.deps.root, file));
      if (stats.isSymbolicLink()) {
        config.deps.css.forEach(function (glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['copy-deps-css']);
            gutil.log('Watching npm linked asset ' + file + ' for css changes');
          }
        });
        config.deps.views.forEach(function (glob) {
          if (glob.indexOf(file) > -1) {
            gulp.watch(glob, ['views']);
            gutil.log('Watching npm linked asset ' + file + ' for template changes');
          }
        });
      }
    });
  });
};

module.exports = task;
