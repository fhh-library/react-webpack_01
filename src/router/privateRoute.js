/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-12-13 14:11:30
 * @LastEditors: fuyiwei fuyiwei@croot.com
 * @LastEditTime: 2024-12-13 16:25:18
 * @FilePath: \l\architecture\02\src\router\privateRoute.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from "react";
import { getToken } from "@utils";
import { useNavigate, useL } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigator = useNavigate();
  console.log('经过了privateRoute');
  // // 对比时间戳是否超过48小时
  // function isPast48Hours(timestamp) {
  //   // 获取当前时间戳
  //   const currentTimestamp = Math.floor(Date.now() / 1000);

  //   // 计算时间差，单位为秒
  //   const timeDifference = currentTimestamp - timestamp;

  //   // 定义48小时的秒数
  //   const hours48InSeconds = 48 * 60 * 60;

  //   // 判断时间差是否超过48小时
  //   return timeDifference > hours48InSeconds;
  // }

  // useEffect(() => {
  //   try {
  //     const token = getToken();
  //     const tokenObj = JSON.parse(token);
  //     if (tokenObj === null || isPast48Hours(tokenObj.expired)) {
  //       console.log(object)("token过期,请重新登录");
  //       navigator(`/login`);
  //     }
  //   } catch (error) {
  //     console.log(object)("token过期,请重新登录");
  //     navigator(`/login`);
  //   }
  // }, []);
  return <>{children}</>;
};

export default PrivateRoute;