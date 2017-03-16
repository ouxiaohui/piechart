var gulp = require('gulp')
connect = require('gulp-connect'),
    watch = require('gulp-watch');
var port = 1000;
var file = 'src/index.html';
var proxy = require('http-proxy-middleware');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var jsfile = ['./src/js/*.js', './src/js/*/*.js'];
var livereload = require('gulp-livereload');
var htmlfile = './src/pages/*.html';
gulp.task('serve', function () {
    connect.server({
        root: [__dirname],
        ip: "192.168.10.238",
        port: port,
        livereload: true
    });
});

var sassFile = './src/css/*.scss';
gulp.task('sass', function () {
    gulp.src(sassFile)
        .pipe(concat('main.min.css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./release/css'))
});


gulp.task('lint', function () {
    gulp.src(jsfile)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
    gulp.src(jsfile)
        .pipe(concat('pie_chart.js'))
        .pipe(gulp.dest('./release/js'))
        .pipe(rename('pie_chart.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./release/js'));
});

gulp.task('htmls', function () {
    gulp.src(htmlfile)
        .pipe(gulp.dest('./release/pages'));
    gulp.src(file)
    .pipe(gulp.dest('./release'));
})

gulp.task('reload', function () {
    gulp.src(file)
        .pipe(livereload());
    gulp.src(sassFile)
        .pipe(livereload());
    gulp.src(jsfile)
        .pipe(livereload());
    gulp.src(htmlfile)
        .pipe(livereload())
})


gulp.task('default', ['serve'], function () {
    livereload.listen();
    gulp.watch([file, sassFile, jsfile, htmlfile], ['reload']);
    gulp.watch(sassFile, ['sass']);
    gulp.watch(jsfile, ['scripts']);
    gulp.watch([htmlfile,file], ['htmls'])
});
