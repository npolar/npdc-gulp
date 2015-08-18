var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('release', function (cb) {
    runSequence('bump', 'prod', 'tag', 'deploy-prod', cb);
  });

};

module.exports = task;
