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
    // 端口不生效？
    // devServer: whenDev(() => ({
    //   port: 8000
    // })),
    // configure: (webpackConfig, { env, paths }) => {
    //   // webpackConfig.resolve.extensions.push('.ts', '.tsx', 'js', '.jsx')
    //   return webpackConfig
    // }
    configure(webpackConfig, { env, paths }) {
      // 生产环境下生效
      if (env === 'production') {
        if (webpackConfig.optimization === null) {
          webpackConfig.optimization = {}
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          // 缓存组
          // 第一次加载的main包中antd、react-dom包占比较大，且为第三方包不常变动，所以可以分离出来单独打包，利用缓存，之后加载时直接从缓存中加载，提升加载速度
          cacheGroups: {
            antd: {
              name: 'antd',
              test: /[\\/]node_modules[\\/](antd)[\\/]/,
              priority: 100,
            },
            reactDom: {
              name: 'reactDom',
              test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
              priority: 99,
            },
            vendors: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 98,
            }
          }
        }
      }
      return webpackConfig
    }
  }
}
