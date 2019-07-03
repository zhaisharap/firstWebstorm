<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="责任人(owner)"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入中文姓名' }]}
          ]"
          name="name"
          placeholder="请输入责任人姓名" />
      </a-form-item>
      <a-form-item
        label="关联事件工单号"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          disabled
          v-decorator="[
            'qcode',
            {initialValue:'20190035991020145569988'}
          ]"
          name="name"
          placeholder="系统自动带出" />
      </a-form-item>
      <a-form-item
        label="受理日期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-range-picker
          name="buildTime"
          style="width: 100%"
          v-decorator="[
            'buildTime',
            {rules: [{ required: true, message: '请选择起止日期' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="工单问题标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="请输入工单问题标题" />
      </a-form-item>
      <a-form-item
        label="受理人"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          disabled
          v-decorator="[
            'reciveName',
            {rules: [{ required: true, message: '请选择受理人' }]}
          ]"
          name="name"
          placeholder="请选择受理人" />
      </a-form-item>
      <a-form-item
        label="目标描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-textarea
          rows="4"
          placeholder="请输入你阶段性工作目标"
          v-decorator="[
            'description',
            {rules: [{ required: true, message: '请输入目标描述' }]}
          ]" />
      </a-form-item>
      <a-form-item
        label="问题发生地"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-cascader
          :options="options"
          expandTrigger="hover"
          @change="handleArea"
          :displayRender="handleDisplayRender"
          v-decorator="[
            'captial',
            {rules: [{ required: true , message: '请选择问题发生地' }]}
          ]"
          placeholder="请选择问题发生地"/>
      </a-form-item>
      <a-form-item
        label="权重"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="[
            'precent',
            {rules: [{ required: true}]}
          ]" />
        <span> %</span>
      </a-form-item>
      <a-form-item
        label="问题位置"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">

        <a-select
          placeholder="请选择"
          v-decorator="[
            'address',
            {initialValue:'1',initialText:'内部系统'}
          ]" > >
          <a-select-option value="0">互联网系统</a-select-option>
          <a-select-option value="1">内部系统</a-select-option>
          <a-select-option value="2">终端</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="是否需要架构设计"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">

        <a-select
          placeholder="请选择"
          v-decorator="[
            'design',
            {initialValue:'1',initialText:'否'}
          ]" >
          <a-select-option value="0">是</a-select-option>
          <a-select-option value="1">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否共性"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
        help="产品共性问题还是项目个性问题"
      >
        <a-radio-group

          v-decorator="[
            'pubstate',
            {rules: [{ required: true, message: '请选择' }]}
          ]" >
          <a-radio value="1">共性</a-radio>
          <a-radio value="2">部分共性</a-radio>
          <a-radio value="3">不共性</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="附件上传"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <file-upload
          ref="fileUpload"
          accept="*"
          defaultIsLt="2"
          :defaultFileList="defaultFileList"
          listType="picture-card"
          v-decorator="['fileSend', {getValueFromEvent: normFile,rules: [{required: true, message: '请选择上传文件', validator: validate}]}]"
        ></file-upload>

      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import FileUpload from '@/components/FileUpload'
import { getArea } from '@/api/manage'
export default {
  name: 'Upload',
  data () {
    return {
      options: [],
      defaultFileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: '/img.jpg',
          thumbUrl: '/img.jpg'
        }, {
          uid: '-2',
          name: 'yyy.png',
          status: 'done',
          url: '/img.jpg',
          thumbUrl: '/img.jpg'
        }
      ],
      // form
      form: this.$form.createForm(this)

    }
  },
  components: {
    FileUpload
  },
  created () {
    getArea().then(res => {
      this.options = res.result
    })
  },
  mounted () {
    const reciveName = this.$store.getters.nickname
    const record = {
      captial: ['天津市', '天津', '南开区'],
      reciveName: reciveName,
      fileSend: this.defaultFileList
    }
    const { form: { setFieldsValue } } = this
    setTimeout(() => {
      setFieldsValue(record)
    }, 100)
  },
  methods: {

    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.buildTime) {
            values.starttime = values.buildTime[0].format('YYYY-MM-DD HH:mm:ss')
            values.endtime = values.buildTime[1].format('YYYY-MM-DD HH:mm:ss')
          }
          this.$message.success('保存成功')
        }
      })
    },
    validate (rule, value, callback) {
      this.$refs.fileUpload.validate(rule, value, callback)
    },
    normFile  (e) {
      return this.$refs.fileUpload.normFile(e)
    },
    handleArea (value, selectedOptions) {
      console.log(value, selectedOptions)
    },
    handleDisplayRender (labels) { // 只渲染最后一级节点
      const label = labels.labels
      return label[label.length - 1]
    }
  }
}
</script>
