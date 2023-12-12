import request from '@/utils/request'

/**
 * 获取系统用户分页列表
 * @returns 
 */
export function GetSysUserList(params) {
  return request({
    url: '/pc/sysUser/pageList',
    method: 'get',
    params
  })
}

/**
 * 新增用户
 * @param {*} data 
 * @returns 
 */
export function AddSysUser(data) {
  return request({
    url: '/pc/sysUser/addSysUser',
    method: 'post',
    data
  })
}

/**
 * 修改用户
 * @param {*} data 
 * @returns 
 */
export function UpdateSysUser(data) {
  return request({
    url: '/pc/sysUser/updateSysUser',
    method: 'post',
    data
  })
}

/**
 * 修改系统用户密码
 * @param {*} data 
 * @returns 
 */
export function UpdateSysUserPassword(data) {
  return request({
    url: '/pc/sysUser/updateSysUserPassword',
    method: 'post',
    data
  })
}

/**
 * 通过主键删除数据
 */
export function DeleteById(params) {
  return request({
    url: '/pc/sysUser/deleteById',
    method: 'delete',
    params
  })
}