'use strict';

var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var path = require('path');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/')).filter(onlyScripts);
var config = require('./config');

var loadTasks = function(gulpInstance) {
  tasks.forEach(function(task) {
    require('./tasks/' + task)(gulpInstance);
  });
};

var loadAppTasks = function(gulpInstance) {
  loadTasks(gulpInstance);
  gulpInstance.task('default', ['dev']);
};

var loadModuleTasks = function(gulpInstance) {
  loadTasks(gulpInstance);
  gulpInstance.task('default', ['lint', 'test']);
  gulpInstance.watch([].concat(config.src.js, config.tests), ['lint', 'test']);
};

module.exports = {
  loadTasks: loadAppTasks, // @deprecated
  loadAppTasks: loadAppTasks,
  loadModuleTasks: loadModuleTasks
};
