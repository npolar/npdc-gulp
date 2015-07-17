'use strict';

var fs = require('fs');
var onlyScripts = require('./util/scriptFilter');
var path = require('path');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/')).filter(onlyScripts);

var loadTasks = function(gulpInstance) {
  tasks.forEach(function(task) {
    require('./tasks/' + task)(gulpInstance);
  });
}

module.exports = {loadTasks: loadTasks};
