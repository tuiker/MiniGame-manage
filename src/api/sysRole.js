import request from '@/utils/request'

/**
 * 获取系统角色分页列表
 * @returns 
 */
export function GetSysRoleList(params) {
  return request({
    url: '/pc/sysRole/pageList',
    method: 'get',
    params
  })
}

/**
 * 新增角色
 * @param {*} data 
 * @returns 
 */
export function AddSysRole(data) {
  return request({
    url: '/pc/sysRole/addSysRole',
    method: 'post',
    data
  })
}

/**
 * 修改角色
 * @param {*} data 
 * @returns 
 */
export function UpdateSysRole(data) {
  return request({
    url: '/pc/sysRole/updateSysRole',
    method: 'post',
    data
  })
}

/**
 * 根据角色ID获取该角色绑定的权限ID数组
 * @returns 
 */
export function GetRoleMenuIds(params) {
  return request({
    url: '/pc/sysRole/getRoleMenuIds',
    method: 'get',
    params
  })
}

/**
 * 通过主键删除数据
 */
export function DeleteById(params) {
  return request({
    url: '/pc/sysRole/deleteById',
    method: 'delete',
    params
  })
}

/**
 * 获取所有角色信息
 * @returns 
 */
export function ListAllRole() {
  return request({
    url: '/pc/sysRole/listAllRole',
    method: 'get'
  })
}