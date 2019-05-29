import { CLIEngine } from "eslint";
const eslConfig = require("../../config/eslintrc");

export async function run(option, args, program) {
    eslConfig.fix = option.fix ? true : false;
    var cli = new CLIEngine(eslConfig);

    const report = cli.executeOnFiles(['src/**/*.ts','*.js','test/**/*.ts']);
    const errorReport = CLIEngine.getErrorResults(report.results)
    var formatter = cli.getFormatter();
    console.log(formatter(errorReport));
    CLIEngine.outputFixes(report);
}