const gulp = require('gulp');
const path = require('path');
const del = require('del');
const ts = require('gulp-typescript');
const tsProject = ts.createProject(path.resolve(__dirname, '../../config/tscompile.json'));
const less = require('gulp-less');
const amd = require('gulp-amd-wrap').amdHook;
const httpPush = require('gulp-deploy-http-push').httpPush;
const toHtml = require('gulp-parse-to-html').parseToHtml;
const ts2php = require('gulp-ts2php').ts2php;
const projectName = process.env.NODE_PROJECTNAME;

gulp.task('clean', function () {
    return del(['dist/**/*']);
});

gulp.task('css', function () {
    return gulp.src(['src/**/*.less'])
        .pipe(less())
        .pipe(toHtml({
            type: 'style'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('ts', function () {
    return gulp.src(['src/static/**/*.ts'], {
        base: './src'
    })
        .pipe(tsProject())
        .pipe(amd({
            baseUrl: path.resolve('./src/static/script/'),
            prefix: '@molecule/' + projectName,
            // 不参与amd-hook分析的文件
            exlude: ['/dist/**']
        }))
        .pipe(toHtml({
            type: 'script'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('tpl', function () {
    return gulp.src(['src/**/*.tpl'])
        .pipe(gulp.dest('dist'));
});

gulp.task('php', function () {
    return gulp.src(['src/index.ts'])
        .pipe(ts2php({
            getNamespace: () => 'molecules\\' + projectName,
            compilerOptions: {
                "target": "es6",
                "module": "CommonJS",
                "sourceMap": true,
                "outDir": "dist",
                "declaration": true,
                "allowSyntheticDefaultImports": true,
                "resolveJsonModule": true,
                "strict": true,
                "suppressImplicitAnyIndexErrors": true
            },
            modules: {
                '@baidu/molecule': {
                    required: true
                }
            }
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('deploy', function () {
    // 测试环境的url
    const HOST = require('./dev.config').receiver;
    return gulp.src(['dist/**'])
        .pipe(httpPush([
            {
                host: HOST,
                match: '/**/*',
                to: '/home/work/odp/template/molecules/' + projectName
            }
        ]));
});

gulp.task('watch', function () {
    gulp.watch('./src/**', gulp.series('default', 'deploy'));
});

gulp.task('default', gulp.series('clean', gulp.parallel('css', 'ts', 'tpl', 'php')));
