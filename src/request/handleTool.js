/*
 * @Author: fuyiwei 1157704750@qq.com
 * @Date: 2024-12-14 23:54:28
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 03:28:47
 * @FilePath: \github\react-webpack_01\src\utils\handle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { isDev } from '@utils';

export const handleRequestHeader = (config) => {
  config['xxxx'] = 'xxx'
  return config
}

export const handleAuth = (config) => {
  config.headers['token'] = localStorage.getItem('token') || 'token' || ''
  return config
}

export const handleAuthError = (code) => {
  const authErrMap = {
    '10031': '登录失效，需要重新登录', // token 失效
    '10032': '您太久没登录，请重新登录~', // token 过期
    '10033': '账户未绑定角色，请联系管理员绑定角色',
    '10034': '该用户未注册，请联系管理员注册用户',
    '10035': 'code 无法获取对应第三方平台用户',
    '10036': '该账户未关联员工，请联系管理员做关联',
    '10037': '账号已无效',
    '10038': '账号未找到',
  }

  if (authErrMap.hasOwnProperty(code)) {
    // message.error(authErrMap[errno])
    // 授权错误，登出账户
    // logout()
    return false
  }

  return true
}

export const handleGeneralError = (code, errmsg) => {
  if (code !== '0') {
    // meessage.error(err.errmsg)
    return false
  }

  return true
}

/**
 * 对api返回的code进行判断
 * @returns
 */
export function handleNetwork(response) {
  const code = response?.status || error.code;
  if ((code >= 200 && code < 300) || code === 304) {
    // 如果http状态码正常，则直接返回数据
    handleAuthError(response.data.code)
    handleGeneralError(response.data.code, response.data.errmsg)
    return response.data;
  } else {
    let errMessage = '未知错误'
    switch (code) {
      case 400:
        errMessage = '错误的请求'
        break
      case 401:
        errMessage = '未授权，请重新登录'
        break
      case 403:
        errMessage = '拒绝访问'
        break
      case 404:
        errMessage = '请求错误,未找到该资源'
        break
      case 405:
        errMessage = '请求方法未允许'
        break
      case 408:
        errMessage = '请求超时'
        break
      case 500:
        errMessage = '服务器端出错'
        break
      case 501:
        errMessage = '网络未实现'
        break
      case 502:
        errMessage = '网络错误'
        break
      case 503:
        errMessage = '服务不可用'
        break
      case 504:
        errMessage = '网络超时'
        break
      case 505:
        errMessage = 'http版本不支持该请求'
        break
      default:
        errMessage = `其他连接错误 --${error.response.status}`
    }
    return {
      code,
      errMessage
    }
  }
}

// 匹配接口前缀
export function autoMatch(prefix) {
  let baseUrl = '';
  if (isDev) {
    // 开发环境 通过proxy配置转发请求；
    baseUrl = `/${prefix || ''}`;
  } else {
    // 生产环境 根据实际配置 根据 prefix 匹配url;
    // 配置来源 根据实际应用场景更改配置。(1.从全局读取；2.线上配置中心读取)
    // switch (prefix) {
    //   case 'baidu':
    //     baseUrl = window.LOCAL_CONFIG.baidu;
    //     break;
    //   case 'alipay':
    //     baseUrl = window.LOCAL_CONFIG.alipay;
    //     break;
    //   default:
    //     baseUrl = window.LOCAL_CONFIG.default;
    // }
  }
  return baseUrl;
}

export function isHandleErrorFn(error = {}, options, isTry = false) {
  let errMsg = '请求处理失败！';
  if (options.isHandleError) { // 自定义参数，是否允许全局提示错误信息
    errMsg = isTry ? error?.errMessage : error?.errMessage || '请求处理失败！';
    // message.error(errMsg || '请求处理失败！')
    console.log(errMsg)
  }

}