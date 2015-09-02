var task = function(gulp, config) {
  'use strict';

  var scp = require('scp');
  var gutil = require('gulp-util');
  var inquirer = require('inquirer');

  gulp.task('deploy-test', ['prod'], function(cb) {
    scp.send({
      file: config.dist.root+'/*',
      host: 'apptest.data.npolar.no',
      path: '/srv/data.npolar.no'
    }, function (err) {
      if (err) {
        gutil.log(err);
        cb(err);
      } else {
        gutil.log('Deploy successfull.');
        cb();
      }});
  });

  gulp.task('deploy-prod', function(cb) {
    // Work around for hanging process. All tasks finish but gulp don't.
    gulp.on('stop', function() {
      process.nextTick(function() {
        process.exit(0);
      });
    });

    inquirer.prompt([{
      type: 'confirm', name: 'ok',
      message: 'Are you sure you want to deploy to production?',
      default: false}], function (answer) {
        if (answer.ok) {
          scp.send({
            file: config.dist.root+'/*',
            host: 'app2.data.npolar.no',
            path: '/srv/data.npolar.no'
          }, function (err) {
            if (err) {
              gutil.log(err);
              cb(err);
            } else {
              gutil.log('Deploy successfull.');
              cb();
            }});
        } else {
          cb();
        }
      });

  });
};

module.exports = task;
