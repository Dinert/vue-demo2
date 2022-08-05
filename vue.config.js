const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
          '@': resolve('src')
      }
  },
  },

  devServer: {
    proxy: {
      '/export': {
        target: `http://192.168.2.238:9231`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/export']: ''
        }
      },
      '/zwjd-system': {
        target: `http://develop.iot-cas.com:8081/zwjd-system`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + '/zwjd-system']: ''
        }
      },
    }
  }
})
