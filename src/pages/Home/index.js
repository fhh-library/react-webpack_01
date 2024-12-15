/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-11-29 20:26:57
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 18:01:49
 * @FilePath: \l\architecture\02\src\APP.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import { useAppDispatch, useAppSelector } from '@store';
import {
  increment,
  decrement,
  byPayload,
} from '@/store/modules/layoutSlice';
import { getMovieData, } from '@/store/modules/appSlice';
// import Todo from './assets/svg/todo.svg';
// import develop02 from "@/assets/img/develop02.png";
// import develop04 from "@/assets/img/develop04.png";.
// import style from './app.less'

function Home() {
  const { list } = useAppSelector(store => store.app)
  // 通过useSelector直接拿到store中定义的movie
  const dispatch = useAppDispatch()
  return (
    <div>
      <div onClick={() => dispatch(increment())}>increment</div>
      <div onClick={() => dispatch(decrement())}>decrement</div>
      <div onClick={() => dispatch(byPayload({ vaule: 9999 }))}>byPayload</div>
      <div onClick={() => dispatch(getMovieData({
        channel_id: '1',
        data_type: '1',
        mode: 24,
        page_id: 1,
        ret_num: 48
      }))}>getMovieData</div>
      <div style={{ height: '500px', overflow: "auto" }}>
        <ul>
          {list.map((item, index) => {
            return <li key={index}> {item.name}</li>
          })}
        </ul>
      </div>
    </div>
  );
}
export default Home;
