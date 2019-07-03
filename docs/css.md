## css规范

### 1.分号

#### 不能漏写分号

```
/* bad */
div {
 color: red
}

/* good */
div {
 color: red;
}
```

### 2.流

#### 尽量不要改变元素默认行为。保持默认的文本流。比如，移出一个图片下面的一个白块，不影响原本的显示：

```
/* bad */
img {
  display: block;
}

/* good */
img {
  vertical-align: middle;
}
```

#### 类似的，尽量不要改变浮动方式。

```
/* bad */
div {
  width: 100px;
  position: absolute;
  right: 0;
}

/* good */
div {
  width: 100px;
  margin-left: auto;
}
```

### 3.选择器

紧密耦合DOM选择器，三个层级以上建议加class：

```
/* bad */
div:first-of-type :last-child > p ~ *

/* good */
div:first-of-type .info
```

#### 避免不必要的写法：

```
/* bad */
img[src$=svg], ul > li:first-child {
  opacity: 0;
}

/* good */
[src$=svg], ul > :first-child {
  opacity: 0;
}
```

### 4.指明

#### 不要让代码难于重写，让选择器更精确，减少ID、避免使用!important

```
/* bad */
.bar {
  color: green !important;
}
.foo {
  color: red;
}

/* good */
.foo.bar {
  color: green;
}
.foo {
  color: red;
}
```

### 5.覆盖

#### 覆盖样式会使维护和调试更困难，所以要尽量避免。

```
/* bad */
li {
  visibility: hidden;
}
li:first-child {
  visibility: visible;
}

/* good */
li + li {
  visibility: hidden;
}
```

### 6.继承

#### 不要把可继承的样式重复声明：

```
/* bad */
div h1, div p {
  text-shadow: 0 1px 0 #fff;
}

/* good */
div {
  text-shadow: 0 1px 0 #fff;
}
```

### 7.简洁性

#### 保持代码的简洁。使用属性缩写。不必要的值不用写。

```
/* bad */
div {
  transition: all 1s;
  top: 50%;
  margin-top: -10px;
  padding-top: 5px;
  padding-right: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
}

/* good */
div {
  transition: 1s;
  top: calc(50% - 10px);
  padding: 5px 10px 20px;
}
```

### 8.语言

#### 能用英文的时候不用数字。

```
/* bad */
:nth-child(2n + 1) {
  transform: rotate(360deg);
}

/* good */
:nth-child(odd) {
  transform: rotate(1turn);
}
```

### 9.动画

#### 除了变形和改变透明度用animation，其他尽量使用transition。

```
/* bad */
div:hover {
  animation: move 1s forwards;
}
@keyframes move {
  100% {
    margin-left: 100px;
  }
}

/* good */
div:hover {
  transition: 1s;
  transform: translateX(100px);
}
```

### 10.单位

#### 可以不用单位时就不用。建议用rem。时间单位用s比ms好。

```
/* bad */
div {
  margin: 0px;
  font-size: .9em;
  line-height: 22px;
  transition: 500ms;
}

/* good */
div {
  margin: 0;
  font-size: .9rem;
  line-height: 1.5;
  transition: .5s;
}
```

### 11.颜色

#### 需要做透明效果是用rgba，否则都用16进制表示。

```
/* bad */
div {
  color: hsl(103, 54%, 43%);
}

/* good */
div {
  color: #5a3;
}
```


### 11.绘图

#### 减少HTTPS请求，尽量用CSS绘图替代图片。

```
/* bad */
div::before {
  content: url(white-circle.svg);
}

/* good */
div::before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
}
```

### 12.注释

```
/* bad */
div {
  // position: relative;
  transform: translateZ(0);
}

/* good */
div {
  /* position: relative; */
  will-change: transform;
}
```

### 13.语法

* 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
* 为选择器分组时，将单独的选择器单独放在一行。
* 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
* 声明块的右花括号应当单独成行。
* 每条声明语句的 : 后应该插入一个空格。
* 为了获得更准确的错误报告，每条声明都应该独占一行。
* 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
* 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）。
* 不要在 rgb()、rgba()、hsl()、hsla() 或 rect() 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。

```
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

### 14.id及class命名

```
*class应以功能过内容命名，不以表现形式命名，通用且有意义的词

*class与id单词字母小写，多个单词组成时，使用中划线“-”分隔
```

### 15.激活及hover的效果class

#### 使用on作为激活状态的class，使用hover作为移上元素（hover）的class


#### 样式的声明顺序

* 1、定位

* 2、盒模型

* 3、关于文字

* 4、关于颜色，背景

* 5、其他，如：cursor:pointer

```
.declaration-order {

  /*定位 */

  position: absolute;

  top: 0;

  right: 0;

  bottom: 0;

  left: 0;

  z-index: 100;

  /* 盒模型 */

  display: block;

  box-sizing: border-box;

  width: 100px;

  height: 100px;

  padding: 10px;

  border: 1px solid #e5e5e5;

  border-radius: 3px;

  margin: 10px;

  float: right;

  overflow: hidden;

  /* 关于文字 */

  font: normal 13px "Helvetica Neue", sans-serif;

  line-height: 1.5;

  text-align: center;

  /* 关于颜色，背景 */

  background-color: #f5f5f5;

  color: #fff;

  opacity: .8;

  /*其他 */

  cursor: pointer;

}
```
