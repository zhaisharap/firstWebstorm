## fileupload

### 仅接受图片类型
* accept= "file" 默认可不写
* 图片类型 accept=".jpg, .jpeg, .png ,.gif"
* word类型  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"

```

accept="image/png" or accept=".png" — Accepts PNG files.
accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — Accept PNG or JPEG files.
accept="image/*" — Accept any file with an image/* MIME type. (Many mobile devices also let the user take a picture with the camera when this is used.)
accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" — accept anything that smells like an MS Word document.


extensions: 'gif,jpg,jpeg,bmp,png,pdf,doc,docx,txt,xls,xlsx,ppt,pptx,zip,mp3,mp4,text,csv',
mimeTypes: 'image/*,text/*'
//word
+',application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//excel
+',application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//ppt
+',application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
+',application/pdf'
+',application/zip'
+',application/csv'
```

### 附件参数
* accept="*" 上传文件的类型
* defaultIsLt="2" 默认上传文件的大小是5M,前端可以自由配置
* :defaultFileList="defaultFileList" 默认上传文件的数据结构
* listType="picture-card" 配置这个参数表示图片上传风格，不配置默认文件上传

```
 <file-upload
          ref="fileUpload"
          accept="*"
          defaultIsLt="2"
          :defaultFileList="defaultFileList"
          listType="picture-card"
          v-decorator="['fileSend', {getValueFromEvent: normFile,rules: [{required: true, message: '请选择上传文件', validator: validate}]}]"
        ></file-upload>
```
