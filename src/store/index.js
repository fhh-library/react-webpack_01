/*
 * @Author: fuyiwei 1157704750@qq.com
 * @Date: 2024-12-15 14:47:39
 * @LastEditors: fuyiwei 1157704750@qq.com
 * @LastEditTime: 2024-12-15 15:34:10
 * @FilePath: \github\react-webpack_01\src\stores\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { useDispatch, useSelector } from 'react-redux'
// persistStore 为redux-persist内置的状态管理仓库；persistReducer 为内置的切片管理；
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // 本地存储
import storage from 'redux-persist/lib/storage/session' // 会话存储

// 多个Slice的引入；
import appSlice from './modules/appSlice'
import layoutSlice from './modules/layoutSlice'

// 配置要存储的Slice；
const persistConfig = {
  key: 'root', // key是放入localStorage中的key
  storage,
  // whitelist: ['language'], // 需要缓存的数据  默认缓存所有
  // blacklist: ['navigation'], // navigation不会被存入缓存中，其他会，适用于少部分数据需要实时更新
}

// 合并多个Slice
const rootReducer = combineReducers({
  app: appSlice,
  layout: layoutSlice,
});

const persistReducerMain = persistReducer(persistConfig, rootReducer);

// configureStore 创建一个redux数据
const store = configureStore({
  reducer: persistReducerMain,
  // 配置中间键
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: true,
})

// 二次封装：对useDispatch，useSelector进行封装，解决每次使用都要导入RootState,AppDispatch
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const persistor = persistStore(store)
export default store;

