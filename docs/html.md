## HTML规范
### 1.语义化标签
> HTML5 提供了很多语义化元素，更好地帮助描述内容。希望你能从这些丰富的标签库中受益。

```
<!-- bad -->
<div id="main">
  <div class="article">
    <div class="header">
      <h1>Blog post</h1>
      <p>Published: <span>21st Feb, 2015</span></p>
    </div>
    <p>…</p>
  </div>
</div>
```

```html
<!-- good -->
<main>
  <article>
    <header>
      <h1>Blog post</h1>
      <p>Published: <time datetime="2015-02-21">21st Feb, 2015</time></p>
    </header>
    <p>…</p>
  </article>
</main>
```

#### 十个常用的标签

* article 定义文章

* header 定义页眉

* aside 定义文章的侧边栏

* hgroup 定义对网页标题的组合

* figure 一组媒体对象以及数字

* nav 定义导航

* figcaption 定义figure标题

* section 定义文章中的片段

* time 定义日期

* footer 定义页脚

#### 请确保正确使用语义化的标签，错误的用法甚至不如保守的用法。

```
<!-- bad -->
<h1>
  <figure>
    <img alt=Company src=logo.png>
  </figure>
</h1>

<!-- good -->
<h1>
  <img alt=Company src=logo.png>
</h1>
```

### 2.简洁
#### 确保代码简洁，不要再采用XHTML的旧做法。

```
<!-- bad -->
<!doctype html>
<html lang=en>
  <head>
    <meta http-equiv=Content-Type content="text/html; charset=utf-8" />
    <title>Contact</title>
    <link rel=stylesheet href=style.css type=text/css />
  </head>
  <body>
    <h1>Contact me</h1>
    <label>
      Email address:
      <input type=email placeholder=you@email.com required=required />
    </label>
    <script src=main.js type=text/javascript></script>
  </body>
</html>
```

```
<!-- good -->
<!doctype html>
<html lang=en>
  <meta charset=utf-8>
  <title>Contact</title>
  <link rel=stylesheet href=style.css>

  <h1>Contact me</h1>
  <label>
    Email address:
    <input type=email placeholder=you@email.com required>
  </label>
  <script src=main.js></script>
</html>
```

### 3.HTML5 doctype

> 为每个 HTML 页面的第一行添加标准模式（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。

```
<!DOCTYPE html>
<html>
  <head>
  </head>
</html>
```

### 4.语言属性

#### 根据 HTML5 规范：

> 强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。

#### 更多关于 lang 属性的知识可以从 此规范 中了解。

#### 这里列出了语言代码表。

```
<html lang="en">
  <!-- ... -->
</html>
```

### 5.IE 兼容模式

#### IE 支持通过特定的 <meta> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。

#### 阅读这篇 stack overflow 上的文章可以获得更多有用的信息。

```
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```


### 6.字符编码
#### 通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

```
<head>
  <meta charset="UTF-8">
</head>
```
### 7.可用性

#### 可用性不应该是事后才考虑的事情。你可以通过简单的修改做出不错的效果，例如：

* 正确使用alt属性
* 确保链接和按钮正确使用（不要用<div class=button>这种粗暴的做法）
* 不依赖于颜色来传达信息
* 给表单做好lable标记

```
<!-- bad -->
<h1><img alt="Logo" src="logo.png"></h1>

<!-- good -->
<h1><img alt="My Company, Inc." src="logo.png"></h1>
```

### 8.性能
#### 除非有非要在加载内容前加载脚本的必要性由，不然别这样做，这样会阻碍网页渲染。如果你的样式表很大，必须独立放到一个文件里。两次HTTP 请求不会显著降低性能。

```
<!-- bad -->
<!doctype html>
<meta charset=utf-8>
<script src=analytics.js></script>
<title>Hello, world.</title>
<p>...</p>
```

```
<!-- good -->
<!doctype html>
<meta charset=utf-8>
<title>Hello, world.</title>
<p>...</p>
<script src=analytics.js></script>
```
### 9.属性顺序

#### HTML 属性应该按照特定的顺序出现以保证易读性。

```
id class name data-xxx src, for, type, href title, alt aria-xxx, role value style
```


