import { spawn } from "child_process";

export function execCommand(command:string, args:string[] = []) {
    let child = spawn(command, args);
    //child.stdout.setEncoding('utf8');
    let stdout:string[] = [];
    let stderror:string = '';
    return new Promise((resolve, reject) => {
        child.stdout.on('data', function (data) {
            let str = data.toString();
            str && stdout.push(str);
            console.log(str);
        });

        child.stderr.on('data', function (data) {
            stderror = data.toString();
            console.log('Error: ' + stderror);
        });

        child.on('close', function (code) {
            console.log('child process exited with code ' + code.toString());
            if (stderror.trim().length) {
                return reject({
                    code: 1,
                    stderror: stderror,
                    stdout: stdout.join('')
                });
            }
            resolve({
                code: code,
                stderror: stderror,
                stdout: stdout.join('')
            });
        });
    })
}