var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
* clean
*/
gulp.task('clean', function () {
  return del('dist');
});

/**
* build
*/
gulp.task('build', ['clean'], function() {
  // Angular-jwt js
  gulp.src('src/angular-jwt.js')
  .pipe(gulp.dest('dist'));

  // Minified js
  gulp.src('src/angular-jwt.js')
  .pipe(uglify({preserveComments: 'all'}))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));
});
