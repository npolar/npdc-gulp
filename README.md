# npdc-gulp
Exposes tasks for apps and support modules.

##Usage
Add this repo as a devDependency in package.json and install.  
For apps use this gulpfile:

    var gulp = require('gulp');
    var npdcGulp = require('npdc-gulp');
    npdcGulp.loadAppTasks(gulp);

For support modules use this gulpfile:

    var gulp = require('gulp');
    var npdcGulp = require('npdc-gulp');
    npdcGulp.loadModuleTasks(gulp);

List tasks with ```gulp --tasks```
