var task = function (gulp, config) {
  'use strict';

  var manifest = require('gulp-manifest');

  gulp.task('manifest', function(){
    gulp.src([config.dist.root + '/**/*'])
      .pipe(manifest({
        hash: true,
        prefix: '/',
        preferOnline: !global.isProd, // Prefer online in devmode
        network: ['*'],
        filename: 'app.manifest',
        exclude: '**/app.manifest'
       }))
      .pipe(gulp.dest(config.dist.approot));
  });
};

module.exports = task;
