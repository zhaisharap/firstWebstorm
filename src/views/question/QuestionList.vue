<template>
  <a-card>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit()">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="delAll"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">
        {{ 2019001 + index + 1 }}
      </span>
      <span slot="description" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">{{ text }}</a>
        </template>
      </span>

      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleSub(record)">删除</a>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { getRoleList, getQuestionList } from '@/api/manage'
const statusMap = {
  0: {
    status: 'default',
    text: '新建'
  },
  1: {
    status: 'processing',
    text: '完成'
  }
}

export default {
  name: 'UploadList',
  components: {
    STable
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '工单编号',
          dataIndex: 'code',
          width: '120px',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '工单标题',
          dataIndex: 'title',
          width: '400px',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          width: '200px',
          sorter: true
        },
        {
          title: '责任人',
          width: '100px',
          dataIndex: 'askName'
        },
        {
          title: '发生地',
          width: '100px',
          dataIndex: 'captial'
        },
        {
          title: '工单状态',
          dataIndex: 'status',
          width: '120px',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '权重',
          dataIndex: 'precent',
          width: '120px'
        },
        {
          title: '运行状态',
          dataIndex: 'pstatus',
          width: '120px',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        if (this.queryParam && this.queryParam.date) {
          console.log('拦截日期的值', this.queryParam.date.format('YYYY-MM-DD'))
          console.log('date拦截日期的值是否发生变化', this.queryParam.date)
        }

        return getQuestionList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
      subSystem: undefined
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  created () {
    this.tableOption()
    getRoleList({ t: new Date() })
  },
  methods: {
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },

    handleEdit (record) {
      const path = {
        path: '/question/qdetail'
      }
      if (!record) {
        this.$router.push(path)
      } else {
        path.query = {
          id: record.id,
          title: record.title
        }
        this.$router.push(path)
      }
    },
    handleSub (record) {
      if (record.status !== 0) {
        this.$message.success(`${record.code} 删除成功`)
      } else {
        this.$message.error(`${record.code} 删除失败，该问题未被受理`)
      }
    },
    handleOk () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    moment,
    delAll () {
      this.$message.success('删除' + this.selectedRowKeys.length + '条,id字符串：' + this.selectedRowKeys.toString())
      this.$refs.table.refresh()
    }
  },
  watch: {
    queryParam (val, oldVal) { // 普通的watch监听
      // console.log('获取日期时间戳' + moment(new Date()))
      // console.log('a: ' + val, oldVal)
    }
  }
}
</script>

<style scoped>

</style>
