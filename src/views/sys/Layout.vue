<template>
  <a-card bordered>
    <div class="gutter-example">
      <a-row :gutter="24">
        <a-col class="gutter-row" :span="6">
          <div class="gutter-box">col-6</div>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <div class="gutter-box">col-6</div>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <div class="gutter-box">col-6</div>
        </a-col>
        <a-col class="gutter-row" :span="6">
          <div class="gutter-box">col-6</div>
        </a-col>
      </a-row>

      <div >
        <a-row class="mt20">
          <a-col :span="8">
            <div class="gutter-box">col-8</div>
          </a-col>
          <a-col :span="8" :offset="8">
            <div class="gutter-box">col-8</div>
          </a-col>
        </a-row>
        <a-row class="mt20">
          <a-col :span="6" :offset="6">
            <div class="gutter-box">col-6 col-offset-6</div>
          </a-col>
          <a-col :span="6" :offset="6">
            <div class="gutter-box">col-6 col-offset-6</div>
          </a-col>
        </a-row>
        <a-row class="mt20">
          <a-col :span="12" :offset="6">
            <div class="gutter-box">col-12 col-offset-6</div>
          </a-col>
        </a-row>
      </div>

      <div>
        <a-row class="mt20">
          <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <div class="gutter-box">Col</div>
          </a-col>
          <a-col :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <div class="gutter-box">Col</div>
          </a-col>
          <a-col :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">
            <div class="gutter-box">Col</div>
          </a-col>
        </a-row>

        <a-row class="mt20">
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
            <div class="gutter-box">Col</div>
          </a-col>
          <a-col :xs="20" :sm="16" :md="12" :lg="8" :xl="4">
            <div class="gutter-box">Col</div>
          </a-col>
          <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="10">
            <div class="gutter-box">Col</div>
          </a-col>
        </a-row>
        <a-row class="mt20">
          <a-col :span="18" :push="6"> <div class="gutter-box" style="background: #2f54eb">col-18 col-push-6</div></a-col>
          <a-col :span="6" :pull="18"> <div class="gutter-box">col-6 col-pull-18</div></a-col>
        </a-row>
      </div>

    </div>
  </a-card>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style scoped>
  .gutter-example >>> .ant-row > div {
    background: transparent;
    border: 0;
  }
  .gutter-box {
    background: #00A0E9;
    padding: 5px 0;
  }
</style>
