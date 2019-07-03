<template>
  <a-modal
    title="操作"
    :width="600"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['username', {rules: [{required: true}]}]" />
        </a-form-item>
        <a-form-item
          label="所属组织"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol">
          <a-tree-select
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="orgTree"
            placeholder="请选择所属组织"
            treeDefaultExpandAll>
          </a-tree-select>
        </a-form-item>

        <a-form-item
          label="角色"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select
            style="width: 100%"
            mode="multiple"
            v-model="mdl.actions"
            placeholder="请选择所属角色"
            :allowClear="true"
          >
            <a-select-option v-for="(action, index) in roleList" :key="index" :value="action.id">{{ action.name }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="状态"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-select v-decorator="['status', {initialValue: 1, rules: [{required: true}]}]" style="width: 100%">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="创建时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker format="YYYY-MM-DD HH:mm:ss" v-decorator="['createdAt', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]" style="width: 100%" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getOrgTree, getRoleList } from '@/api/manage'
import moment from 'moment'

export default {
  name: 'UserModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      orgTree: [],
      roleList: []
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
    console.log('form::', this.form)
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.result
    })
    getRoleList().then((res) => {
      this.roles = res.result.data
      this.roles.push({
        id: '-1',
        name: '新增角色',
        describe: '新增一个角色'
      })
      this.roleList = this.roles
    })
  },
  methods: {
    add (id) {
      this.edit({ parentId: id })
    },
    edit (record) {
      this.visible = true
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        // setFieldsValue(pick(record, []))
        record = JSON.parse(JSON.stringify(record))
        record.createdAt = moment(record.createdAt, 'YYYY-MM-DD HH:mm:dd')
        this.record = record
        setTimeout(() => {
          setFieldsValue(record)
        }, 0)
      })
    },
    close () {
      this.$emit('close')
      this.visible = false
    },
    handleOk () {
      const _this = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        // 验证表单没错误
        if (!err) {
          console.log('form values', values)

          _this.confirmLoading = true
          // 模拟后端请求 2000 毫秒延迟
          new Promise((resolve) => {
            setTimeout(() => resolve(), 2000)
          }).then(() => {
            // Do something
            _this.$message.success('保存成功')
            _this.$emit('ok')
          }).catch(() => {
            // Do something
          }).finally(() => {
            _this.confirmLoading = false
            _this.close()
          })
        }
      })
    },
    handleCancel () {
      this.close()
    }

  }
}
</script>
