import Mock from 'mockjs2'
import { builder } from '../util'

const getRandomArr = (n, max) => {
  const maxNum = max | 31
  // 大于数组长度时，取数组长度
  if (n > 31) n = 31
  const number = []
  while (n) {
    // 随机数的选取方法31为所需的数组长度
    const num = Math.floor(Math.random() * maxNum) + 2
    // 数组查重的方法
    if (number.indexOf(num) < 0) {
      number.push(num)
      n--
    }
  }
  return number
}

const bar = () => {
  return builder(
    getRandomArr(12, 18)
  )
}

Mock.mock(/\/api\/report\/bar/, 'get', bar)
