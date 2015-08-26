'use strict';
var fs = require('fs');

var readPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
};

// Expecting names to by "npdc-appname"
var appName = readPackageJson().name.split('npdc-')[1],
  src = 'src',
  deps = 'node_modules',
  dist = 'dist';

var config = {
  'name': appName,
  version: function () {return readPackageJson().version;},

  'dist': {
    'root': dist,
    'approot': dist+'/'+appName,
    'assets': dist+'/'+appName+'/assets'
  },

  'src': {
    'root': src,
    'app': src+'/*app.js',
    'html': [src+'/index.html'],
    'views': [src+'/*/**/*.html'],
    'js': [src+'/**/*.js'],
    'css': [src+'/**/*.css'],
    'img': [src+'/**/*.{ico,png,jpg,jpeg,gif}'],
    'config': [src+'/**/*.json']
  },

  'deps': {
    'root': deps,
    'css': [deps+'/purecss/build/pure-min.css', deps+'/bootstrap/dist/css/bootstrap.min.css', deps+'/formula/dist/formula.min.css'],
    'views': [deps+'/angular-npolar/ui/**/*.html', deps+'/npdc-common/src/ui/**/*.html']
  },

  'tests': ['src/**/*Spec.js']
};

module.exports = config;
