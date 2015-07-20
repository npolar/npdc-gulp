'use strict';
var path = require('path');
var pkg = require(path.join(process.cwd(), 'package.json'));

// Expecting names to by "npdc-appname"
var appName = pkg.name.split('npdc-')[1],
  src = 'src',
  deps = 'node_modules',
  dist = 'dist';

var config = {
  'name': appName,

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
    'css': [deps+'/purecss/build/pure.css', deps+'/bootstrap/dist/css/bootstrap.min.css', deps+'/formula/dist/formula.min.css'],
    'views': [deps+'/angular-npolar/ui/**/*.html']
  },

  'tests': ['src/**/*Spec.js']
};

module.exports = config;
