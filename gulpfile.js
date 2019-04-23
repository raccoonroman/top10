'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-csso');
var htmlmin = require('gulp-htmlmin');
var jsmin = require('gulp-uglify');
var rename = require("gulp-rename");
var imgmin = require('gulp-tinify');
var svgmin = require('gulp-svgmin');
var browserSync = require('browser-sync');


gulp.task('sass', function () {
	return gulp.src('source/sass/style.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer(['last 1 version'])
		]))
		.pipe(gulp.dest('source/css'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(cssmin())
		.pipe(gulp.dest('build/css'))
});

gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: "source"
		},
		notify: false
	})
});

gulp.task('watch', ['sass', 'browser-sync'], function () {
	gulp.watch('source/sass/**/*.scss', ['sass']);
	gulp.watch("source/*.html", browserSync.reload)
});

gulp.task('img', function() {
	gulp.src('source/img/*.{png,jpg}')
		.pipe(imgmin('m9CBTOsBlI9zd4IYtwBwTK6kcks2YDT6'))
		.pipe(gulp.dest('build/img'));
});

gulp.task('svg', function () {
	return gulp.src('source/img/*.svg')
		.pipe(svgmin())
		.pipe(gulp.dest('build/img'));
});

gulp.task('minjs', function () {
	return gulp.src('source/js/**/*.js')
		.pipe(jsmin())
		.pipe(gulp.dest('build/js'));
});

gulp.task('minhtml', function() {
	return gulp.src('source/*.html')
		.pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
		.pipe(gulp.dest('build/'));
});
