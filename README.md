## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

##前端架构
- 页面结构(H5,CSS3,原生JS)
- 框架(基于Vue脚手架:vue-cli3.0)进行搭建
- 数据请求处理框架(Axios)
- Vue-Router进行路由处理
- Vue-LazyLoad进行图片赖加载

##服务端架构
- 选用NodeJs进行后台开发
- Express中间件进行服务的配置，路由、请求的处理 
- Mock中间件处理与数据库的"通信"
- Body-Parser中间件进行前端请求参数的获取
- Cookie-Parser、Cookie-Session进行cookie与session的处理


##数据库选取
- 采用Mock数据

##目前项目已实现功能
1. 登录 
2. 首页数据的展示
3. 简单的业务菜单


## 目录结构
<pre>
.  
├── public               	// 资源目录 
├── server          		  // 后台服务
├── src                		// 生产目录
│   ├── api         		  // 后台api接口
│   ├── assets         		// css js 和图片资源
│   ├── components     		// 各种Vue组件+公共样式
│   ├── config     		    // 路由配置和默认配置
│   ├── layouts     		  // 全局Vue容器组件
│   ├── mock     		      // 临时mock数据
│   ├── store          		// vuex状态管理器
│   ├── router          	// 路由配置
│   ├── utils          		// 常用的工具类
│   ├── views          		// 业务模板
│   ├── App.vue        		// 项目中全局Vue 
│   ├── bus.js        		// 组件通信
│   ├── main.js        		// Webpack 预编译入口
│ 
├── tests       		      // 单元测试
├── .editorconfig       	// 编辑器风格一致配置
├── .env       	          // 开发，正式环境参数配置
├── .gitignore       		  // git文件提交忽略
├── .travis.yml       	  // 可持续集成(CI)工具
├── .eslintignore       	// 代码检测忽略文件目录
├── babel.config.js       // 代码转换器
├── jest.config.js       	// javascript单元测试工具
├── jsconfig.json       	// javascript根目录
├── README.md       	    // 项目备注
├── vue.config.js       	// 打包配置文件
├── webstorm.config.js    // webstorm文件
├── yarn.lock       		  // 安装锁定依赖版本 
.
.
</pre>



