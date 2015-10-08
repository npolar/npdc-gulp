var task = function(gulp, config) {
  'use strict';

  var browserSync = require('browser-sync').create();
  var html5Regex = new RegExp('\/'+config.name+'\/([^\.]+)$');

  gulp.task('browserSync', function() {

    browserSync.init({
      server: {
        // Serve both project root and dist to enable sourcemaps
        baseDir: [process.cwd(), config.dist.root],
        middleware: function (req, res, next) {
          var path;
          // Enable CORS
          res.setHeader('Access-Control-Allow-Origin', '*');
          // Rewrite html5 urls
          var matches = html5Regex.exec(req.url);
          if (req.method === 'GET' && matches) {
            path = '/'+config.name+'/#!'+matches[1];
            res.writeHead(302, {'Location': path});
            res.end();
          } else {
            next();
          }
        },
        directory: config.dirListings || false
      },
      // Watch for updates in dist
      files: [config.dist.root+'/**/*'],
      // Disable input mirroring between connected browsers
      ghostMode: false,
      open: false
    });

  });
};

module.exports = task;
