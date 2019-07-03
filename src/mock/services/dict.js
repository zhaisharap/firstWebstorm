import Mock from 'mockjs2'
import { builder } from '../util'

const dict = () => {
  return builder(
    {
      defaultUser: [
        {
          text: 'admin',
          value: '1'
        },
        {
          text: 'guest',
          value: '2'
        }
      ],
      planStatus: [
        {
          text: '未开始',
          value: '1'
        },
        {
          text: '已开始',
          value: '2'
        },
        {
          text: '已结束',
          value: '3'
        }
      ]
    }
  )
}

Mock.mock(/\/api\/dict/, 'get', dict)
