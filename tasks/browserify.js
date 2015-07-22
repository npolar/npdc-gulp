var task = function(gulp, config) {
  'use strict';

  var gulpif = require('gulp-if');
  var gutil = require('gulp-util');
  var sourcemaps = require('gulp-sourcemaps');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var watchify = require('watchify');
  var browserify = require('browserify');
  var uglify = require('gulp-uglify');
  var partialify = require('partialify');
  var ngannotate = require('browserify-ngannotate');
  var glob = require('glob');
  var _ = require('lodash');

  var app = glob.sync('./'+config.src.app);
  var bundleName = _.last(app[0].split('/'));
  var bundle;

  var bundler = browserify({
    // Our app main
    entries: app,
    // Enable source maps
    debug: true
  }, watchify.args);

  // Enable require on non js files
  bundler.transform(partialify);
  // Expand angular DI to enable minififaction
  bundler.transform(ngannotate);
  bundler.on('log', gutil.log);

  bundler.add('/tmp/templates.js');
  bundle = function (ids) {
    if (ids instanceof Array) {
      gutil.log('Bundling', ids);
    } else {
      gutil.log('Bundling app');
    }

    // Browseriy
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(bundleName))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(gulpif(global.isProd, uglify({ compress: { drop_console: true } })))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dist.approot));
  };

  // Watch for changes and rebuild
  if ( !global.isProd ) {
    bundler = watchify(bundler);
    bundler.on('update', function (ids) {
      // Ignore package.json updates
      if (ids.length === 1 && /package\.json$/.test(ids[0])) {
        return;
      }
      return bundle(ids);
    });
  }

  // Registers gulp task
  gulp.task('browserify', ['views'], bundle);
};

module.exports = task;
