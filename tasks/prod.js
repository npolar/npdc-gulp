var task = function(gulp) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('prod', function(cb) {
    global.isProd = true;

    // Work around for hanging process. All tasks finish but gulp don't.
    gulp.on('stop', function() {
      process.nextTick(function() {
        process.exit(0);
      });
    });
    runSequence('clean', 'lint', 'test', ['browserify', 'copy-all'], cb);
  });
};

module.exports = task;