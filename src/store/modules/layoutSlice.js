import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

// 创建一个 Slice
export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    increment: state => {
      state.value += 1
    },
    // 定义一个减的方法
    decrement: state => {
      state.value -= 1
    },
    byPayload: (state, action) => {
      // action 里面有 type 和 payload 两个属性，所有的传参都在payload里面
      // {"type": "counter/incrementByAmount","payload": {"vaule": 2}}
      state.value = action.payload.vaule
    },
  },
})
// 导出加减的方法
export const {
  increment,
  decrement,
  byPayload
} = layoutSlice.actions

// 默认导出
export default layoutSlice.reducer

