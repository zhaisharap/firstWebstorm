// eslint-disable-next-line

import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: () => import('@/layouts/BasicLayout'),
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // forms
      {
        path: '/form',
        redirect: '/form/base-form',
        component: () => import('@/layouts/PageView'),
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', keepAlive: true, permission: [ 'form' ] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', keepAlive: true, permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        component: () => import('@/layouts/PageView'),
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/table-list',
            name: 'TableListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/StandardList'),
            meta: { title: '标准列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/card',
            name: 'CardList',
            component: () => import('@/views/list/CardList'),
            meta: { title: '卡片列表', keepAlive: true, permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', keepAlive: true, permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              }
            ]
          }
        ]
      },

      // profile
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/layouts/RouteView'),
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'profile', permission: [ 'profile' ] },
        children: [
          {
            path: '/profile/basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '基础详情页', permission: [ 'profile' ] }
          },
          {
            path: '/profile/advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/advanced/Advanced'),
            meta: { title: '高级详情页', permission: [ 'profile' ] }
          }
        ]
      },

      // result
      {
        path: '/result',
        name: 'result',
        component: () => import('@/layouts/PageView'),
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'check-circle-o', permission: [ 'result' ] },
        children: [
          {
            path: '/result/success',
            name: 'ResultSuccess',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
            meta: { title: '成功', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          },
          {
            path: '/result/fail',
            name: 'ResultFail',
            component: () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),
            meta: { title: '失败', keepAlive: false, hiddenHeaderContent: true, permission: [ 'result' ] }
          }
        ]
      },
      // account
      {
        path: '/account',
        component: () => import('@/layouts/RouteView'),
        redirect: '/account/center',
        name: 'account',
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      },
      // welink
      {
        path: '/welink',
        name: 'welink',
        component: () => import('@/layouts/PageView'),
        redirect: '/dashboard/workplace',
        meta: { title: '外链网站', keepAlive: true, icon: 'global', permission: [ 'dashboard' ] },
        children: [
          // 外链链接
          {
            path: 'http://www.lottery.gov.cn/',
            name: 'lottery',
            meta: { title: '中国体彩网', target: '_blank' }
          }
        ]
      },
      // iframelink
      {
        path: '/iframelink',
        name: 'iframelink',
        component: () => import('@/layouts/IframeLayout'),
        meta: { title: '内嵌网站', keepAlive: true, icon: 'block', permission: [ 'dashboard' ] },
        children: [
          // 外部链接
          {
            path: '/iframelink/one',
            name: 'webiframe',
            component: () => import('@/layouts/IframeLayout'),
            meta: { title: '中国竞猜网', isIframe: true, srl: 'https://www.sporttery.cn/' }
          }
        ]
      },
      {
        path: '/sys',
        name: 'sys',
        component: () => import('@/layouts/PageView'),
        meta: { title: '系统管理', keepAlive: true, icon: 'setting', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/sys/org-list',
            name: 'Org',
            component: () => import('@/views/sys/OrgList'),
            meta: { title: '组织机构管理', keepAlive: true }
          },
          {
            path: '/sys/user-list',
            name: 'User',
            component: () => import('@/views/sys/RoleMdlList'),
            meta: { title: '角色管理MDL', keepAlive: true }
          },
          {
            path: '/sys/role-list',
            name: 'Role',
            component: () => import('@/views/sys/RoleList'),
            meta: { title: '角色管理', keepAlive: true }
          },
          {
            path: '/sys/auth-list',
            name: 'Auth',
            component: () => import('@/views/sys/AuthList'),
            meta: { title: '权限管理', keepAlive: true }
          },
          {
            path: '/sys/dict',
            name: 'dict',
            component: () => import('@/views/sys/Dict'),
            meta: { title: '字典管理', hidden: true, keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/sys/layout',
            name: 'layout',
            component: () => import('@/views/sys/Layout'),
            meta: { title: '布局管理', hidden: true, keepAlive: true, permission: [ 'user' ] }
          }
        ]
      },
      {
        path: '/task',
        name: 'task',
        component: () => import('@/layouts/PageView'),
        meta: { title: '任务管理', keepAlive: true, icon: 'schedule', permission: [ 'task' ] },
        children: [
          {
            path: '/task/tasksheet',
            name: 'tasksheet',
            component: () => import('@/views/task/tasksheet'),
            meta: { title: '任务工单', hidden: true, keepAlive: true, permission: [ 'task' ] }
          }
        ]
      },
      {
        path: '/report',
        name: 'report',
        component: () => import('@/layouts/PageView'),
        meta: { title: '报表管理', keepAlive: true, icon: 'pie-chart' },
        children: [
          {
            path: '/report/reportbar',
            name: 'reportbar',
            component: () => import('@/views/report/ReportBar'),
            meta: { title: '柱状图', hidden: true, keepAlive: true }
          }
        ]
      },
      {
        path: '/doc',
        name: 'doc',
        component: () => import('@/layouts/PageView'),
        meta: { title: '前端规范', keepAlive: true, icon: 'snippets' },
        children: [
          {
            path: '/doc/vue',
            name: 'docvue',
            component: () => import('@/views/doc/Index'),
            meta: { title: '规范大全', hidden: true, keepAlive: true }
          }
        ]
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/layouts/PageView'),
        meta: { title: '问题工单', keepAlive: true, icon: 'diff' },
        children: [
          {
            path: '/question/qlist',
            name: 'qlist',
            component: () => import('@/views/question/QuestionList'),
            meta: { title: '工单列表', hidden: true, keepAlive: true }
          },
          {
            path: '/question/qdetail',
            name: 'qdetail',
            component: () => import('@/views/question/QuestionForm'),
            meta: { title: '工单详情', hidden: true, keepAlive: false }
          },
          {
            path: '/question/qdetailback',
            name: 'qdetailback',
            component: () => import('@/views/question/QuestionFormBack'),
            meta: { title: '工单详情默认值', hidden: true, keepAlive: true }
          }
        ]
      },
      {
        path: '/upload',
        name: 'upload',
        component: () => import('@/layouts/PageView'),
        meta: { title: '附件模块', keepAlive: true, icon: 'paper-clip' },
        children: [
          {
            path: '/upload/upload-single',
            name: 'upload-single',
            component: () => import('@/views/upload/UploadSingle'),
            meta: { title: '非组件', hidden: true, keepAlive: true }
          },
          {
            path: '/upload/upload-component',
            name: 'upload-component',
            component: () => import('@/views/upload/Upload'),
            meta: { title: '附件组件', hidden: true, keepAlive: true }
          }
        ]
      },
      // other
      {
        path: '/other',
        name: 'otherPage',
        component: () => import('@/layouts/PageView'),
        meta: { title: '其他组件', icon: 'slack', permission: [ 'dashboard' ] },
        redirect: '/other/icon-selector',
        children: [
          {
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: { title: 'IconSelector', icon: 'tool', keepAlive: true, permission: [ 'dashboard' ] }
          },
          {
            path: '/other/edit-table',
            name: 'EditList',
            component: () => import('@/views/other/TableInnerEditList'),
            meta: { title: '内联编辑表格', keepAlive: true }
          }
        ]
      }

    ]
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/layouts/BasicLayout'),
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: () => import('@/layouts/RouteView'),
        meta: { title: '工作台', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      }
    ]
  },
  // Exception
  {
    path: '/exception',
    name: 'exception',
    component: () => import('@/layouts/RouteView'),
    redirect: '/exception/403',
    meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
        meta: { title: '403', permission: [ 'exception' ] }
      },
      {
        path: '/exception/404',
        name: 'Exception404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
        meta: { title: '404', permission: [ 'exception' ] }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
        meta: { title: '500', permission: [ 'exception' ] }
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout'),

    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/LoginRight')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/test',
    component: () => import('@/layouts/BlankLayout'),
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
