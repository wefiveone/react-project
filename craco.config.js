const path = require('path')

const resolve = (pathname) => path.resolve(__dirname, pathname)

module.exports = {
  // webpack
  webpack: {
    // 配置别名
    alias: {
      '@': resolve('src'),
      components: resolve('src/components')
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.extensions.push('.ts', '.tsx', 'js', '.jsx')
      return webpackConfig
    }
  }
}
