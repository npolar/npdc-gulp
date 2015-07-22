var task = function(gulp, config) {
  'use strict';

  var scp = require('scp');
  var gutil = require('gulp-util');
  var inquirer = require('inquirer');

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

  gulp.task('deploy-prod', function(cb) {
    inquirer.prompt([{
      type: 'confirm', name: 'ok',
      message: 'Are you sure you want to deploy to production?',
      default: false}], function (answer) {
        if (answer.ok) {
          scp.send({
            file: config.dist.root+'/*',
            host: 'app2.data.npolar.no',
            path: '/srv/data.npolar.no'
          }, scpCallback);
        } else {
          cb();
        }
      });

  });
};

module.exports = task;
