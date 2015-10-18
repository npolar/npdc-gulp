var task = function(gulp, config) {
  'use strict';
  gulp.task('browserSync', function() {
    
    var path = require('path');
    var fs = require('fs');
    var browserSync = require('browser-sync').create();
    var html5Regex = new RegExp('\/'+config.name+'\/(.*)$');

    browserSync.init({
      server: {
        // Serve both project root and dist to enable sourcemaps
        baseDir: [process.cwd(), config.dist.root],
        middleware: function (req, res, next) {
          var location;
          // Enable CORS
          res.setHeader('Access-Control-Allow-Origin', '*');
          // Rewrite html5 urls
          var matches = html5Regex.exec(req.url);
          //console.log('req', req.url);
          var file = path.join(config.dist.root, req.url);
          //console.log('file', file);
          if (req.method === 'GET' && matches && !fs.existsSync(file)) {
            //console.log('no file -> hashbang!');
            location = '/'+config.name+'/#!'+matches[1];
            res.writeHead(302, {'Location': location});
            res.end();
          } else {
            //console.log('serve file');
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
