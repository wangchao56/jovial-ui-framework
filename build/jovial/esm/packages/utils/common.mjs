function toCamelCase(str) {
  return str.split('-').map((word, index) => {
    if (index === 0) {
      return word.toLowerCase()
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  }).join('')
}
function toJson(data) {
  return JSON.stringify(data, null, 2)
}
function isObject(thing) {
  return typeof thing === 'object' && thing !== null && Object.prototype.toString.call(thing) === '[object Object]' /* Object */
}
function isEmptyObject(thing) {
  return isObject(thing) && Object.keys(thing).length === 0
}
function hasOwnProperty(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
function getType(value) {
  return Object.prototype.toString.call(value)
}
function isArray(value) {
  return getType(value) === '[object Array]' /* Array */
}
function isNull(value) {
  return getType(value) === '[object Null]' /* Null */
}
function isBoolean(value) {
  return getType(value) === '[object Boolean]' /* Boolean */
}
function isDate(value) {
  return getType(value) === '[object Date]' /* Date */
}
function isFunction(value) {
  return getType(value) === '[object Function]' /* Function */
}
function isNumber(value) {
  return getType(value) === '[object Number]' /* Number&NaN */ || typeof value === 'number' && isNaN(value)
}
function isNumberExcludeNaN(value) {
  return getType(value) === '[object Number]' /* Number&NaN */ && !isNaN(value)
}
function isRegExp(value) {
  return getType(value) === '[object RegExp]' /* RegExp */
}
function isString(value) {
  return getType(value) === '[object String]' /* String */
}
function isEmpty(value) {
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
function isUndefined(value) {
  return getType(value) === '[object Undefined]' /* Undefined */
}
function getNestedValue(obj, keys) {
  let current = obj
  if (Array.isArray(keys)) {
    for (const key of keys) {
      if (current && key in current) {
        current = current[key]
      }
      else {
        return undefined
      }
    }
  }
  else {
    const key = keys
    if (current && key in current) {
      current = current[key]
    }
    else {
      return undefined
    }
  }
  return current
}

export { getNestedValue, hasOwnProperty, isArray, isBoolean, isDate, isEmpty, isEmptyObject, isFunction, isNull, isNumber, isNumberExcludeNaN, isObject, isRegExp, isString, isUndefined, toCamelCase, toJson }
// # sourceMappingURL=common.mjs.map
