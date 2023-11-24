import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken, removeToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/apis', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.code === 401) { //未登录或登录过期
      MessageBox.confirm("您未登录或登录已过期，请重新登录", "未登录", {
        type: "warning",
        showClose: false,
        showCancelButton: false,
        closeOnPressEscape: false,
        closeOnClickModal: false,
        callback: function (action, instance) {
          removeToken()//删除token
          router.push('/login')//跳转到登录页
        }
      });
    }

    return res
  },
  error => {
    return Promise.reject(error)
  })

export default service
