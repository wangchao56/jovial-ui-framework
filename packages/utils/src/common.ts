/* eslint-disable ts/no-duplicate-enum-values */
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
  'String' = '[object String]',
  'Undefined' = '[object Undefined]',
  'Error' = '[object Error]',
  'Symbol' = '[object Symbol]',
  'Map' = '[object Map]',
  'Set' = '[object Set]',
  'WeakMap' = '[object WeakMap]',
  'WeakSet' = '[object WeakSet]',
  'Int8Array' = '[object Int8Array]',
  'Uint8Array' = '[object Uint8Array]',
  'Uint8ClampedArray' = '[object Uint8ClampedArray]',
  'Int16Array' = '[object Int16Array]',
  'Uint16Array' = '[object Uint16Array]',
  'Int32Array' = '[object Int32Array]',
  'Uint32Array' = '[object Uint32Array]',
  'Float32Array' = '[object Float32Array]',
  'Float64Array' = '[object Float64Array]',
  'BigInt64Array' = '[object BigInt64Array]',
  'BigUint64Array' = '[object BigUint64Array]',
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
    typeof thing === 'object'
    && thing !== null
    && Object.prototype.toString.call(thing) === TypeOptions.Object
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
/**
 * 判断是否为数组
 *  最好使用 Array.isArray 来判断
 *  原因 [Symbol.toStringTag] 属性 可能被重写 所以使用 Object.prototype.toString.call 来判断会不准确
 *  例如：
 *
 *
 *
 *
 */
function isArray(value: any): value is (...args: any[]) => any {
  return Array.isArray(value)
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
    getType(value) === TypeOptions['Number&NaN']
    || (typeof value === 'number' && Number.isNaN(value))
  )
}

/**
 * 判断传入的值是否为数字排除NaN。
 *
 * @param value 需要判断的值。
 * @returns 如果值为数字或NaN，则返回true；否则返回false。
 */
function isNumberExcludeNaN(value: any): boolean {
  return getType(value) === TypeOptions['Number&NaN'] && !Number.isNaN(value)
}

function isRegExp(value: any): boolean {
  return getType(value) === TypeOptions.RegExp
}

function isString(value: any): boolean {
  return getType(value) === TypeOptions.String
}

// 判断是否为空
function isEmpty(value: any): boolean {
  if (isArray(value) || isString(value)) {
    return value.length === 0
  }
  if (isNumberExcludeNaN(value)) {
    return false
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0
  }

  return !value
}
/** 是否为undfined  */
function isUndefined(value: any): boolean {
  return getType(value) === TypeOptions.Undefined
}

export {
  isArray,
  isBoolean,
  isDate,
  isEmpty,
  isFunction,
  isNull,
  isNumber,
  isNumberExcludeNaN,
  isRegExp,
  isString,
  isUndefined,
}
