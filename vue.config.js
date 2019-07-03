const path = require('path')
const webpack = require('webpack')
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

console.log('process.env.NODE_ENV:' + process.env.NODE_ENV)
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const resolve = dir => path.resolve(__dirname, dir)

// vue.config.js
module.exports = {
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = []
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      )
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )

      plugins.push(
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      )

      config.plugins = [...config.plugins, ...plugins]
    }
    // 配置 externals
    // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
    // 前一个key是引用第三方 value是第三方暴露出来的方法名
    // config.externals = {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'vuex': 'Vuex',
    //   'axios': 'axios',
    //   'moment': 'moment',
    //   // 'ant-design-vue': 'antd',
    //   'viser-vue': 'ViserVue'
    //
    // }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('@docs', resolve('docs'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    /* svgRule.oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
    */
    // 打包分析
    // if (IS_PROD) {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(BundleAnalyzerPlugin)
    // }

    config.module.rule('compile')
      .test(/\.js$/)
      .include
      .add(resolve('node_modules/resize-detector'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        // presets: [
        //   '@vue/app',
        //   [
        //     '@babel/preset-env',
        //     {
        //       'useBuiltIns': 'entry'
        //     }
        //   ]
        // ]
      })
    // 格式化markdown
    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  },

  css: {
    // css预设器配置项
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#0396ff', // 全局主色color  #0396ff 蓝色 #F5222D红色
          'link-color': '#0396ff', // 链接色
          'success-color': '#4dbf13', // 成功色
          'warning-color': '#faaf19', // 警告色
          'error-color': '#F5222D', // 错误色
          'font-size-base': '14px', // 主字号
          'heading-color': 'rgba(0, 0, 0, .65)', // 标题色
          'text-color': 'rgba(0, 0, 0, .85)', // 主文本色
          'text-color-secondary': 'rgba(0, 0, 0, .65)', // 次文本色
          'disabled-color': 'rgba(0, 0, 0, .35)', // 失效色
          'border-radius-base': '4px', // 组件/浮层圆角
          'border-color-base': '#d4d4d4', // 边框色
          'box-shadow-base': '0 2px 8px rgba(0, 0, 0, .45)', // 浮层阴影
          'shadow-color': 'rgba(0, 0, 0, .20)',
          'layout-body-background': '#e8e8e8',
          'font-family': 'Microsoft YaHei,Arial',
          'card-shadow': '0 2px 8px rgba(0, 0, 0, 0.12)'
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // development server port 8000
    port: 8080,
    disableHostCheck: true
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     pathRewrite: {
    //       '^/api': '/api'
    //     }
    //   }
    //
    // }
    // proxy: {
    //   '/api': {
    //     target: 'https://www.easy-mock.com/mock/5cd8e17dcf055a12fa434fb9/api/',
    //     ws: false,
    //     changeOrigin: true
    //   }
    // }
  },

  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
  productionSourceMap: false
}
