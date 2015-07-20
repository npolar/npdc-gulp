var task = function(gulp, config) {
  'use strict';

  var scp = require('scp');
  var gutil = require('gulp-util');

  var scpCallback = function (err) {
    if (err) {
      gutil.log(err);
    }
    else {
      gutil.log('Deploy successfull.');
    }
  };

  gulp.task('deploy-test', ['prod'], function() {
    scp.send({
      file: config.dist.root+'/*',
      host: 'apptest.data.npolar.no',
      path: '/srv/data.npolar.no'
    }, scpCallback);
  });

  gulp.task('deploy-prod', ['prod'], function() {
    scp.send({
      file: config.dist.root+'/*',
      host: 'api.data.npolar.no',
      path: '/srv/data.npolar.no'
    }, scpCallback);
  });
};

module.exports = task;
