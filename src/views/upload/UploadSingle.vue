<template>
  <div>
    <a-card class="card" title="任务管理" :bordered="false">
      <a-form @submit="handleSubmit" :form="form" class="form">
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item
              label="任务名">
              <a-input placeholder="请输入任务名称" v-decorator="[ 'name2', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item
              label="任务描述">
              <a-input placeholder="请输入任务描述" v-decorator="[ 'url2', {rules: [{ required: true, message: '请输入任务描述', whitespace: true}]} ]" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
            <a-form-item
              label="执行人">
              <a-select
                placeholder="请选择执行人"
                v-decorator="[
                  'owner2',
                  {rules: [{ required: true, message: '请选择执行人'}]}
                ]" >
                <a-select-option value="黄丽丽">黄丽丽</a-select-option>
                <a-select-option value="李大刀">李大刀</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item
              label="责任人">
              <a-select
                placeholder="请选择责任人"
                v-decorator="[
                  'approver2',
                  {rules: [{ required: true, message: '请选择责任人'}]}
                ]" >
                <a-select-option value="王伟">王伟</a-select-option>
                <a-select-option value="李红军">李红军</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
            <a-form-item
              label="提醒时间">
              <a-time-picker
                style="width: 100%"
                v-decorator="[
                  'dateRange2',
                  {rules: [{ required: true, message: '请选择提醒时间'}]}
                ]" />
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
            <a-form-item
              label="任务类型">
              <a-select
                placeholder="请选择任务类型"
                v-decorator="[ 'type2', {rules: [{ required: true, message: '请选择任务类型'}]} ]" >
                <a-select-option value="定时执行">定时执行</a-select-option>
                <a-select-option value="周期执行">周期执行</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row class="form-row" :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item
              label="解密文件上传">
              <a-upload
                action="https://www.easy-mock.com/mock/5cd8e17dcf055a12fa434fb9/api/fileupload"
                listType="picture"
                :defaultFileList="fileList"
                :remove="handleRemove"
                @change="handleChange"
                class="upload-list-inline"
                v-decorator="['fileList', {getValueFromEvent: normFile,rules: [{required: true, message: '请选择上传文件'}, {validator: validate}]}]"
              >
                <a-button>
                  <a-icon type="upload" /> upload
                </a-button>
              </a-upload>
            </a-form-item>
          </a-col>
          <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">

          </a-col>
          <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">

          </a-col>
        </a-row>
        <a-form-item v-if="showSubmit">
          <a-button htmlType="submit" >Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      fileList: [
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
      ]
    }
  },
  mounted () {
    const record = {
      fileList: this.fileList
    }
    const { form: { setFieldsValue } } = this
    setFieldsValue(record)
    setTimeout(() => {
      setFieldsValue(record)
    }, 0)
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    validate (rule, value, callback) {
      if (!value) {
        callback(new Error('需要是.txt文件'))
      }
      callback()
    },
    handleChange (info) {
      // TODO 数组覆盖  status: 'done', // 状态有：uploading done error removed

      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.fileList = fileList
    },
    normFile  (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }
  }
}
</script>

<style scoped>
  /* tile uploaded pictures */
  .upload-list-inline >>> .ant-upload-list-item {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline >>> .ant-upload-animate-enter {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline >>> .ant-upload-animate-leave {
    animation-name: uploadAnimateInlineOut;
  }
</style>
