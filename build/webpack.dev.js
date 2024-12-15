/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 20:26:56
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 18:04:13
 * @FilePath: \l\architecture\02\build\webpack.dev.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config.js')

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  // devtool的命名规则为 ^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$
  // inline      代码内通过 dataUrl 形式引入 SourceMap
  // hidden      生成 SourceMap 文件,但不使用
  // eval        eval(...) 形式执行代码,通过 dataUrl 形式引入 SourceMap
  // nosources   不生成 SourceMap
  // cheap       只需要定位到行信息,不需要列信息
  // module      展示源代码中的错误位置
  // 本地开发首次打包慢点没关系,因为 eval 缓存的原因, 热更新会很快
  // 开发中,我们每行代码不会写的太长,只需要定位到行就行,所以加上 cheap
  // 我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module
  devtool: 'eval-cheap-module-source-map', // 开发环境推荐使用eval-cheap-module-source-map
  devServer: {
    port: 4090, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    open: true, // 自动打开浏览器
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
      {
        context: ['/pcw'],
        target: 'https://pcw-api.iqiyi.com',
        pathRewrite: { '^/pcw': '' },
      },
    ],
  },
  plugins: [
    // 在开发模式下修改css和less文件，页面样式可以在不刷新浏览器的情况实时生效，因为此时样式都在style标签里面，style-loader做了替换样式的热替换功能。但是修改App.tsx,浏览器会自动刷新后再显示修改后的内容,但我们想要的不是刷新浏览器,而是在不需要刷新浏览器的前提下模块热更新,并且能够保留react组件的状态。
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ]
})