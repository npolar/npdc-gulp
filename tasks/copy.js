var task = function(gulp, config) {
  'use strict';

  var gulpif = require('gulp-if');
  //var cachebust = require('gulp-cache-bust');
  var changed = require('gulp-changed');
  var minifyCss = require('gulp-minify-css');
  var preprocess = require('gulp-preprocess');
  var concat = require('gulp-concat');
  var git = require('gulp-git');
  var rename = require('gulp-rename');
  var errorHandler = require('../util/errorHandler')({plugin: 'copy', verbose: true});

  gulp.task('copy-html', function() {
    return gulp.src(config.src.html)
      .pipe(changed(config.dist.approot))
      .pipe(preprocess({
        context: {
          VERSION: config.version()
        }
      }))
      //.pipe(gulpif(global.isProd, cachebust()).on('error', errorHandler))
      .pipe(gulp.dest(config.dist.approot))
      .on('error', errorHandler);
  });

  gulp.task('copy-css', function(cb) {
    git.revParse({
      args: '--abbrev-ref HEAD', quiet: true
    }, function(err, ref) {
      gulp.src([].concat(config.deps.css, config.src.css))
        .pipe(concat(config.pkgname + '-' + config.version() + '.css'))
        .pipe(changed(config.dist.approot))
        .pipe(gulpif(global.isProd, minifyCss()))
        .pipe(gulp.dest(config.dist.approot))
        .pipe(rename(config.pkgname + '-' + ref + '-latest.css'))
        .pipe(gulp.dest(config.dist.approot))
        .on('error', errorHandler);
        cb();
    });

  });

  gulp.task('copy-static', function() {
    return gulp.src([].concat(config.src.static))
      .pipe(changed(config.dist.approot))
      .pipe(gulp.dest(config.dist.approot));
  });

  gulp.task('copy-deps-assets', function() {
    return gulp.src(config.deps.assets)
      .pipe(changed(config.dist.approot + '/assets'))
      .pipe(gulp.dest(config.dist.approot + '/assets'));
  });

  gulp.task('copy-deps-shared-assets', function() {
    return gulp.src(config.deps.sharedAssets)
      .pipe(changed(config.dist.assets))
      .pipe(gulp.dest(config.dist.assets));
  });

  gulp.task('copy-all', ['copy-html', 'copy-css', 'copy-static', 'copy-deps-assets', 'copy-deps-shared-assets']);
};

module.exports = task;
