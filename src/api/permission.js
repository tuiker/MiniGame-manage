import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'
import Layout from '@/layout'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']



router.afterEach(() => {
  NProgress.done()
})

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next()
      NProgress.done()
    } else {
      //从vuex中获取动态路由
      let routes = store.state.user.routes;
      if (!routes) {
        //动态路由为空，调用接口重新获取（解决页面刷新时，vuex中的数据丢失问题）
        routes = await store.dispatch('user/generateRoutes')
        //循环添加路由
        routes.forEach(item => {
          router.addRoute(item)
        })
        //动态添加的路由需要重定向才能匹配到
        next({ ...to, replace: true })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
