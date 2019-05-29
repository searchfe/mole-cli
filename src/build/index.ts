import * as path from 'path';
import * as fs from "fs";
import { spawn } from "child_process";
import * as gulp from "mole-gulp";
import { execCommand } from '../lib/util';

export async function run(option, args, program) {
    let commandArgs:string[] = [];
    // 读取build命令目录下的package.json的name作为编译时的projectname
    const packagePath = path.resolve('./package.json');
    if (fs.existsSync(packagePath)) {
        process.env.NODE_PROJECTNAME = require(packagePath).name;
        await gulp({
            'gulpfile': path.resolve(__dirname, './gulpfile.js'),
            'cwd': path.resolve('./')
        })
    } else {
        throw new Error("cannot find package.json");
    }
}
