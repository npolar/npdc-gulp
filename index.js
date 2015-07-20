'use strict';

var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var path = require('path');
var _ = require('lodash');
var deepExtend = require('underscore-deep-extend');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/')).filter(onlyScripts);
var baseConfig = require('./config');

_.mixin({deepExtend: deepExtend(_)});

var loadTasks = function(gulpInstance, options) {
  var config = _.deepExtend(baseConfig, options);
  tasks.forEach(function(task) {
    require('./tasks/' + task)(gulpInstance, config);
  });
};

var loadAppTasks = function(gulpInstance, options) {
  loadTasks(gulpInstance, options);
  gulpInstance.task('default', ['dev']);
};

var loadModuleTasks = function(gulpInstance, options) {
  loadTasks(gulpInstance, options);
  gulpInstance.task('default', ['lint', 'test']);
  gulpInstance.watch([].concat(baseConfig.src.js, baseConfig.tests), ['lint', 'test']);
};

module.exports = {
  loadAppTasks: loadAppTasks,
  loadModuleTasks: loadModuleTasks,
  baseConfig: baseConfig
};
