/**
 * 单次触发
 * @param handler 触发函数
 * @returns 返回执行结果
 */
export function useSingleTrigger(handler: Function) {
  const allowed = ref(false)
  if (allowed.value)
    return
  allowed.value = true
  return handler()
}
