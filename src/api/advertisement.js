import request from '@/utils/request'
/**
 *
 * @param {*} params
 * @returns 游戏广告分析列表
 */
export function GetGameAdvList(params) {
  return request({
    url: '/hou_tai/game/adv/analysis/page',
    method: 'get',
    params
  })
}
/**
 *
 * @param {*} params
 * @returns 游戏广告展示数据
 */
export function GetAdvBoard(params) {
  return request({
    url: '/hou_tai/game/adv/analysis/getAdvBoard',
    method: 'get',
    params
  })
}
/**
 *
 * @param {*} params
 * @returns 游戏广告分析详情
 */
export function GetAdvDetailList(params) {
  return request({
    url: '/hou_tai/game/adv/analysis/pageDetail',
    method: 'get',
    params
  })
}

/**
 *
 * @param {*} params
 * @returns 广告列表
 */

export function GetAdvList(params) {
  return request({
    url: '/houTai/advertising/getAdvList',
    method: 'get',
    params
  })
}
/**
 *
 * @param {*} params
 * @returns 新增广告
 */

export function AddAdv(params) {
  return request({
    url: '/houTai/advertising/addAdv',
    method: 'post',
    data: params
  })
}
