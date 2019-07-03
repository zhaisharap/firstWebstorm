<template>
  <a-card bordered>
    <e-bar :option="chartOption" style="height: 600px"></e-bar>
  </a-card>
</template>

<script>
import EBar from '../../components/Echarts/EBar'
import { getReportBar } from '../../api/manage'

export default {
  name: 'ReportBar',
  components: { EBar },
  data () {
    return {
      chartOption: {}
    }
  },
  mounted () {
    this.getChartData()
    this.interval = setInterval(() => {
      this.getChartData()
    }, 10000)
  },
  methods: {
    getChartData () {
      getReportBar()
        .then(res => {
          this.chartOption = {
            title: {
              text: 'ECharts 柱状图'
            },
            tooltip: {},
            grid: {
              left: '4%',
              right: '4%',
              bottom: '4%',
              containlabel: true
            },
            xAxis: {
              data: ['足球竞猜', '篮球竞猜', '大乐透', '高频', '高频7', '高频3', '高频5', '七星彩', '组合选', '组合选3', '组合选5', '组合选7'],
              splitLine: {
                lineStyle: {
                  color: '#e0e0e0'
                }
              }, // 去除网格线
              splitArea: { show: false }, // 保留网格区域
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#e0e0e0', // 左边线的颜色
                  width: '1'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#adadad'// 坐标值得具体的颜色

                }
              }
            },
            yAxis: {

              splitLine: {
                lineStyle: {
                  color: '#e0e0e0'
                }
              }, // 去除网格线
              splitArea: { show: false }, // 保留网格区域
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#e0e0e0', // 左边线的颜色
                  width: '1'// 坐标线的宽度
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#adadad'// 坐标值得具体的颜色

                }
              }
            },
            series: [{
              name: '销量',
              type: 'bar',
              barWidth: '60%',
              data: res.result,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return '#0396ff'
                  }
                }
              }
            }]
          }
        })
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style scoped>

</style>
