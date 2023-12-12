import { login, logout, getInfo } from '@/api/user'
import { GetSysMenuList } from '@/api/sysMenu'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Layout from '@/layout'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: null,//动态路由
    btnPermissions: []//按钮权限
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_BTN_PERMISSIONS: (state, btnPermissions) => {
    state.btnPermissions = btnPermissions
  },
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        if (res.code === 1000 && res.data.token) {
          commit('SET_TOKEN', res.data.token)
          commit('SET_NAME', res.data.userName)
          commit('SET_AVATAR', res.data.userImg)
          setToken(res.data.token)
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户个人信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { userName, userImg } = data
        commit('SET_NAME', userName)
        commit('SET_AVATAR', userImg)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // 生成动态路由
  async generateRoutes({ commit }) {
    return new Promise(async (resolve, reject) => {
      let res = await GetSysMenuList();
      if (res.code === 1000) {
        btnPermissions.length = 0
        //将后端返回的菜单数据转换为route路由数据
        let routes = convert(res.data)
        //根据路由匹配规则，path: '*'跳转404页面需要在路由数组的最后
        routes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', routes)
        commit('SET_BTN_PERMISSIONS', btnPermissions)

        resolve(routes)
      } else {
        reject(res)
      }
    })
  },
}

const btnPermissions = []
//将后端返回的菜单数据转换为route路由数据
const convert = (permissionList) => {
  let routes = [];
  for (let i = 0; i < permissionList.length; i++) {
    let item = permissionList[i];

    if (item.type == 3) {//按钮权限
      btnPermissions.push(item.component)
      continue
    }

    let route = getRoute(item)
    if (item.type == 1) {//目录
      route.component = Layout
    }

    if (item.childrenList && item.childrenList.length > 0) {
      //有子菜单，进行递归
      route.children = convert(item.childrenList)
    }

    routes.push(route)
  }

  return routes
}


// 返回路由的基本格式
const getRoute = (item) => {
  // 路由基本格式
  let route = {
    // 路由的路径
    path: item.path,
    // 路由名
    name: item.name,
    // 路由所在组件
    // component: (resolve) => require([`@/layout/Index`], resolve),
    component: (resolve) => require(['@/views' + item.component], resolve),
    meta: {
      id: item.id,
      title: item.name,
      icon: item.icon
    },
    hidden: item.hidden == 1,
    // 路由的子路由
    children: []
  }
  // 返回 route
  return route
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

