import * as request from "request-promise";
import * as semver from "semver";
import chalk from "chalk";
const packageConfig = require('../../package.json');

export async function check() {

    let options = {
        url: 'https://registry.npmjs.org/mole-cli',
        timeout: 1000
    };

    try {
        var result = await request(options);
        const latestVersion = JSON.parse(result)['dist-tags'].latest;
        const localVersion = packageConfig.version
        if (semver.lt(localVersion, latestVersion)) {
            console.log(chalk.yellow('有新版本的mole-cli可以升级呢~'))
            console.log()
            console.log('  latest:    ' + chalk.green(latestVersion))
            console.log('  installed: ' + chalk.red(localVersion))
            console.log()
            console.log(chalk.yellow('快执行 `npm install mole-cli -g` 升级你的cli吧'))
            return false;
        } else {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
}