##前端开发规范

### 1.组件命名规范
> 当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。
PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。

```<!-- 推荐 -->
<app-header></app-header>
<user-list></user-list>
<range-slider></range-slider>
 
<!-- 避免 -->
<btn-group></btn-group> <!-- 虽然简短但是可读性差. 使用 `button-group` 替代 -->
<ui-slider></ui-slider> <!-- ui 前缀太过于宽泛，在这里意义不明确 -->
<slider></slider> <!-- 与自定义元素规范不兼容 -->

```




### 2.结构化规范
<pre>
.
├── README.md           
├── public               	// 资源目录 
├── server          		// 后台服务(备用)
├── src                		// 生产目录
│   ├── api         		// 后台api接口
│   ├── assets         		// css js 和图片资源
│   ├── components     		// 各种Vue组件+公共样式
│   ├── config     		    // 路由配置和默认配置
│   ├── layouts     		// 全局Vue容器组件
│   ├── mock     		    // 临时mock数据
│   ├── store          		// vuex状态管理器
│   ├── router          	// 路由配置
│   ├── utils          		// 常用的工具类
│   ├── views          		// 业务模板
│   ├── App.vue        		// 项目中全局Vue 
│   ├── bus.js        		// 组件通信
│   ├── main.js        		// Webpack 预编译入口
│ 
├── tests       		    // 单元测试
├── .editorconfig       	// 编辑器风格一致配置
├── .env       	            // 开发，正式环境参数配置
├── .gitignore       		// git文件提交忽略
├── .travis.yml       	    // 可持续集成(CI)工具
├── .eslintignore       	// 代码检测忽略文件目录
├── babel.config.js       	// 代码转换器
├── jest.config.js       	// javascript单元测试工具
├── jsconfig.json       	// javascript根目录
├── README.md       	    // 项目备注
├── vue.config.js       	// 打包配置文件
├── webstorm.config.js      // webstorm文件
├── yarn.lock       		// 安装锁定依赖版本 
.
.
</pre>
* 2.1 vue文件基本结构
```
<template>
  <div>
    <!--必须在div中编写页面-->
  </div>
</template>
<script>
  export default {
    components : {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted() {

    }
 }
</script>
<!--声明语言，并且添加scoped-->
<style lang="less" scoped>
</style>

```
* 2.2 vue文件方法声明顺序
```
- components   
- props    
- data     
- created
- mounted
- activited
- update
- beforeRouteUpdate
- metods   
- filter
- computed
- watch
```

### 3.注释规范
> 代码注释在一个项目的后期维护中显的尤为重要，所以我们要为每一个被复用的组件编写组件使用说明，为组件中每一个方法编写方法说明。
  以下情况，务必添加注释
```
1.公共组件使用说明
2.各组件中重要函数或者类说明
3.复杂的业务逻辑处理说明
4.特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
5.注释块必须以/**（至少两个星号）开头**/；
6.单行注释使用//；
```
* 单行注释
```
普通方法一般使用单行注释// 来说明该方法主要作用
```
* 多行注释
```
组件使用说明，和调用说明 
<!--公用组件：数据表格
  /**
  * 组件名称
  * @module 组件存放位置
  * @desc 组件描述
  * @author 组件作者
  * @date 2019年5月15日10:22:43
  * @param {Object} [title]    - 参数说明
  * @param {String} [columns] - 参数说明
  * @example 调用示例
  *  <hbTable :title="title" :columns="columns" :tableData="tableData"></hbTable>
    */
-->

```
### 4.编码规范
> 优秀的项目源码，即使是多人开发，看代码也如出一人之手。统一的编码规范，可使代码更易于阅读，易于理解，易于维护。尽量按照ESLint格式要求编写代码\
``` 
1.使用ES6风格编码源码
    定义变量使用let ,定义常量使用const
    使用export ，import 模块化
2.组件 props 原子化
    提供默认值
    使用 type 属性校验类型
    使用 props 之前先检查该 prop 是否存在
3.避免 this.$parent
4.谨慎使用 this.$refs
5.无需将 this 赋值给 component 变量
6.调试信息console.log() debugger 使用完及时删除
``` 
```
css使用规范

- 使用less
- 公共样式使用common，组件样式使用less
```
