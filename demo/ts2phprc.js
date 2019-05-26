module.exports = {
  getNamespace: () => 'molecules\demo',
  compilerOptions: require('./tsconfig.json').compilerOptions,
  modules: {
    '@baidu/molecule': {
      required: true
    }
  }
}
