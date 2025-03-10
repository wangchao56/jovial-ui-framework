/**
 * 获取对象的嵌套属性值
 * @param obj 目标对象
 * @param path 属性路径，可以是字符串或字符串数组
 * @param defaultValue 默认值，当属性不存在时返回
 * @returns 属性值或默认值
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * get(obj, 'a.b.c') // 1
 * get(obj, ['a', 'b', 'c']) // 1
 * get(obj, 'a.b.d', 'default') // 'default'
 */
export function get(
  obj: Record<string, any> | null | undefined,
  path: string | string[],
  defaultValue?: any,
): any {
  // 如果对象为空，返回默认值
  if (obj == null)
    return defaultValue

  // 将路径转换为数组
  const keys = Array.isArray(path) ? path : path.split('.')

  // 递归遍历对象
  let result = obj
  for (const key of keys) {
    // 如果当前值为空或不是对象，返回默认值
    if (result == null || typeof result !== 'object')
      return defaultValue

    result = result[key]
  }

  // 如果最终结果为 undefined，返回默认值
  return result === undefined ? defaultValue : result
}
