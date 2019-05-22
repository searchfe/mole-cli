import * as ora from "ora";
import * as download from "download-git-repo";
import { resolve } from 'path';

export async function init(option, args) {
    const spinner = ora('downloading template').start();

    let tmp = resolve('./dist');

    download('vuejs-templates/webpack', tmp, { clone: false }, err => {
        spinner.stop()
    })

    
}