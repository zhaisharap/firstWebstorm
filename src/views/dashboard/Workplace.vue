
<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome() }}</span></div>
      <div>前端工程师 | 国家黑客联盟 - UED</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info title="项目数" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="团队排名" content="8/24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info title="项目访问" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" title="游戏销售额" :bordered="false">
            <e-bar :option="chartOption" style="height: 300px"></e-bar>
          </a-card>
          <a-card :loading="loading" title="动态" :bordered="false" style="margin-top:24px;">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>

        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="应用导航" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div class="item-group">
              <a>大乐透</a>
              <a>渠道门店</a>
              <a>监控中心</a>
              <a>中台管理端</a>
              <a>统一门户</a>
              <a>客服中心</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
          <a-card title="贡献值" style="margin-bottom: 24px" :loading="loading" :bordered="false" :body-style="{ padding: 0 }">
            <e-bar :option="chartPieOption" style="height: 400px;"></e-bar>
          </a-card>
          <a-card :loading="loading" title="测试" style="margin-bottom: 24px" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapGetters } from 'vuex'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import EBar from '../../components/Echarts/EBar'

import { getRoleList, getServiceList, getReportBar } from '@/api/manage'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    Radar,
    EBar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [{
        dataKey: 'score',
        min: 0,
        max: 80
      }],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '频率', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: [],
      chartOption: {},
      chartPieOption: {}
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted () {
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
    this.getChartData()
    this.getChartPieData()
    this.interval = setInterval(() => {
      this.getChartData()
    }, 10000)
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
    getProjects () {
      this.$http.get('/list/search/projects')
        .then(res => {
          this.projects = res.result && res.result.data
          this.loading = false
        })
    },
    getActivity () {
      this.$http.get('/workplace/activity')
        .then(res => {
          this.activities = res.result
        })
    },
    getTeams () {
      this.$http.get('/workplace/teams')
        .then(res => {
          this.teams = res.result
        })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar')
        .then(res => {
          const dv = new DataSet.View().source(res.result)
          dv.transform({
            type: 'fold',
            fields: ['个人', '团队', '部门'],
            key: 'user',
            value: 'score'
          })

          this.radarData = dv.rows
          this.radarLoading = false
        })
    },
    getChartData () {
      getReportBar()
        .then(res => {
          this.chartOption = {
            tooltip: {
              show: true,
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              top: '2%',
              left: '4%',
              right: '2%',
              bottom: '20px',
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
                  type: 'dashed',
                  color: '#e0e0e0'
                }
              }, // 去除网格线
              splitArea: { show: false }, // 保留网格区域
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#e0e0e0', // 左边线的颜色
                  width: '0'// 坐标线的宽度
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
    },
    getChartPieData () {
      this.chartPieOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['一组', '二组', '三组', '四组', '五组']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: '贡献值',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '一组', itemStyle: { color: '#62cc78' } },
              { value: 310, name: '二组', itemStyle: { color: '#975be3' } },
              { value: 234, name: '三组', itemStyle: { color: '#eb6078' } },
              { value: 135, name: '四组', itemStyle: { color: '#f7d442' } },
              { value: 548, name: '五组', itemStyle: { color: '#59a0fe' } }
            ]
          }
        ]
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
  .project-list {

    .card-title {
      font-size: 0;

      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .project-item {
      display: flex;
      margin-top: 8px;
      overflow: hidden;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      a {
        color: rgba(0, 0, 0, 0.45);
        display: inline-block;
        flex: 1 1 0;

        &:hover {
          color: #1890ff;
        }
      }
      .datetime {
        color: rgba(0, 0, 0, 0.25);
        flex: 0 0 auto;
        float: right;
      }
    }
    .ant-card-meta-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
  }

  .item-group {
    padding: 20px 0 8px 24px;
    font-size: 0;
    a {
      color: rgba(0, 0, 0, 0.65);
      display: inline-block;
      font-size: 14px;
      margin-bottom: 13px;
      width: 25%;
    }
  }

  .members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }

  .mobile {

    .project-list {

      .project-card-grid {
        width: 100%;
      }
    }

    .more-info {
      border: 0;
      padding-top: 16px;
      margin: 16px 0 16px;
    }

    .headerContent .title .welcome-text {
      display: none;
    }
  }

</style>
