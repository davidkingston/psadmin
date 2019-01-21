"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open');  //open a url in a web browser

var config = {
  port: 3000,
  devBaseUrl: "http://localhost",
  paths: {
    html: './src/*.html',
    dist: './dist'
  }
};

//copy src to dist
gulp.task('html', function(done) {
  gulp.src([config.paths.html])
      .pipe(gulp.dest(config.paths.dist))
  done();
});

//start a local development server
gulp.task('connect', function(done) {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
  done();
});

//monitor the src folder and reload on changes
gulp.task('watch', function(done) {
  gulp.watch(config.paths.html, function() {
    return gulp.src([config.paths.html])
               .pipe(gulp.dest(config.paths.dist))
               .pipe(connect.reload());
  });
  done();
});

//open the site in the default browser
// gulp.task('open', function(done) {
//   gulp.src('dist/index.html')
//       .pipe(open({ uri: config.devBaseUrl + ':' + config.port}));
//   done();
// });

gulp.task('default', gulp.series('html', 'connect', 'watch'));
