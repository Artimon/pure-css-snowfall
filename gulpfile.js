'use strict';

var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

gulp.task('default', [
	'webserver',
	'deploy:watch',
	'open-browser'
]);

gulp.task('deploy', [
	'build:compile:sass',
	'copy:img',
	'copy:html'
]);

gulp.task('webserver', function() {
	return gulp.src('./dist/')
		.pipe(plugins.webserver({
			host: 'localhost',
			port: '9001',
			livereload: true,
			directoryListing: false
		}));
});

gulp.task('open-browser', function() {
	gulp.src('./dist/index.html')
		.pipe(plugins.open({
			uri: 'http://localhost:9001',
			app: 'chrome'
		}));
});

gulp.task('deploy:watch', function () {
	var cwd = { cwd: './' };

	gulp.watch('src/sass/**/*.scss', cwd, ['build:compile:sass']);
	gulp.watch('src/img/**/*.{png,jpg,gif}', cwd, ['copy:img']);
	gulp.watch('src/html/**/*.html', cwd, ['copy:html']);
});

gulp.task('build:compile:sass', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(plugins.plumber())
		.pipe(plugins.compass({
			config_file: './src/config.rb',
			css: './dist/css',
			sass: './src/sass'
		}))
		.pipe(plugins.cleanCss())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('copy:html', ['clean:html'], function () {
	return gulp.src('./src/html/**/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy:img', ['clean:img'], function () {
	return gulp.src('./src/img/**/*.{png,jpg,gif}')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('clean:html', function () {
	return gulp.src('./dist/html', { read: false })
		.pipe(plugins.clean());
});

gulp.task('clean:img', function () {
	return gulp.src('./dist/img', { read: false })
		.pipe(plugins.clean());
});