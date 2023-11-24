import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '数据概况',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据概况', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/user-analyze',
    component: Layout,
    redirect: '/user-analyze/table',
    name: '用户分析',
    meta: { title: '用户分析', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'add-data',
        name: '新增用户',
        component: () => import('@/views/user-analyze/add-data'),
        meta: { title: '新增用户' }
      },
      {
        path: 'user-manage',
        name: '用户管理',
        component: () => import('@/views/user-analyze/user-manage'),
        meta: { title: '用户管理' }
      },
      {
        path: '/details',
        name: '详情',
        component: () => import('@/views/user-analyze/user-manage/details.vue'),
        hidden: true
      }
    ]
  },

  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/menu1',
    name: '渠道管理',
    meta: {
      title: '渠道管理',
      icon: 'el-icon-notebook-2'
    },
    children: [
      {
        path: 'analyze',
        component: () => import('@/views/channel/analyze'), // Parent router-view
        name: '渠道分析',
        meta: { title: '渠道分析' }
      },
      {
        path: 'detailed-data',
        component: () => import('@/views/channel/detailed-data'),
        name: '渠道详细数据',
        meta: { title: '渠道详细数据' }
      }
    ]
  },
  {
    path: '/game_manage',
    component: Layout,
    redirect: '/game_manage/form',
    name: '游戏管理',
    meta: { title: '游戏管理', icon: 'el-icon-bangzhu' },
    children: [
      {
        path: 'analysis',
        component: () => import('@/views/game_manage/analysis'), // Parent router-view
        name: '游戏分析',
        meta: { title: '游戏分析' }
      },
      {
        path: 'game-list',
        component: () => import('@/views/game_manage/game-list'),
        name: '游戏列表',
        meta: { title: '游戏列表' }
      },
      {
        path: 'advertising-list',
        component: () => import('@/views/game_manage/advertising-list'),
        name: '游戏广告列表',
        meta: { title: '游戏广告列表' }
      },
      {
        path: '/add-game',
        name: '添加游戏',
        component: () => import('@/views/game_manage/feature/add-game.vue'),
        meta: {
          title: "添加游戏",
          noCache: true,
          activeMenu: "/game_manage/form", //新增
        },
        hidden: true
      },
      {
        path: '/add-Implantation',
        name: '植入广告',
        component: () => import('@/views/game_manage/feature/add-Implantation.vue'),
        hidden: true
      }
    ]
  },
  {
    path: '/advertisement',
    component: Layout,
    redirect: '/advertisement/form',
    name: '广告管理',
    meta: { title: '广告管理', icon: 'advertisement' },
    children: [
      {
        path: 'ad-game',
        component: () => import('@/views/advertisement/ad-game.vue'), // Parent router-view
        name: '游戏广告分析',
        meta: { title: '游戏广告分析' }
      },
      {
        path: 'channel-advertising',
        component: () => import('@/views/advertisement/channel-advertising.vue'),
        name: '渠道广告分析',
        meta: { title: '渠道广告分析' }
      },
      {
        path: 'advertising-list',
        component: () => import('@/views/advertisement/advertising-list.vue'),
        name: '广告列表',
        meta: { title: '广告列表' }
      },
      {
        path: '/add-advertising',
        name: '添加广告',
        component: () => import('@/views/advertisement/add-advertising.vue'),
        hidden: true
      },
      {
        path: '/gameadv-details',
        name: '游戏广告详情',
        component: () => import('@/views/advertisement/gameadv-details.vue'),
        hidden: true
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
