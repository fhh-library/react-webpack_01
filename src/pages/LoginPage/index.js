/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 20:26:57
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 12:31:49
 * @FilePath: \l\architecture\02\src\APP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import request from '@request'

function LoginPage() {
  const navigator = useNavigate();
  console.log('LoginPage')
  return (
    <div onClick={() => {
      // navigator("/home")
      request({
        url: '/aaa',
        method: 'post',
        data: { username: 'admin', password: '123456' }
      }).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      });
      request({
        url: '/bbbb',
        method: 'get',
        isHandleError: false,
        params: { username: 'admin', password: '123456' }
      }).then((result) => {
        console.log(result)
      }).catch((err) => {
        console.log(err)
      });
    }}>LoginPage</div>
  );
}
export default LoginPage;
