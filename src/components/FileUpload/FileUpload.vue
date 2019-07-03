<template>
  <a-upload
    action="https://www.easy-mock.com/mock/5cd8e17dcf055a12fa434fb9/api/fileupload"
    :listType="listType"
    :accept="accept"
    :multiple="true"
    :defaultFileList="defaultFileList"
    :beforeUpload="handleBeforeUpload"
    :remove="handleRemove"
    @change="handleChange"

  >
    <div v-if="listType === 'picture-card'">
      <a-icon type="plus" />
      <div class="ant-upload-text">上传</div>
    </div>
    <div v-else>
      <a-button>
        <a-icon type="upload" /> 上传
      </a-button>
    </div>

  </a-upload>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    value: {
      type: Array
    },
    accept: {
      type: String,
      defalult: 'file'
    },
    defaultIsLt: {
      type: String,
      defalult: 5
    },
    defaultFileList: {
      type: Array
    },
    listType: {
      type: String
    }
  },
  data () {
    const { file, fileList } = this.value || {}
    return {
      file: file || {},
      fileList: fileList || []
    }
  },
  methods: {
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleChange (info) {
      // 处理三种状态
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }

      // 附件链接处理
      let fileList = [...info.fileList]
      fileList = fileList.map((file) => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.defaultFileList = fileList

      this.$emit('change', { ...this.value, file: info.file })
      this.$emit('change', { ...this.value, fileList: info.fileList })
    },
    validate (rule, value, callback) {
      if (!value) {
        callback(new Error('需要是.txt文件'))
      }
      callback()
    },
    normFile  (e) {
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleBeforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < parseInt(this.defaultIsLt)
      if (!isLt2M) {
        this.$message.error(`文件需小于${this.defaultIsLt}M!`)
      }

      return new Promise((resolve, reject) => {
        if (!(isLt2M)) {
          reject(file)
        } else {
          resolve(file)
        }
      })
    }
  },
  watch: {
    value (val) {
      Object.assign(this, val)
    }
  }
}
</script>

<style scoped>
  /* tile uploaded pictures */
  /*.upload-list-inline >>> .ant-upload-list-item {*/
  /*  float: left;*/
  /*  width: 200px;*/
  /*  margin-right: 8px;*/
  /*}*/
  /*.upload-list-inline >>> .ant-upload-animate-enter {*/
  /*  animation-name: uploadAnimateInlineIn;*/
  /*}*/
  /*.upload-list-inline >>> .ant-upload-animate-leave {*/
  /*  animation-name: uploadAnimateInlineOut;*/
  /*}*/

  /*avator*/
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
