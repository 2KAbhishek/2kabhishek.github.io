var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
// var imagemin = require('gulp-imagemin');
const { series } = require('gulp');

gulp.task('scripts', function() {
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function () {
    return gulp.src('./scss/*.scss')
        .pipe(wait(250))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

// Optimize Images
// gulp.task('images', () =>
//     gulp.src('images/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest('min'))
// );

gulp.task('watch', function() {
    gulp.watch('js/scripts.js', gulp.series('scripts'));
    gulp.watch('scss/styles.scss', gulp.series('styles'));
    gulp.watch('scss/styles-dark.scss', gulp.series('styles'));
});

exports.default = series('styles', 'scripts');
