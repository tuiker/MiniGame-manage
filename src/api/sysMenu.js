import request from '@/utils/request'

/**
 * 根据用户获取它的权限列表
 * @returns 菜单、按钮权限列表
 */
export function GetSysMenuList() {
  return request({
    url: '/pc/sysMenu/getList',
    method: 'get'
  })
}

/**
 * 新增目录 / 菜单 / 权限
 * @param {*} data 
 * @returns 
 */
export function AddSysMenu(data) {
  return request({
    url: '/pc/sysMenu/addSysMenu',
    method: 'post',
    data
  })
}

/**
 * 修改目录 / 菜单 / 权限
 * @param {*} data 
 * @returns 
 */
export function UpdateSysMenu(data) {
  return request({
    url: '/pc/sysMenu/updateSysMenu',
    method: 'post',
    data
  })
}

/**
 * 通过主键删除数据
 */
export function deleteByIds(params) {
  return request({
    url: '/pc/sysMenu/deleteByIds',
    method: 'delete',
    params
  })
}