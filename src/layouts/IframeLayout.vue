<template>
  <div class="iframe-container">
    <iframe name="mainiframe" :src="src" scrolling="auto" frameborder="0" class="frame">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'IframeLayout',
  data () {
    return {
      src: ''
    }
  },
  props: {
    srl: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 获取路径
    resetSrc: function () {
      this.src = this.$route.query.srl
    }
  },
  mounted () {
    this.resetSrc()
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  },
  destroyed () {
    document.body.classList.remove('userLayout')
  }
}
</script>
<style lang="less">
  body {
    // 打开滚动条固定显示
    overflow-y: scroll;

    &.colorWeak {
      filter: invert(80%);
    }
    &.userLayout {
      overflow: hidden;
    }
  }

</style>
<style lang="less" scoped>
  .iframe-container {
    /*position: absolute;*/
    /*top: 64px;*/
    /*left: 0px;*/
    /*right: 0px;*/
    /*bottom: 10px;*/
    height: 100%;
    .frame {
      position: relative;
      top: 0px;
      width: 100%;
      height: 100%;
    }
  }
</style>
