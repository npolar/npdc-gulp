var task = function(gulp) {
  'use strict';

  var config = require('../config');
  var gulpif = require('gulp-if');
  var gutil = require('gulp-util');
  var sourcemaps = require('gulp-sourcemaps');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var watchify = require('watchify');
  var browserify = require('browserify');
  var uglify = require('gulp-uglify');
  var cache  = require('gulp-memory-cache');
  var partialify = require('partialify');
  var ngannotate = require('browserify-ngannotate');
  var debug = require('gulp-debug');
  var bundle;
  var bundler = browserify({
    // Our app main
    entries: [config.src.app],
    // Enable source maps
    debug: true
  }, watchify.args);

  // Enable require on non js files
  bundler.transform(partialify);
  // Expand angular DI to enable minififaction
  bundler.transform(ngannotate);
  bundler.on('log', gutil.log);

  bundle = function () {
    var views = cache.get('views').cache;
    gutil.log('Bundling...');

    // Add views from cache
    for (var view in views) {
      bundler.add(views[view]);
    }

    // Browseriy
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpif(global.isProd, uglify({ compress: { drop_console: true } })))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dist.approot));
  };

  // Watch for changes and rebuild
  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  // Registers gulp task
  gulp.task('browserify', ['views'], bundle);
};

module.exports = task;
