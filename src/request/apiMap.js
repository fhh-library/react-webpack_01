import request from './index'

const apiMap = {
  get: (url, data, opt = {}) => request({
    url: url,
    method: 'get',
    isHandleError: false,
    params: data,
    ...opt,
  }),
  post: (url, data, opt = {}) => request({
    url: url,
    method: 'post',
    isHandleError: false,
    data: data,
    ...opt,
  }),
}

const otherApiMap = {
  // getMovieApi: (data) => apiMap.get('/pcw/search/recommend/list', data),
  getMovieApi: () => fetch('https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48', ).then(res => res.json()),
  testApi: (data) => apiMap.post('/aaaaa', data),
}

export default {
  ...apiMap,
  ...otherApiMap
};