'use strict';

/**
 * @license
 * 创建BEM规范
 *  什么是BEM规范?
 *      BEM（Block-Element-Modifier）
 *      Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *      Element：元素，比如按钮的文字，按钮的图标等。
 *      Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 *      BEM规范：
 *          1. Block：块级元素，比如一个按钮，一个输入框，一个列表等。
 *          2. Element：元素，比如按钮的文字，按钮的图标等。
 *          3. Modifier：修改器，比如按钮的禁用状态，按钮的加载状态等。
 */
function _bem(prefixName, blockSuffix, element, modifier) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}
function createBEM(prefixName) {
  const b = (blockSuffix = "") => _bem(prefixName, blockSuffix, "", "");
  const e = (element) => _bem(prefixName, "", element, "");
  const m = (modifier) => _bem(prefixName, "", "", modifier);
  const be = (blockSuffix, element) => _bem(prefixName, blockSuffix, element, "");
  const em = (element, modifier) => _bem(prefixName, "", element, modifier);
  const bm = (blockSuffix, modifier) => _bem(prefixName, blockSuffix, "", modifier);
  const bem = (blockSuffix, element, modifier) => _bem(prefixName, blockSuffix, element, modifier);
  const is = (name, state) => state ? `is-${name}` : "";
  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is
  };
}
function createNamespace(namespace) {
  const prefixName = `jv-${namespace}`;
  return createBEM(prefixName);
}

exports.createNamespace = createNamespace;
//# sourceMappingURL=create.cjs.map
