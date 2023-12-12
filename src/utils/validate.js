/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/** 校验：只能输入正整数 */
export const positiveIntegerValidate = function (rule, value, callback) {
  if (/^(?:[1-9]\d*)$/.test(value) == false) {
    callback(new Error('请输入正整数'))
  } else {
    callback()
  }
}

/** 校验：只能输入正整数或0 */
export const positiveOrZeroValidate = function (rule, value, callback) {
  if (/^(?:[1-9]\d*|0)$/.test(value) == false) {
    callback(new Error('请输入正整数（包括0）'))
  } else {
    callback()
  }
}

/** 校验：只能输入正数或0 */
export const positiveDoubleOrZeroValidate = function (rule, value, callback) {
  if (/^(?!0[0-9])\d+(\.\d{1,2})?$/.test(value) == true) {
    callback()
  } else {
    callback(new Error('请输入一个最多两位小数的正数（包括0）'))
  }
}

/** 密码校验 */
export const validatePassword = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9@.+-]*$/;
  if (!value || value.length < 6) {
    callback(new Error('请输入一个至少6位的密码'));
  } else if (!reg.test(value)) {
    callback(new Error('只能输入英文、数字、@.+-等特殊字符'));
  } else {
    callback();
  }
}