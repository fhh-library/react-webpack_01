/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 15:11:36
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 15:59:42
 * @FilePath: \l\architecture\01\build\webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 在开发环境我们希望css嵌入在style标签里面,方便样式热替换,但打包时我们希望把css单独抽离出来,方便配置缓存策略。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

module.exports = {
  entry: path.join(__dirname, '../src/index.js'), // 入口文件
  output: {
    // filename: 'static/js/[name].js', // 每个输出js的名称
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  resolve: {
    // extebsions 是webpack的resolve解析配置下的选项，在==引入模块时不带入文件后缀==的时候，会在该配置数组中依次添加后缀查找文件。因为ts不支持引入以.ts、.tsx为后缀的文件，所以要在extensions中要配置，在很多第三方库中里面很多引入js文件且没有带后缀，所以也要配置下js。
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
    alias: {
      '@': path.join(__dirname, '../src'),
      '@router': path.join(__dirname, '../src/router'),
      '@pages': path.join(__dirname, '../src/pages'),
      '@components': path.join(__dirname, '../src/components'),
      '@utils': path.join(__dirname, '../src/utils'),
      '@assets': path.join(__dirname, '../src/assets'),
      '@request': path.join(__dirname, '../src/request'),
      '@store': path.join(__dirname, '../src/store'),
    },
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      favicon: path.resolve(__dirname, '../public/favicon.ico'), // favicon图标
      inject: true, // 自动注入静态资源
    }),
  ],
  module: {
    rules: [
      // webpack默认只能识别js文件，不能识别jsx语法，需要配置loader的预设@babel/preset-react来识别jsx语法。
      // babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5（上面已经安装过）
      // @babel/corer: babel 编译的核心包
      // @babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
      // core-js: 使用低版本js语法模拟高版本的库,也就是垫片
      // {
      //   test: /\.(jsx|js)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       cacheDirectory: true,
      //       presets: [
      //         // [
      //         //   "@babel/preset-env",
      //           // {
      //           //   // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
      //           //   // "targets": {
      //           //   //  "chrome": 35,
      //           //   //  "ie": 9
      //           //   // },
      //           //   "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
      //           //   "corejs": 3, // 配置使用core-js低版本
      //           // }
      //         // ],
      //         '@babel/preset-react',
      //         "@babel/preset-env",
      //         // '@babel/preset-typescript'
      //       ]
      //       // presets: [
      //       //   ['@babel/preset-react', {
      //       //     runtime: 'automatic',
      //       //   }],
      //       //   ['@babel/preset-env'],
      //       // ],
      //     },
      //   },
      // },
      // webpack默认只能识别js文件，不能识别jsx等语法，需要配置loader的预设@babel/**来识别别的语法。
      // 从以上注释的配置迁移到 babel.config.js 然后，加载对应的 babel.config.js 中的文件
      {
        // 只对项目src文件的js|mjs|jsx|ts|tsx进行loader解析
        include: [path.resolve(__dirname, '../src')],
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: 'babel-loader'
      },
      // loader执行顺序是从右往左,从下往上的,匹配到css文件后先用css-loader解析css, 最后借助style-loader把css插入到头部style标签中。
      // 在rules中添加less文件解析,遇到less文件,使用less-loader解析为css,再进行css解析流程
      // style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中(在运行时做的)
      // css-loader:  解析css文件代码
      // less-loader: 解析less文件代码,把less编译为css
      // less: less核心依赖
      // {
      //   // 只对项目src文件的css|less进行loader解析
      //   include: [path.resolve(__dirname, '../src')],
      //   test: /.(css|less)$/, //匹配 css less 文件
      //   use: ['style-loader', 'css-loader', 'less-loader']
      // },
      // 拆分上面配置的less和css, 避免让less-loader再去解析css文件,精准解析，提供解析效率
      {
        test: /.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          // 'style-loader',
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          // 'postcss-loader'
        ]
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          // 'style-loader',
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用style-looader,打包模式抽离css
          'css-loader',
          // 'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
    ]
  },
  // 缓存的存储位置在node_modules/.cache/webpack,里面又区分了development和production缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
