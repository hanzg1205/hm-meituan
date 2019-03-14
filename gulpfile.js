const gulp = require('gulp');
const gulpScss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpConcat = require('gulp-concat');
const minCss = require('gulp-clean-css');
const gulpBabel = require('gulp-babel');
const gulpUglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const webServer = require('gulp-webserver');
const listData = require('./src/data/list.json');
const { parse } = require('url');
const { readFileSync } = require('fs');
const { join } = require('path');

// 处理css
gulp.task('devCss', () => {
    return gulp.src('./src/scss/*.scss')
        .pipe(gulpScss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./src/css'))
});
// 处理js
gulp.task('devJs', () => {
    return gulp.src('./src/scripts/*.js')
        .pipe(gulpBabel({
            presets: 'es2015'
        }))
        .pipe(gulp.dest('./src/js'))
});

// 监听文件
gulp.task('watch', () => {
    gulp.watch('./src/scss/*.scss', gulp.series('devCss'))
    gulp.watch('./src/scripts/*.js', gulp.series('devJs'))
        // gulp.watch('./src/*.html', gulp.series('devHtml'))
});

// 服务器
gulp.task('server', () => {
    return gulp.src('.')
        .pipe(webServer({
            port: 3000,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    return res.end('error');
                }
                let { pathname, query } = parse(req.url, true);
                pathname = pathname === '/' ? 'index.html' : pathname;
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: listData }))
                } else {
                    res.end(readFileSync(join(__dirname, 'src', pathname)));
                }
            }
        }))
});

// 打包
gulp.task('buildHtml', () => {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./build'))
});
gulp.task('buildCss', () => {
    return gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./build/css'))
});
gulp.task('buildJs', () => {
    return gulp.src('./src/js/*.js')
        .pipe(gulpUglify())
        .pipe(gulp.dest('./build/js'))
});

// 监听所有
gulp.task('go', gulp.parallel('watch', 'server'));