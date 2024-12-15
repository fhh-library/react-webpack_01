/*
 * @Author: fuyiwei 1157704750@qq.com
 * @Date: 2024-12-15 15:34:11
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 18:05:10
 * @FilePath: \github\react-webpack_01\src\store\modules\appSlice.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

// 引入其他 slice 生成的 action
import { increment } from './layoutSlice';
import apiMap from '@request/apiMap';

const initialState = {
  list: [],
  totals: 0,
}

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
export const getMovieData = createAsyncThunk('app/getMovie', async (data) => {
  const res = await apiMap.getMovieApi(data)
  return res
})

// 创建一个 Slice
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // 数据请求完触发
    loadDataEnd: (
      state,
      action,
    ) => {
      state.list = action.payload.list;
      state.totals = action.payload.list.length;
    },
  },

  // extraReducers 字段让 slice 处理在别处定义的 actions，
  // 包括由 createAsyncThunk 或其他slice生成的actions。
  extraReducers(builder) {

    // 处理其他 slice 生成的 actions
    builder.addCase(increment, state => {
      // increment方法触发时的处理
      state.totals += 1
    })

    // 处理createAsyncThunk 生成的 actions
    builder
      .addCase(getMovieData.pending, state => {
        console.log('🚀 ~ 进行中！')
      })
      .addCase(getMovieData.fulfilled, (state, { payload }) => {
        console.log('🚀 ~ fulfilled', payload)
        state.list = payload.data.list
        state.totals = payload.data.list.length
      })
      .addCase(getMovieData.rejected, (state, err) => {
        console.log('🚀 ~ rejected', err)
      })
  },
})

// 导出方法
export const { loadDataEnd } = appSlice.actions

// 默认导出
export default appSlice.reducer

