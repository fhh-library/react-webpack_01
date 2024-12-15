/*
 * @Author: fuyiwei 1157704750@qq.com
 * @Date: 2024-12-14 22:18:23
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 12:07:04
 * @FilePath: \github\react-webpack_01\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'; // 引入axios
import { handleAuthError, handleGeneralError, handleNetwork, handleAuth, handleRequestHeader, autoMatch, isHandleErrorFn } from './handleTool'; // 处理函数

// 创建axios实例
const instance = axios.create({
  // baseURL: process.env.BASE_URL,
  timeout: 30000, // 请求超时时间
})

// 实例添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做处理...
  config = handleRequestHeader(config)
  config = handleAuth(config)

  return Promise.resolve(config);
}, function (error) {
  // 对请求错误做处理...
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(handleNetwork(response));;
  },
  (error) => {
    if (error.response) {
      return Promise.reject(handleNetwork(error.response));
    } else if (
      error.code == "ECONNABORTED" &&
      error.message.indexOf("timeout") != -1
    ) {
      return Promise.reject({ code: error.code, errMessage: "网络请求超时" });
    } else {
      return Promise.reject({ code: error.code, errMessage: "无法连接到服务器！" });
    }
  }
)

const request = async function (opt) {
  const options = Object.assign({
    method: 'get',
    isHandleError: true // 是否统一处理接口失败(提示)
  }, opt);
  options.baseURL = autoMatch(options.prefix);
  return new Promise((resolve, reject) => {
    instance(options).then(res => {
      resolve(res)
    }).catch(err => {
      // if(isBoolean(err))
      isHandleErrorFn(err, options);
      reject(err);
    })
  })
  // try {
  //   // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
  //   const res = await instance(options);
  //   if (!res?.success) isHandleErrorFn(res, options, true);
  //   return res;
  // } catch (err) {
  //   console.log(err)
  //   // isHandleErrorFn(err, options);
  //   return err;
  // }
}

export default request;