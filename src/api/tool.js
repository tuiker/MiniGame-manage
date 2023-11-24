import request from '@/utils/request'

/**
 *
 * @param {*} params
 * @returns 语言
 */

export function GetLanguage() {
  return request({
    url: '/hou_tai/game/numerical/listByLanguage',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 游戏类型
 */

export function GetGameType() {
  return request({
    url: '/hou_tai/game/numerical/listByGameType',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 载体
 */

export function GetCarrier() {
  return request({
    url: '/hou_tai/game/numerical/listByCarrier',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 广告位置
 */

export function GetADPosition() {
  return request({
    url: '/hou_tai/game/numerical/listByAdvPosition',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 广告数据
 */

export function GetAdvListForGame(params) {
  return request({
    url: '/houTai/advertising/getAdvListForGame',
    method: 'get',
    params
  })
}
/**
 *
 * @param {*} params
 * @returns 全部广告
 */

export function GetAdAll() {
  return request({
    url: '/houTai/advertising/getAdvListForGame',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 所有版本
 */

export function GetVersionList() {
  return request({
    url: '/hou_tai/game/numerical/getVersionList',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 所有属性
 */

export function GetStatsList() {
  return request({
    url: '/hou_tai/game/numerical/getStatsList',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 所有渠道
 */

export function GetChannelList() {
  return request({
    url: '/hou_tai/game/numerical/getChannelList',
    method: 'get',
  })
}
/**
 *
 * @param {*} params
 * @returns 全部游戏
 */

export function GetlistByGame(params) {
  return request({
    url: '/hou_tai/game/listByGame',
    method: 'get',
    params
  })
}
