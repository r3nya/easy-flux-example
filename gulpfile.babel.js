import gulp from 'gulp';

gulp.task('build', () => {
  const browserify = require('browserify');
  const babelify = require('babelify');
  const source = require('vinyl-source-stream');

  return browserify({
    entries: 'components/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('compress', () => {
  const uglify = require('gulp-uglify');
  const rename = require('gulp-rename');

  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () => {
  const eslint = require('gulp-eslint');

  gulp.src(['*.js', 'components/*.jsx', 'components/*/*.jsx'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('default', (cb) => {
  const runSequence = require('run-sequence');

  runSequence('build', 'compress', cb);
});

gulp.task('watch', () => {
  gulp.watch('./*.js', ['default']);
  gulp.watch('./*/*.jsx', ['default']);
});
