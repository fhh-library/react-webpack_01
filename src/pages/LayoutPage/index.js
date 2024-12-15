/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 20:26:57
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 16:29:35
 * @FilePath: \l\architecture\02\src\APP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '@store'

function LayoutPage() {
  const { totals } = useAppSelector(store => store.app)
  // 通过useSelector直接拿到store中定义的movie
  const { value } = useAppSelector(store => store.layout)
  // 通过useDispatch 派发事件
  return (
    <div>LayoutPage: {value}-{totals} <Outlet /></div>
  );
}
export default LayoutPage;
