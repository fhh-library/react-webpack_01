/*
 * @Author: fuyiwei 1157704750@qq.com
 * @Date: 2024-12-14 16:13:16
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-14 19:52:00
 * @FilePath: \github\react-webpack_01\src\router\baseRouterMap.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import { buildRoutes } from './buildRoutes';

// import LoginPage from "@pages/LoginPage";
// import LayoutPage from "@pages/LayoutPage";
// import NotFound from "@pages/NotFound";

// const LoginPage = lazy(() => import("@pages/LoginPage"));
// const LayoutPage = lazy(() => import("@pages/LayoutPage"));
// const NotFound = lazy(() => import("@pages/NotFound"));

// 动态路由  规则性强
// const modiules = require.context('../pages', true, /.(js|jsx)$/);
// const routesConfig = modiules.keys().map((key) => {
//   const component = modiules(key);
//   return {
//     path: key.replace('./', '/').replace('/index.js', '').replace('/index.jsx', ''),
//     filePath: key,
//     elementName: component.default.name,
//     element: lazy( component),
//   }
// });
// console.log(routesConfig, 'modiules')
// console.dir(modiules, 'modiules')
// console.log(modiules, 'modiules')
// console.log(modiules.keys(), 'modiules.keys')
// console.log(modiules.keys().map((key) => modiules(key).default.name), 'modiules.keys.map.default')

// 正常注册路由表
// 主路由
const mainRoutes = [
  {
    path: "/home",
    // permissions: ["add", "edit"], // 权限
    element: () => <div>HOME</div>,
  },
];
// 全局路径
const globalRoutes = [
  {
    path: "/", // 路径
    element: lazy(() => import("@pages/LayoutPage")),
    // element: <LayoutPage />,
    // permissions: ["add"], // 权限
    children: mainRoutes
  },
  {
    path: "/404",
    element: lazy(() => import('@pages/NotFound')),
    // element: <NotFound />,
    // middlewares: [
    //   lazy(() => import('./privateRoute')),
    //   lazy(() => import('./privateRoute'))
    // ],
  },
  {
    path: "/login",
    element: lazy(() => import('@pages/LoginPage'))
    // element: <LoginPage />,
  },
  //其他没有被注册过的路径统一重定位到login
  {
    path: "*",
    element: () => <Navigate to="/login" />,
  },
];

// export let routesMap = globalRoutes;
export let routesMap = buildRoutes(globalRoutes);