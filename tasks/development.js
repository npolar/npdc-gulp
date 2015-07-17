var task = function(gulp) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);
  var debug = require('gulp-debug');

  gulp.task('dev', function(cb) {
    global.isProd = false;
    runSequence('clean', 'lint', 'test', ['browserify', 'copy-all'], 'watch', cb);
  });

  gulp.task('default', ['dev']);
};

module.exports = task;
