"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open');  //open a url in a web browser
var browserify = require('browserify'); //bundle js
var reactify = require('reactify'); //transpile JSX
var source = require('vinyl-source-stream'); //use conventional text streams with Gulp
var concat = require('gulp-concat'); //concatenates files

var config = {
  port: 3000,
  devBaseUrl: "http://localhost",
  paths: {
    html: './src/*.html',
    js: './src/**/*.js',
    images: './src/images/*',
    css: [
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
    ],
    dist: './dist',
    mainJs: './src/main.js',
  }
};

//copy src to dist
var htmlFunction = () => {
  return gulp.src([config.paths.html])
             .pipe(gulp.dest(config.paths.dist))
             .pipe(connect.reload());
}

gulp.task('html', htmlFunction);

//transpile and bundle the js
var jsFunction = () => {
  return browserify(config.paths.mainJs)
    .transform(reactify)
    .bundle()
    .on('error', console.error.bind(console))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(config.paths.dist + '/scripts'))
    .pipe(connect.reload());
}

gulp.task('js', jsFunction);

//bundle the css
var cssFunction = () => {
  return gulp.src(config.paths.css)
      .pipe(concat('bundle.css'))
      .pipe(gulp.dest(config.paths.dist + '/css'));
};

gulp.task('css', cssFunction);

//copy images to the dist folder
gulp.task('images', function(done) {
  gulp.src(config.paths.images)
      .pipe(gulp.dest(config.paths.dist + '/images'));
  done();
})

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

//monitor the src folders and reload on changes
gulp.task('watch', function(done) {
  gulp.watch(config.paths.html, htmlFunction);
  gulp.watch(config.paths.js, jsFunction);
  done();
});

//open the site in the default browser
// gulp.task('open', function(done) {
//   gulp.src('dist/index.html')
//       .pipe(open({ uri: config.devBaseUrl + ':' + config.port}));
//   done();
// });

gulp.task('default', gulp.series('html', 'js', 'css', 'images', 'connect', 'watch'));
