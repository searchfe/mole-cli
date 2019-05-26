module.exports = {
    commands: {
        init: {
            command: 'init <模块名>',
            desc: '初始化molecule项目',
            options: [
                {
                    param: '-f, --force',
                    desc: '强制重新初始化'
                }
            ]
        },
        build: {
            command: 'build',
            desc: '构建项目',
            options: [
                {
                    param: '-n, --no-compress',
                    desc: '不压缩， 【默认】压缩'
                }, {
                    param: '-w, --watch',
                    desc: '启用watch服务'
                }, {
                    param: '-f, --gulpfile [file]',
                    desc: '指定gulpfile路径'
                }
            ]
        }
    }
}