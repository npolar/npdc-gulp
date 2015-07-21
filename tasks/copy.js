var task = function(gulp, config) {
  'use strict';

  var gulpif = require('gulp-if');
  var cachebust = require('gulp-cache-bust');
  var changed = require('gulp-changed');
  var minifyCss = require('gulp-minify-css');
  var preprocess = require('gulp-preprocess');
  
  gulp.task('copy-html', function () {
    return gulp.src(config.src.html)
      .pipe(changed(config.dist.approot))
      .pipe(preprocess({context: { VERSION: config.VERSION }}))
      .pipe(gulpif(global.isProd, cachebust()))
      .pipe(gulp.dest(config.dist.approot));
  });

  gulp.task('copy-css', function () {
    return gulp.src(config.src.css)
      .pipe(changed(config.dist.approot))
      .pipe(gulpif(global.isProd, minifyCss()))
      .pipe(gulp.dest(config.dist.approot));
  });

  gulp.task('copy-static', function () {
    return gulp.src([].concat(config.src.config, config.src.img))
      .pipe(changed(config.dist.approot))
      .pipe(gulp.dest(config.dist.approot));
  });

  gulp.task('copy-deps-css', function () {
    return gulp.src(config.deps.css, { base: config.deps.root })
      .pipe(changed(config.dist.assets))
      .pipe(gulpif(global.isProd, minifyCss()))
      .pipe(gulp.dest(config.dist.assets));
  });

  gulp.task('copy-all', ['copy-html', 'copy-css', 'copy-static', 'copy-deps-css']);
};

module.exports = task;
