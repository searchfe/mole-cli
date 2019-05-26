module.exports = {
  getNamespace: () => 'molecules\test',
  compilerOptions: require('./tsconfig.json').compilerOptions,
  modules: {
    '@baidu/molecule': {
      required: true
    }
  }
}
