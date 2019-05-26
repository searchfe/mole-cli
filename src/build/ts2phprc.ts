export const config = {
    getNamespace: () => 'molecules\\toptip',
    compilerOptions: {
        "target": "es6",
        "module": "CommonJS",
        "sourceMap": true,
        "outDir": "dist",
        "declaration": true,
        "allowSyntheticDefaultImports": true,
        "resolveJsonModule": true,
        "strict": true,
        "suppressImplicitAnyIndexErrors": true
    },
    modules: {
        '@baidu/molecule': {
            required: true
        }
    }
}