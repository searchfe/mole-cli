module.exports = {
    commands: {
        init: {
            command: 'init <模块名>',
            desc: '初始化molecule项目',
            options: []
        },
        build: {
            command: 'build [task名...]',
            desc: '构建项目',
            options: [
                {
                    param: '--cwd [path]',
                    desc: '指定一个新的cwd (当前工作目录)'
                }, {
                    param: '-T, --tasks',
                    desc: '查看gulp task'
                }, {
                    param: '-f, --gulpfile [file]',
                    desc: '指定gulpfile路径'
                }
            ]
        },
        lint: {
            command: 'lint',
            desc: '检查代码规范',
            options: [
                {
                    param: '--fix',
                    desc: '自动修复lint问题'
                }
            ]
        }
    }
}