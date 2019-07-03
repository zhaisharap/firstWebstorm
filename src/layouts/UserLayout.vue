<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <route-view></route-view>

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">
          Copyright &copy; 2019 前端攻城狮小组
        </div>
      </div>
    </div>
    <div class="authcenter-background" style="width: 100%; height: 100%;">
      <img class="authcenter-bg authcenter-bg-show" smartracker="on" src="@/assets/bg2.jpg" style="width: 100%; height: 100%;" />
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data () {
    return {}
  },
  mounted () {
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
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
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    /deep/.container {
      width: 100%;
      min-height: 100%;
    /*  background: #f0f2f5 url(~@/assets/bg1.png) no-repeat 50%;
      background-size: 100%;*/
      position: relative;

      a {
        text-decoration: none;
      }

      .main {
        position: absolute;
        width: 420px;
        height: 456px;
        left: 50%;
        top: 50%;
        margin-left: -222px;
        margin-top: -235px;
        width: 440px;
        height: 470px;
        padding: 16px 40px;
        background: #fff;
        border-radius: 6px;
        .top {
          text-align: center;

          .header {
            height: 82px;
            line-height: 82px;
            margin-bottom:15px;
            .title {
              font-size: 33px;
              color: rgba(0, 0, 0, .85);
              font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
              font-weight: 600;
              position: relative;
              top: 2px;
            }
          }
          .desc {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            margin-top: 12px;
            margin-bottom: 40px;
          }

        }
      }
      .login-right{
        .main{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -192px;
          margin-top: -150px;
          width: 380px;
          height: 300px;
          padding: 16px 20px;
          border-radius: 6px;
          background: transparent;
          .ant-tabs{
            padding:0px 16px 0 16px;
            margin-bottom:16px;
            background: #efefef;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            .ant-input {
              border: 0;
              border-bottom: 1px solid #d4d4d4;
              border-radius: 0;
            }
            input{
              background: #efefef;
            }
            .ant-btn-lg{
              border-radius: 2px !important;
            }
          }
        }
      }

      @media screen and (max-width: 900px) {
        .main {
          position: absolute;
          width: 420px !important;
          height: 456px;
          left: 50%;
          top: 50%;
          margin-left: -187px;
          .header{
            img{
              width:100% !important;
            }
          }
        }
      }
      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;
          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;
            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }
        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
    .authcenter-background{position: absolute;width: 0;height: 0;top: 0;left: 0;overflow: hidden;z-index: -1;}
    .authcenter-bg{position: absolute;width: 100%;height: auto;top: 0;left: 0;overflow: hidden;opacity: 0;filter: alpha(opacity=0);-webkit-transition: opacity .8s ease;-moz-transition: opacity .8s ease;transition: opacity .8s ease;}
    .authcenter-bg-show{opacity: 1;filter: alpha(opacity=100);}

  }
</style>
