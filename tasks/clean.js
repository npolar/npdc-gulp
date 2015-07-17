var task = function(gulp) {
  'use strict';

  var config = require('../config');
  var del    = require('del');

  gulp.task('clean', function(cb) {
    del([config.dist.root], { force: true }, cb);
  });
};

module.exports = task;
