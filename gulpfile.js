var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass')(require('sass'));
var wait = require('gulp-wait');
var rename = require('gulp-rename');

const { series } = require('gulp');

gulp.task('scripts', function() {
    return gulp
        .src('scripts/scripts.js')
        .pipe(
            plumber(
                plumber({
                    errorHandler: function(err) {
                        console.log(err);
                        this.emit('end');
                    }
                })
            )
        )
        .pipe(uglify({ output: { comments: '/^!/' } }))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('scripts'));
});

gulp.task('styles', function() {
    return gulp
        .src('styles/styles.scss')
        .pipe(wait(250))
        .pipe(
            sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError)
        )
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('styles'));
});

gulp.task('watch', function() {
    gulp.watch('scripts/scripts.js', gulp.series('scripts'));
    gulp.watch('styles/styles.scss', gulp.series('styles'));
});

exports.default = series('styles', 'scripts');
