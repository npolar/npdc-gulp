'use strict';
var fs = require('fs');

var readPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
};

// Expecting names to be "npdc-appname"
var appName = readPackageJson().name.split('npdc-')[1] || "",
  src = 'src',
  deps = 'node_modules',
  dist = 'dist';

var config = {
  'pkgname': readPackageJson().name,
  'name': appName,
  version: function () {return readPackageJson().version;},

  'dist': {
    'root': dist,
    'approot': dist+'/'+appName,
    'assets': dist+'/assets'
  },

  'src': {
    'root': src,
    'app': src+'/*app.js',
    'html': [src+'/index.html'],
    'views': [src+'/*/**/!(index)*.html'],
    'js': [src+'/**/*.js'],
    'jsNoTests': [src+'/**/!(*Spec).js'],
    'css': [src+'/**/*.css'],
    'img': [src+'/**/*.{ico,png,jpg,jpeg,gif}'],
    'config': [src+'/**/*.json']
  },

  'deps': {
    'root': deps,
    'css': [],
    'views': [deps+'/angular-npolar/src/ui/**/*.html', deps+'/npdc-common/src/**/!(index)*.html'],
    'assets': [deps+'/npdc-common/dist/assets/**/*']
  },

  'tests': ['src/**/*Spec.js'],
  'dirListings': false,
  'appCache': false
};

module.exports = config;
