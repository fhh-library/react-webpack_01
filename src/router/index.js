/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 20:52:08
 * @LastEditors: fuyiwei fuyiwei@croot.com
 * @LastEditTime: 2024-12-13 17:36:56
 * @FilePath: \l\architecture\02\src\router\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { LazyLoading } from '@components'
import { routesMap } from "./baseRouterMap";

// 路由入口
// 第一种方法
// const transformRoutes = (routeList) => {
//   return (
//     <>
//       {routeList.map((route) => {
//         return route.children && route.children.length ? (
//           <Route key={route.path} path={route.path} element={route.element}>
//             {transformRoutes(route.children)}
//           </Route>
//         ) : (
//           <Route
//             key={route.path}
//             path={route.path}
//             element={route.element}
//           />
//         );
//       })}
//     </>
//   );
// };
// export const BrowserRoutersConfig = () => {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<div>loading...</div>}>
//         <Routes>{transformRoutes(routesMap)}</Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// 第二种方法： useRoutes使用, BrowserRouter需要放到APP中
export const RoutersConfig = () => {
  const routerTab = useRoutes(routesMap);
  return (
      <Suspense fallback={LazyLoading}>
        {routerTab}
      </Suspense>
  );
};


