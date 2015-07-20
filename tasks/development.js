var task = function(gulp) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('dev', function(cb) {
    global.isProd = false;
    runSequence('clean', 'lint', 'test', ['browserify', 'copy-all'], 'watch', cb);
  });
};

module.exports = task;
