module.exports = {
    commands: {
        init: {
            command: 'init',
            desc: '初始化ala项目',
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
                }
            ]
        }
    }
}