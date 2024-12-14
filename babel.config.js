// 此时再打包就会把语法转换为对应浏览器兼容的语法了,为了避免webpack配置文件过于庞大,可以把babel-loader的配置抽离出来, 
// 在项目的根目录新建babel.config.js文件,使用js作为配置文件,是因为可以访问到process.env.NODE_ENV环境变量来区分是开发还是打包模式。
// webpack默认只能识别js文件，不能识别jsx语法，需要配置loader的预设@babel/preset-react来识别jsx语法。
// babel-loader: 使用 babel 加载最新js代码并将其转换为 ES5（上面已经安装过）
// @babel/corer: babel 编译的核心包
// @babel/preset-env: babel 编译的预设,可以转换目前最新的js标准语法
// core-js: 使用低版本js语法模拟高版本的库,也就是垫片
const isDEV = process.env.NODE_ENV === 'development'; // 是否是开发模式
module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  "presets": [
    // [
    //   "@babel/preset-env",
    //   // {
    //   //   // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
    //   //   // "targets": {
    //   //   //  "chrome": 35,
    //   //   //  "ie": 9
    //   //   // },
    //   //   "useBuiltIns": "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
    //   //   "corejs": 3 // 配置使用core-js使用的版本
    //   // }
    // ],
    "@babel/preset-react",
    "@babel/preset-env",
  ],
  "plugins": [
    // 上面Class组件代码中使用了装饰器,目前js标准语法是不支持的,现在运行或者打包会报错,不识别装饰器语法,需要借助babel-loader插件：
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    // 为babel-loader配置react-refesh刷新插件
    isDEV && require.resolve('react-refresh/babel'), // 如果是开发模式,就启动react热更新插件
  ].filter(Boolean) // 过滤空值
}