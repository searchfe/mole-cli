import * as path from 'path';
const { spawn } = require('child_process');
const gulp = spawn('gulp');

export async function run(option, args, program) {
    gulp.stdout.on('data', function (data) {
        console.log(data.toString());
    });

    gulp.stderr.on('data', function (data) {
        console.log('Error: ' + data.toString());
    });

    gulp.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
    });
}
