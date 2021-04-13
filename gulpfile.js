// gulpfile文件：告诉gulp需要做哪些事情

let gulp = require("gulp");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
const  babel  =  require('gulp-babel');
const rename = require("gulp-rename");
const connect = require("gulp-connect");

// 配置服务器
gulp.task("server", async function() {
    connect.server({
        root: "./dist",
        host: "10.35.161.253",
        livereload: true
    });
});

// 1、定义一个任务（复制文件的任务）

// gulp.task("copy-html",async function(){
//     gulp.src("*.html").pipe(gulp.dest("./dist"));
// });

// 2、监视

// gulp.task("watchall", async function() {
//     // 1、拷贝
//     gulp.watch("*.html", async function() {
//         gulp.src("*.html")
//             .pipe(gulp.dest("./dist"));
//     })

//     // 2、合并
//     gulp.watch(["js/index.js", "js/goods.js"], async function() {
//         gulp.src(["js/index.js", "js/goods.js"])
//             .pipe(concat("common.js"))
//             .pipe(gulp.dest("./dist/js"));
//     });

//     // 3、合并并压缩
//     gulp.watch(["js/index.js", "js/goods.js"], async function() {
//         gulp.src(["js/index.js", "js/goods.js"])
//             .pipe(concat("common.js"))
//             .pipe(uglify())
//             .pipe(gulp.dest("./dist/js"));
//     });

//     // 4、合并，压缩，并转换
//     gulp.watch(["js/index.js", "js/goods.js"], async function() {
//         gulp.src(["js/index.js", "js/goods.js"])
//             .pipe(concat("common.js"))
//             .pipe(babel({
//                 presets: ['@babel/env']
//             }))
//             .pipe(uglify())
//             .pipe(gulp.dest("./dist/js"));
//     });

//     // 5)合并并且压缩,重新起名字
//     gulp.watch(["js/index.js", "js/goods.js"], async function() {
//         gulp.src(["js/index.js", "js/goods.js"])
//             .pipe(concat("common.js"))
//             .pipe(babel({
//                 presets: ['@babel/env']
//             }))
//             .pipe(gulp.dest("./dist/js"))
//             .pipe(uglify())
//             .pipe(rename("common.min.js"))
//             .pipe(gulp.dest("./dist/js"));
//     })
// });