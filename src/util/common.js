/**
 * 去深层键值
 * @param {*} arr key 值数组
 * @param {*} obj 目标对象
 */
const getDeepObj = (arr, obj) => arr.reduce((p, t) => (p && p[t]) || undefined, obj)

/**
 * 删除多维数组中指定key值的数据
 * @param {*} arr 目标数组
 * @param {*} key 要删除的 key 值
 */
const delDeepKey = (arr, key) => {
  return arr.filter((item) => {
    if (item.key === key) return false
    if (item.child) return delDeepKey(item.child, key)
  })
}

export default {
  getDeepObj,
  delDeepKey
}
