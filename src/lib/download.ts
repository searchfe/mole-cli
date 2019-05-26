import * as download from "download-git-repo"

export async function getRepo(url: string, target:string) {
    await new Promise((resolve, reject) => {
        download('molecule-templates/smarty', target, { clone: false }, err => {
            if (err) {
                reject(err)
            } else {
                resolve(target)
            }
        });
    })
}