/**
 * 获取form表单的所有字段
 * @param fields
 * @returns {Array}
 */
export function getFormFields (fields) {
  const fieldArr = []
  for (const key in fields) {
    fieldArr.push(key)
  }
  return fieldArr
}

/**
 * 获取一个guid字符串
 * @param usesplit
 * @returns {string|string}
 */
export function getGuid (usesplit) {
  // 生成并返回一个GUID
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if (usesplit) {
      if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-' }
    }
  }
  return guid
}
