var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('build', function(cb) {
    global.isProd = false;
    global.buildOnly = true;
    runSequence(['clean', 'info'], 'devCommon', 'lint', 'test', 'browserify', cb);
  });
};

module.exports = task;
