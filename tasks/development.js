var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('dev', function(cb) {
    global.isProd = false;
    runSequence(['clean', 'info'], 'lint', 'test', ['browserify', 'copy-all'], 'browserSync', 'watch-all', cb);
  });
};

module.exports = task;
