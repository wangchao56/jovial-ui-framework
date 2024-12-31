export function toCamelCase(str: string): string {
  return str
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

// // 示例用法
// const className = "jv-icon";
// const camelCaseClassName = toCamelCase(className);
// console.log(camelCaseClassName); // 输出: jvIcon

enum TypeOptions {
  'Object' = '[object Object]',
  'Null' = '[object Null]',
  'Array' = '[object Array]',
  'Boolean' = '[object Boolean]',
  'Date' = '[object Date]',
  'Function' = '[object Function]',
  'Number' = '[object Number]',
  'Number&NaN' = '[object Number]',
  'RegExp' = '[object RegExp]',
  'String' = '[object String]'
}

/**
 * 将给定的数据转换为JSON字符串
 * @param data 任何类型的数据，将被转换为JSON字符串
 * @returns 返回格式化的JSON字符串
 */
export function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}
export function isObject(thing: any): boolean {
  return (
    typeof thing === 'object' &&
    thing !== null &&
    Object.prototype.toString.call(thing) === TypeOptions.Object
  )
}
export function isEmptyObject(thing: any) {
  return isObject(thing) && Object.keys(thing).length === 0
}

export function hasOwnProperty(obj: any, key: string) {
  /**
   * 直接调用`obj.hasOwnProperty`有可能会因为
   * obj 覆盖了 prototype 上的 hasOwnProperty 而产生错误
   */
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// 判断数据类型的函数
function getType(value: any): string {
  return Object.prototype.toString.call(value)
}

function isArray(value: any): boolean {
  return getType(value) === TypeOptions.Array
}

function isNull(value: any): boolean {
  return getType(value) === TypeOptions.Null
}

function isBoolean(value: any): boolean {
  return getType(value) === TypeOptions.Boolean
}

function isDate(value: any): boolean {
  return getType(value) === TypeOptions.Date
}

function isFunction(value: any): boolean {
  return getType(value) === TypeOptions.Function
}
/**
 * 判断传入的值是否为数字或NaN。
 *
 * @param value 需要判断的值。
 * @returns 如果值为数字或NaN，则返回true；否则返回false。
 */
function isNumber(value: any): boolean {
  return (
    getType(value) === TypeOptions['Number&NaN'] ||
    (typeof value === 'number' && isNaN(value))
  )
}

/**
 * 判断传入的值是否为数字排除NaN。
 *
 * @param value 需要判断的值。
 * @returns 如果值为数字或NaN，则返回true；否则返回false。
 */
function isNumberExcludeNaN(value: any): boolean {
  return getType(value) === TypeOptions['Number&NaN'] && !isNaN(value)
}

function isRegExp(value: any): boolean {
  return getType(value) === TypeOptions.RegExp
}

function isString(value: any): boolean {
  return getType(value) === TypeOptions.String
}

export {
  isArray,
  isNull,
  isBoolean,
  isDate,
  isFunction,
  isNumber,
  isRegExp,
  isString,
  isNumberExcludeNaN
}
