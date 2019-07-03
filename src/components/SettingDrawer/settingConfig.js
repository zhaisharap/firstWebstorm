import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings'

let lessNodesAppended

const colorList = [
  {
    key: '体彩红', color: '#F52222'
  },
  {
    key: '体彩蓝（默认）', color: '#0396ff'
  }
]

const updateTheme = primaryColor => {
  // Don't compile less in production!
  /* if (process.env.NODE_ENV === 'production') {
    return
  } */
  // Determine if the component is remounted
  if (!primaryColor) {
    return
  }
  const hideMessage = message.loading('正在编译主题！', 0)
  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor, // 全局主色color  #0396ff 蓝色 #F5222D红色
          '@link-color': primaryColor, // 链接色
          '@success-color': '#4dbf13', // 成功色
          '@warning-color': '#faaf19', // 警告色
          '@error-color': '#F5222D', // 错误色
          '@font-size-base': '14px', // 主字号
          '@heading-color': 'rgba(0, 0, 0, .65)', // 标题色
          '@text-color': 'rgba(0, 0, 0, .85)', // 主文本色
          '@text-color-secondary': 'rgba(0, 0, 0, .65)', // 次文本色
          '@disabled-color': 'rgba(0, 0, 0, .35)', // 失效色
          '@border-radius-base': '4px', // 组件/浮层圆角
          '@border-color-base': '#d4d4d4', // 边框色
          '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .45)', // 浮层阴影
          '@shadow-color': 'rgba(0, 0, 0, .45)',
          '@layout-body-background': '#e8e8e8',
          '@font-family': 'Microsoft YaHei,Arial',
          '@card-shadow': '0 2px 8px rgba(0, 0, 0, 0.12)'
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          hideMessage()
        })
    }, 200)
  }
  if (!lessNodesAppended) {
    // insert less.js and color.less
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    // console.log(lessConfigNode.innerHTML)

    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    buildIt()
  }
}

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : ''
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
