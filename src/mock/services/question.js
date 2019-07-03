import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const questionList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) {
    const tmpKey = key + i
    result.push({
      key: tmpKey,
      id: tmpKey,
      code: 'No ' + tmpKey,
      title: Mock.mock('@ctitle(10,25)'),
      description: Mock.mock('@ctitle(20,35)'),
      status: Mock.mock('@integer(0, 1)'),
      pstatus: Mock.mock('@integer(0, 1)'),
      precent: Mock.mock('@float(1,100,3,6)'),
      askName: Mock.mock('@cname(2, 4)'),
      acceptName: '刘大江',
      createdAt: Mock.mock('@datetime'),
      endtime: Mock.mock('@datetime'),
      starttime: Mock.mock('@datetime'),
      captial: Mock.mock('@region'),
      province: Mock.mock('@province'),
      city: Mock.mock('@city'),
      country: Mock.mock('@country'),
      editable: false
    })
  }
  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}

const getQuestion = (options) => {
  const parameters = getQueryParameters(options)
  let data = {}
  if (parameters.id) {
    data = {
      id: parameters.id,
      title: Mock.mock('@ctitle(10,25)'),
      description: Mock.mock('@ctitle(20,35)'),
      design: Mock.mock('@integer(0, 1)'),
      systype: Mock.mock('@integer(1, 2)'),
      pubstate: Mock.mock('@integer(1, 2)'),
      precent: Mock.mock('@float(1,100,3,6)'),
      name: Mock.mock('@cname(2, 4)'),
      acceptName: '刘大江',
      createdAt: Mock.mock('@datetime'),
      endtime: Mock.mock('@datetime'),
      starttime: Mock.mock('@datetime'),
      captial: ['天津市', '天津', '西青区']
    }
  }
  return builder(data)
}

Mock.mock(/\/question\/profile/, 'get', getQuestion)
Mock.mock(/\/question/, 'get', questionList)
