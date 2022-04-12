const {series} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const browserSync =require('browser-sync').create()
const reload = browserSync.reload
const sass=require('gulp-sass')(require('node-sass'))

const htmlmin = require('gulp-htmlmin');

function tarefasCSS(cb) {

    return gulp.src('./vendor/**/*.css')
        .pipe(concat('libs.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))

}

function tarefasSAAS(cb){
    gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    
    cb()
}

function tarefasJS(){

    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) //libs.min.js
        .pipe(gulp.dest('./dist/js'))
}


function tarefasImagem(){
    
    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

function tarefasHTML(callback){

    gulp.src('./*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))

    return callback()
}

gulp.task('serve',function(){

    browserSync.init({
        server:{
            baseDir:"./dist"
        }
    })


gulp.watch('./src/**/*/').on('change', process)
gulp.watch('./src/**/*/').on('change', reload)

})
const process=series(tarefasHTML, tarefasCSS, tarefasJS)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem
exports.sass=tarefasSASS

exports.default = series(tarefasHTML, tarefasCSS, tarefasJS)