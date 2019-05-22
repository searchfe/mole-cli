#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const config = require('./config');

let {commands} = config;

// 定义当前版本
program
    .version(require('../package').version);

// 定义使用方法
program
    .usage('<command> [options] <args ...>');

let argv = process.argv;

// 读取config绑定命令
if (commands) {
    if (argv[2] && !commands[argv[2]] && argv[2].indexOf('-') !== 0) {
        console.log('不存在该命令：mole ' + argv[2]);
        program.help();
    }
    for (let commandName of Object.keys(commands)) {
        let cmd = commands[commandName];
        let chain = program.command(cmd.command)
            .description(cmd.desc || 'Mole command ' + commandName)
            .action(async () => {
                let args = program.args;
                let option = args[args.length - 1];
                // 把args中多余的command对象删去
                args = args.slice(0, -1);

                // 检查cli版本是否需要更新
                if (commandName !== 'upgrade') {
                    // await upgrade.check();
                }
                await require('../dist/' + commandName).init(option, args);
            })
        
        // 为命令配置options
        for (let optName of Object.keys(cmd.options)) {
            let opt = cmd.options[optName];
            chain
                .option(opt.param, opt.desc);
        }
    }
}

// 运行命令
program
    .parse(argv);