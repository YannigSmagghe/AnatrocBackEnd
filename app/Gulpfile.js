var gulp = require('gulp');
var less = require('gulp-less');
var rev = require('gulp-rev');
var shell = require('gulp-shell');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');
var rewriteCSS = require('gulp-rewrite-css');
var autoprefixer = require('gulp-autoprefixer');

const vars = {
    theme: 'front',
    copy_files: {
        fonts: {
            fonts_src: [
                './node_modules/font-awesome/fonts/*',
                './node_modules/ionicons/fonts/*'
            ],
            fonts_css: [
                './node_modules/font-awesome/less/*',
                './node_modules/ionicons/less/*'
            ],
            fonts_dest: 'assets/less/fonts/',
            fonts_css_dest: 'assets/less/fonts-awesome/'
        }
    },
    lib_css: [
        './node_modules/font-awesome/css/font-awesome.css',
        './node_modules/bootstrap/dist/css/bootstrap.css',
        './node_modules/textillate/assets/animate.css'

    ],
    lib_js: [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootsrap.js',
        './node_modules/textillate/assets/jquery.fittext.js',
        './node_modules/textillate/assets/jquery.lettering.js',
        './node_modules/textillate/jquery.textillate.js'
        ]
};

var path = {
    theme_dir: 'assets/',
    compiled_dir: 'assets/compiled'
};

/*
 * "app_js" task
 @description : Compile .js files from default theme folder and generate a compiled .js file into "web/js" folder
 */
gulp.task('app_js', function () {
    gulp.src(path.theme_dir + '/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(uglify({mangle: true}).on('error', gutil.log))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(path.compiled_dir+'/js'));
});


gulp.task('app_less', function () {
    gulp.src(path.theme_dir + '/less/app.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('app.min.css'))
        .pipe(cssnano({
            'postcss-minify-font-values': true
        }))
        .pipe(autoprefixer({
            browsers: "> 1%, last 2 versions, Safari >= 8"
        }))
        .pipe(sourcemaps.write('maps', {addComment: false}))
        .pipe(gulp.dest(path.compiled_dir+'/css'));
});


gulp.task('vendor_css', function () {
    gulp.src(vars.lib_css)
        .pipe(sourcemaps.init())
        .pipe(rewriteCSS({destination: 'css'}))
        .pipe(concat('vendor.min.css'))
        .pipe(cssnano({
            'postcss-minify-font-values': true
        }))
        .pipe(autoprefixer({
            browsers: "> 1%, last 2 versions, Safari >= 8"
        }))
        .pipe(gulp.dest(path.compiled_dir+'/css'));
});

gulp.task('vendor_js', function () {
    gulp.src(vars.lib_js)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(path.compiled_dir+'/js'));
});

/*
 * "watch" task
 @description : Auto-launch specific task according the saved file
 */
gulp.task('watch', function () {
    gulp.watch(path.theme_dir + '/less/**/*.less', ['app_less']);
    gulp.watch(path.theme_dir + '/js/**/*.js', ['app_js']);
});


/*
 * "gulp" default task
 @description : Launch all tasks
 */
gulp.task('default', shell.task([
    // 'gulp copy_files',
    'gulp vendor_css',
    'gulp vendor_js',
    'gulp app_js',
    'gulp app_less'
]));