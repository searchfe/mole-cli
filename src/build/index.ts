import * as path from 'path';
const { spawn } = require('child_process');

export async function run(option, args, program) {
    let commandArgs:string[] = [];
    if (option.watch) {
        commandArgs.push('watch');
    }
    let gulp = spawn('gulp', commandArgs);
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
