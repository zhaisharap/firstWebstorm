##前端技术标准

### 开发模式

- 采用脚手架开发模式


### 环境

```
* node  --运行/编译
* yarn  --依赖管理
* webpack --打包
* eslint  --代码规约
* @vue/cli ~3 --构建
```

### 依赖
```
* "@antv/data-set": "^0.10.1",
* "ant-design-vue": "~1.3.8",
* "axios": "^0.18.0",
* "compression-webpack-plugin": "^2.0.0",
* "enquire.js": "^2.1.6",
* "js-cookie": "^2.2.0",
* "lodash.get": "^4.4.2",
* "lodash.pick": "^4.4.0",
* "md5": "^2.2.1",
* "mockjs2": "^1.0.5",
* "moment": "^2.24.0",
* "nprogress": "^0.2.0",
* "uglifyjs-webpack-plugin": "^2.1.2",
* "viser-vue": "^2.3.3",
* "vue": "^2.5.22",
* "vue-clipboard2": "^0.2.1",
* "vue-cropper": "0.4.4",
* "vue-ls": "^3.2.0",
* "vue-router": "^3.0.1",
* "vue-svg-component-runtime": "^1.0.1",
* "vuex": "^3.1.0",
* "webpack-bundle-analyzer": "^3.3.2"

```
> 请注意，我们强烈建议本项目使用 Yarn 包管理工具，这样可以与G3前端DEMO站所加载完全相同的依赖版本 (yarn.lock)

> 注意：由于涉及大量的 ES6/7 等新属性，node 需要 8.0 以上版本 


### 项目下载和运行
* 拉取项目代码
    * 演示网址    47.93.63.155

    * 演示仓库    git clone @github.com/1027149644/g3-vue-master.git
    
    * 基础工程    git clone @github.com/1027149644/g3-vue-master/tree/lite

- 安装依赖

    yarn install
- 开发模式运行

    yarn run serve
- 编译项目

    yarn run build
- Lints and fixes files

    yarn run lint



