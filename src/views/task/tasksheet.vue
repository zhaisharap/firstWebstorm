<template>
  <a-card>
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="工单编号">
              <a-input v-model="queryParam.code" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="工单标题">
              <a-input v-model="queryParam.description" placeholder=""/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="提问人">
                <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-date-picker :defaultValue="moment(new Date(), 'YYYY-MM-DD')" v-model="queryParam.date" style="width: 100%" placeholder="请输入创建日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="变更子系统">
                <a-tree-select

                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="treeData"
                  placeholder="请选择子系统"
                  treeDefaultExpandAll
                  v-model="queryParam.subSystem"
                >
                  <span style="color: #08c" slot="title" slot-scope="{key, value}" v-if="key='0-0-1'">
                    Child Node1 {{ value }}
                  </span>
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">新建</a-select-option>
                  <a-select-option value="2">完成</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleEdit({modType:'create'})">新建</a-button>
      <!--      <a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>-->
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
    <edit-modal ref="modal" @ok="handleOk"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import EditModal from './modules/EditModal'
import { getRoleList, getTaskList } from '@/api/manage'
import AFormItem from 'ant-design-vue/es/form/FormItem'
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
const treeData = [{
  title: '游戏系统',
  value: '0-0',
  key: '0-0',
  children: [{
    value: '0-0-1',
    key: '0-0-1',
    scopedSlots: { // custom title
      title: 'title'
    }
  }, {
    title: '高频游戏',
    value: '0-0-2',
    key: '0-0-2'
  }]
}, {
  title: '交易系统',
  value: '0-1',
  key: '0-1',
  children: [{
    title: '票据交易',
    value: '0-1-1',
    key: '0-1-1'
  }, {
    title: '营销交易',
    value: '0-1-2',
    key: '0-1-2'
  }]
}, {
  title: '业务系统',
  value: '0-2',
  key: '0-2',
  children: [{
    title: '彩票业务',
    value: '0-2-1',
    key: '0-2-1'
  }, {
    title: '门店业务',
    value: '0-2-2',
    key: '0-2-2'
  }]
}, {
  title: '数据系统',
  value: '0-3',
  key: '0-3'
}, {
  title: '报表系统',
  value: '0-4',
  key: '0-4'
}, {
  title: '审计系统',
  value: '0-5',
  key: '0-5'
}, {
  title: '统一门户',
  value: '0-6',
  key: '0-6'
}]

export default {
  name: 'TableList',
  components: {
    AFormItem,
    STable,
    EditModal
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
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '工单标题',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' }
        },
        {
          title: '状态',
          dataIndex: 'status',
          width: '80px',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '提问者',
          width: '80px',
          dataIndex: 'askName'
        },
        {
          title: '受理者',
          width: '80px',
          dataIndex: 'acceptName'
        },
        {
          title: '提问时间',
          dataIndex: 'createdAt',
          sorter: true
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

        return getTaskList(Object.assign(parameter, this.queryParam))
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
      treeData,
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
      if (record && record.modType) { // 创建
        const temRecord = {
          createdAt: moment().format('YYYY-MM-dd HH:mm:ss')
        }
        record = Object.assign(record, temRecord)
      }

      console.log(record)
      this.$refs.modal.edit(record)
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

<style class="less" scoped>

</style>
