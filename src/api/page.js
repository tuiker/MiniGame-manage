import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @returns 新增用户
 */

export function GetAddUserDataStatistics(params) {
  return request({
    url: '/hou_tai/user_info/getAddUserDataStatistics',
    method: 'post',
    data:params
  })
}
/**
 *
 * @param {*} params
 * @returns 用户管理
 */

export function GetUserInfoList(params) {
  return request({
    url: '/hou_tai/user_info/getUserInfoList',
    method: 'get',
    params: params
  })
}

/**
 *
 * @param {*} params
 * @returns 用户详情
 */

export function GetUserInfoById(id) {
  return request({
    url: '/hou_tai/user_info/getUserInfoById',
    method: 'get',
    params: { id }
  })
}

/**
 *
 * @param {*} params
 * @returns 文件上传
 */

export function UploadImg(params) {
  return request({
    url: '/houTai/fileUpload/uploadImg',
    method: 'post',
    data:params
  })
}
