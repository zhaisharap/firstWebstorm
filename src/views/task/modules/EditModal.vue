<template>
  <a-modal
    title="编辑工单"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- step1 -->
        <div>
          <a-form-item
            label="工单编号"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['code', {rules: [{required: true}]}]" />
          </a-form-item>
          <a-form-item
            label="工单标题"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-textarea :rows="4" v-decorator="['description', {rules: [{required: true}]}]"></a-textarea>
          </a-form-item>
          <a-form-item
            label="提问者"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input :rows="4" v-decorator="['askName', {rules: [{required: true}]}]"></a-input>
          </a-form-item>

          <a-form-item
            label="受理者"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input :rows="4" v-decorator="['acceptName', {rules: [{required: true}]}]"></a-input>
          </a-form-item>

          <a-form-item
            label="状态"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select v-decorator="['status', {initialValue: 0, rules: [{required: true}]}]" style="width: 100%">
              <a-select-option :value="0">新建</a-select-option>
              <a-select-option :value="1">完成</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            label="创建时间"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker format="YYYY-MM-DD HH:mm:ss" v-decorator="['createdAt', {rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]" style="width: 100%" />
          </a-form-item>

          <a-form-item
            label="测试input渲染时间"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input :value="record.createdAt | moment" style="width: 100%" disabled />
            <span>{{ record.createdAt | moment }}</span>
          </a-form-item>

          <a-form-item
            label="format属性处理时间"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-date-picker format="YYYY-MM-DD HH:mm:ss" v-decorator="['acceptAt', {initialValue: moment(), rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]" style="width: 100%" />
          </a-form-item>

        </div>

        <!-- step1 end -->
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">{{ '保存' }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import moment from 'moment'
// import pick from 'lodash.pick'
export default {
  name: 'EditModal',
  data () {
    return {
      dateFormat: 'YYYY/MM/DD',
      monthFormat: 'YYYY/MM',
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      currentStep: 0,
      mdl: {},
      record: {},
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
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
    handleNext (step) {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        values.createdAt = values.createdAt.format('YYYY-MM-DD HH:mm:ss')
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          setTimeout(() => {
            this.confirmLoading = false
            this.visible = false
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    backward () {
      this.currentStep--
    },
    handleCancel () {
      // clear form & currentStep
      this.visible = false
      this.currentStep = 0
    }
  }
}
</script>
