/*
 * @Author: fuyiwei fuyiwei@croot.com
 * @Date: 2024-12-13 15:58:35
 * @LastEditors: fuyiwei fuyiwei@croot.com
 * @LastEditTime: 2024-12-13 16:35:04
 * @FilePath: \l\architecture\02\src\components\LazyImport\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense } from 'react';
import './index.less';

export const LazyLoading = () => {
  return (
    <div className='lazyLoading'>
      转圈圈·····
      {/* <Spin spinning /> */}
    </div>
  )
}

export const LazyImport = ({ lazyComponent }) => {
  const Component = lazyComponent ? lazyComponent : () => null
  return (
    <Suspense fallback={<LazyLoading />}>
      <Component />
    </Suspense>
  )
}