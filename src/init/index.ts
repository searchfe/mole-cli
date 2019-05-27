import * as ora from "ora";
import * as path from 'path';
import * as fs from 'fs';
import { sync } from 'rimraf';
import * as glob from 'glob';
import { getRepo } from '../lib/download';
import { generate, Meta } from '../lib/generator';
import * as inquirer from 'inquirer';

export async function run(option, args, program) {
    let template = args[0];
    let projectName = args[0];
    if (!projectName) {
        program.help();
        return
    }

    const list = glob.sync('*');
    let rootName = path.basename(process.cwd());
    if (list.length) {
        if (list.filter(name => {
            const fileName = path.resolve(process.cwd(), path.join('.', name))
            const isDir = fs.statSync(fileName).isDirectory()
            return name.indexOf(projectName) !== -1 && isDir
        }).length !== 0) {
            console.log(`项目${projectName}已经存在`)
            let answers: CoverAnswers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'coverDir',
                    message: `项目${projectName}已经存在，是否覆盖该文件夹`,
                    default: true
                }
            ])
            if (answers.coverDir === true) {
                sync(projectName);
            } else {
                return;
            }
        }
        rootName = projectName
    } else if (rootName === projectName) {
        let buildAnswer: BuildAnswers = await inquirer.prompt([
            {
                name: 'buildInCurrent',
                message: '当前目录为空，且目录名称和项目名称相同，是否直接在当前目录下创建新项目？',
                type: 'confirm',
                default: true
            }
        ])
        rootName = buildAnswer.buildInCurrent ? '.' : projectName;
    } else {
        rootName = projectName
    }

    await go();

    async function go() {
        const repoUrl = 'molecule-templates/smarty';
        let initPath = path.resolve(rootName);
        const spinner = ora('downloading template').start();
        await getRepo(repoUrl, initPath);
        spinner.stop();
        const questions = [
            {
                name: 'projectName',
                message: '项目的名称',
                default: projectName
            }, {
                name: 'projectVersion',
                message: '项目的版本号',
                default: '1.0.0'
            }, {
                name: 'projectDescription',
                message: '项目的简介',
                default: `A project named ${projectName}`
            }, {
                name: 'projectAuthor',
                message: '项目作者'
            }
        ];
        let projectConfig = await inquirer.prompt(questions);
        projectConfig['Uppername'] = projectConfig['projectName'].replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        await generate(projectConfig, initPath, initPath);
    }
}

interface CoverAnswers {
    coverDir: boolean
}

interface BuildAnswers {
    buildInCurrent: boolean
}