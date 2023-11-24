import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/hou_tai/user_info/userLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/hou_tai/user_info/getMyUserInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/hou_tai/user_info/loginOut',
    method: 'post'
  })
}
