const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');

const stylePath = { src: './src/scss/**/*.scss', dest: './dist' };
const pugPath = { src: './src/pug/**/*.pug', dest: './dist' };
const jsPath = { src: './src/js/**/*.js', dest: './dist' };
const imagePath = { src: './src/images/*.+(png|jpg)', dest: './dist/images' };

gulp.task('sass', () => {
  return gulp.src(stylePath.src)
    .pipe(sass())
    .pipe(gulp.dest(stylePath.dest))
    .pipe(connect.reload());
});

gulp.task('pug', () => {
  return gulp.src(pugPath.src)
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest(pugPath.dest))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(pugPath.src, ['pug']);
  gulp.watch(stylePath.src, ['sass']);
});

gulp.task('server', () => {
  connect.server({
    root: './dist',
    liveereload: true,
  });
});

gulp.task('default', ['sass', 'pug', 'watch', 'server']);
