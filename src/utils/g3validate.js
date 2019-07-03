/**
 * 验证电话号码
 * @param value
 * @returns {{msg: string}|{msg: string}}
 */
export function phone (value) {
  const r = /(^(\d{2,4}[-_－—]?)?\d{3,8}([-_－—]?\d{3,8})?([-_－—]?\d{1,7})?$)|(^0?1[35]\d{9}$)/
  let data = { success: true, msg: '正确！' }
  if (!r.test(value) || value.indexOf('000000')) {
    data = { success: false, msg: '号码无效！' }
    return data
  }
  return data
}

/**
 * 验证手机号码
 * @param value
 * @returns {{msg: string, success: boolean}|{msg: string, success: boolean}}
 */
export function mobile (value) {
  const r = /^1[3|4|5|7|8][0-9]\d{8}$/
  let data = { success: true, msg: '正确！' }
  if (!r.test(value) || value.indexOf('000000') !== -1) {
    data = { success: false, msg: '输入有误，请填写正确的11位手机号码！' }
    return data
  }
  return data
}
