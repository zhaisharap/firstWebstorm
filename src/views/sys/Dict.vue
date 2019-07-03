<template>
  <a-card bordered :title="false">
    <div>
      <h3 class="mr20">字典数据源</h3>
      <div class="dict-content">

        {{ dictList }}

        <a-divider></a-divider>
        <a-form>
          <a-form-item>
            <a-select default-value="1" >
              <a-select-option :key="planStatus.value" :value="planStatus.value" v-for="planStatus in dictList.planStatus" >
                {{ planStatus.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-select default-value="1" >
              <a-select-option :key="defaultUser.value" :value="defaultUser.value" v-for="defaultUser in dictList.defaultUser" >
                {{ defaultUser.text }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </a-card>
</template>

<script>
import AFormItem from 'ant-design-vue/es/form/FormItem'
export default {
  name: 'Dict',
  components: { AFormItem },
  data () {
    return {
      dictList: []
    }
  },
  created () {
    const that = this
    this.getDict().then(res => {
      that.dictList = res.result
    })
  }
}
</script>

<style scoped>
  .dict-content{
    border:1px solid #dddddd;
    padding:20px;
  }
</style>
