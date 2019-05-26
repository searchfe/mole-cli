import * as Handlebars from 'handlebars';
import * as Metalsmith from 'metalsmith';
import { sync } from 'rimraf';
const rm = sync;

export interface Meta {
    projectName: string,
    projectVersion: string,
    projectDescription: string,
    projectAuthor: string
}

export async function generate(metadata, src: string, dest: string) {
    await new Promise((resolve, reject) => {
        Metalsmith(process.cwd())
            .metadata(metadata)
            .clean(false)
            .source(src)
            .destination(dest)
            .use((files, metalsmith, done) => {
                const meta = metalsmith.metadata()
                Object.keys(files).forEach(fileName => {
                    const t = files[fileName].contents.toString()
                    files[fileName].contents = new Buffer(Handlebars.compile(t)(meta))
                })
                done(null, files, metadata);
            }).build(err => {
                err ? reject(err) : resolve()
            });
    })
}