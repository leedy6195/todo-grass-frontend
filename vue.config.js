// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080'
      },
      '/images': {
        target: 'http://localhost:8080'
      }
    }
  }
}