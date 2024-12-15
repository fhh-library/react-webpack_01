/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-12-13 15:56:47
 * @LastEditors: fuyiwei fuyiwei@croot.com
 * @LastEditTime: 2024-12-13 18:04:33
 * @FilePath: \l\architecture\02\src\router\buildRoutes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { LazyImport } from '@components'

export const buildRoutes = (routes) => {
  return routes.map((item) => {
    const { element, middlewares, children, ...restProps } = item

    // 要返回的路由对象
    let routeObject = {
      ...restProps
    }

    // 递归构建子路由
    if (children) {
      routeObject.children = buildRoutes(children)
    }

    // 异步加载组件
    routeObject.element = <LazyImport lazyComponent={element} />

    // 中间件处理
    // if (middlewares && middlewares.length > 0) {
    //   // 从后往前遍历中间件，这样中间件的执行顺序就是从前往后
    //   // 例如：[A, B, C] => A(B(C()))
    //   let lazyComponents = routeObject.element;
    //   // <Middleware>{routeObject.element}</Middleware>
    //   for (let i = middlewares.length - 1; i >= 0; i--) {
    //     const Middleware = middlewares[i];
    //     lazyComponents = <Middleware>{lazyComponents}</Middleware>
    //     // console.log(middleware, routeObject)
    //     // routeObject = {
    //     //   ...routeObject,
    //     //   element: <LazyImport lazyComponent={middleware} />,
    //     //   // children: [routeObject],
    //     // }
    //   }
    //   routeObject.element = <LazyImport lazyComponent={() => lazyComponents} />;
    //   // <LazyImport lazyComponent={lazyComponents} />
    // }

    // 返回路由对象
    return routeObject
  })
}
