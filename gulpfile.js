var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

var gutil = require('gulp-util');
var postcss = require('gulp-postcss');
var simplevars = require('postcss-simple-vars');
// var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var nestedcss = require('postcss-nested');
var corepostcss = require('postcss');

gulp.task('css', function () {
	var processors = [
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-custom-properties'),
    require('postcss-calc'),
    require('postcss-color-function'),
    require('cssstats'),
    require('postcss-discard-comments'),
    require('autoprefixer')({browsers: ['last 4 versions']}),
    require('postcss-reporter')
	];
	return gulp.src('./preCSS/**/*.css')
		.pipe(postcss(processors))
		// .pipe(postcss(processors).on('error', gutil.log))
		.pipe(gulp.dest('./dest/stylesheets/'));
});

// Static server
gulp.task('browser-sync', function() {
	 browserSync({
		  server: {
				baseDir: "./"
		  }
	 });
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'))
		.pipe(reload({stream:true}));
});

// Images
gulp.task('images', function() {
  return gulp.src('img/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/images'))
	.pipe(notify({ message: 'Images task complete' }));
});

// Watch
gulp.task('watch', function() {

	// Watch .scss files
	gulp.watch('preCSS/**/*.css', ['css', browserSync.reload]);

	// Watch .js files
	gulp.watch(['js/**/*.js','main.js'], ['scripts', browserSync.reload]);

	// Watch image files
	gulp.watch('img/**/*', ['images']);

	// Watch any files in dist/, reload on change
	gulp.watch("*.html", browserSync.reload);

});

gulp.task('default', ['css', 'browser-sync', 'scripts', 'watch']);
