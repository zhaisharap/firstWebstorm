<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <img src="@/assets/icons/pro-icon.png?inline" alt="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '前端DEMO',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
<style scoped>
  .logo img{
    width:auto !important;
  }
</style>
