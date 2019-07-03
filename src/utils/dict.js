import { axios } from '@/utils/request'

/**
 * 获取字典
 * @param parameter
 * @returns {*}
 */
export function getDict () {
  return axios({
    url: '/dict',
    method: 'get'
  })
}

/**
 * 获取字典json数据，注入到vue对象
 */
export function getDictData () {
  getDict().then(res => {
    window.dictData = res.result
  })
  // return getDict()
  //   .then(res => {
  //     console.log('getDictData().call()', res)
  //     return res.result
  //   })
}
