## less语法规范

#### 1.变量,混合的使用

>  变量，混合，允许我们单独定义一系列通用的样式，然后在需要的时候去调用。所以一些公共的样式规则可以单独在一个less文件中定义，其他地方调用，在做全局样式调整时能很方便的修改

```
// LESS

@color: #4D926F;

#header {
  color: @color;
}
h2 {
  color: @color;
}

/* 生成的 CSS */

#header {
  color: #4D926F;
}
h2 {
  color: #4D926F;
}

  //LESS
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered;
}
.post a {
  color: red;
  .bordered;
}

/* 生成的 CSS */
#menu a {
  color: #111;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
.post a {
  color: red;
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```


### 2.嵌套规则（避免嵌套层级过多）

> 将嵌套深度限制在2-3级。对于超过3级的嵌套，给予重新评估。这可以避免出现过于详实的CSS选择器。 避免大量的嵌套规则。当可读性受到影响时，将之打断。推荐避免出现多于20行的嵌套规则出现。

```
#header {
  color: black;

  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
    &:hover { text-decoration: none }
  }
}
```

### 3.命名空间

#### 有时候，你可能为了更好组织CSS或者单纯是为了更好的封装，将一些变量或者混合模块打包起来, 你可以像下面这样在#bundle中定义一些属性集之后可以重复使用:
 
```
#bundle {
  .button () {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover { background-color: white }
  }
  .tab { ... }
  .citation { ... }
}
/*你只需要在 #header a中像这样引入 .button:*/
#header a {
  color: orange;
  #bundle > .button;
}
```

> 以上HTML和CSS的规范大部分参考github上的frontend-guidelines及编码规范by@mdo（后面几个自己新增
 

