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

//start a local development server
gulp.task('connect', function(done) {
  connect.server({
    root: ['src'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
  done();
});

gulp.task('open', function(done) {
  gulp.src('src/index.html')
      .pipe(open({ uri: config.devBaseUrl + ':' + config.port}));
  done();
});

gulp.task('html', function(done) {
  gulp.src(config.paths.html)
      .pipe(gulp.dest(config.paths.dist))
      .pipe(connect.reload());
  done();
});

gulp.task('default', gulp.series('connect', 'open'));
