<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="5">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="true"
          @click="handleClick"
          @add="handleAdd"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="19">
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleEdit({modType:'create'})">新建</a-button>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="delAll"><a-icon type="delete" />删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <s-table
          ref="table"
          size="default"
          :columns="columns"
          :data="loadData"
          :alert="false"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="username" slot-scope="text, record, index">
            姓名{{ index + 1 }}
          </span>
          <span slot="action" slot-scope="text, record">
            <template v-if="$auth('table.update')">
              <a @click="handleEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a>分配角色</a>
              <a-divider type="vertical" />
            </template>
            <a-dropdown>
              <a class="ant-dropdown-link">
                更多 <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">详情</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.disable')">
                  <a href="javascript:;">禁用</a>
                </a-menu-item>
                <a-menu-item v-if="$auth('table.delete')">
                  <a href="javascript:;">删除</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>

    <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" />
    <user-modal ref="modalUser" @click="headerEdit()"></user-modal>
  </a-card>
</template>

<script>
import moment from 'moment'
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import OrgModal from './modules/OrgModal'
import { getOrgTree, getServiceList } from '@/api/manage'
import UserModal from './modules/UserModal'

export default {
  name: 'OrgList',
  components: {
    UserModal,
    STable,
    STree,
    OrgModal
  },
  data () {
    return {
      openKeys: ['key-01'],

      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '#',
          dataIndex: 'no'
        },
        {
          title: '姓名',
          dataIndex: 'description',
          scopedSlots: { customRender: 'username' }
        },
        {
          title: '登录次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: (text) => text + ' 次'
        },
        {
          title: '状态',
          dataIndex: 'status',
          needTotal: true
        },
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          sorter: true
        },
        {
          table: '操作',
          dataIndex: 'action',
          width: '300px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getServiceList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.result
          })
      },
      orgTree: [],
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
  },
  methods: {
    handleClick (e) {
      console.log('handleClick', e)
      this.queryParam = {
        key: e.key
      }
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      if (record && record.modType) { // 创建
        const temRecord = {
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }
        record = Object.assign(record, temRecord)
      }

      console.log(record)
      this.$refs.modalUser.edit(record)
    },
    handleAdd (item) {
      console.log('add button, item', item)
      this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
      this.$refs.modal.add(item.key)
    },
    handleTitleClick (item) {
      console.log('handleTitleClick', item)
    },
    titleClick (e) {
      console.log('titleClick', e)
    },
    handleSaveOk () {
      this.$refs.table.refresh()
    },
    handleSaveClose () {

    },

    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>

<style lang="less">
  .custom-tree {

    /deep/ .ant-menu-item-group-title {
      position: relative;
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .ant-menu-item {
      &:hover {
        .btn {
          display: block;
        }
      }
    }

    /deep/ .btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 40px;
      line-height: 40px;
      z-index: 1050;

      &:hover {
        transform: scale(1.2);
        transition: 0.5s all;
      }
    }
  }
</style>
