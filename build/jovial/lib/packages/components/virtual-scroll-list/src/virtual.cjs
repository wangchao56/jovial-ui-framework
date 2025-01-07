'use strict';

function initVirtual(param, update) {
  let offsetValue = 0;
  let calcType = "init" /* INIT */;
  let fixedSizeValue = 0;
  let firstRangeAvg = 0;
  const childSizes = /* @__PURE__ */ new Map();
  function isFixed() {
    return calcType === "fixed" /* FIXED */;
  }
  const range = {
    start: 0,
    end: 0,
    padFront: 0,
    padBehind: 0
  };
  function getPadFront() {
    return getEstimateSize() * range.start;
  }
  function getPadBehind() {
    const lastIndex = param.uniqueIds.length - 1;
    return getEstimateSize() * (lastIndex - range.end);
  }
  function updateRange(start, end) {
    range.start = start;
    range.end = end;
    range.padFront = getPadFront();
    range.padBehind = getPadBehind();
    update({ ...range });
  }
  function getEstimateSize() {
    return isFixed() ? fixedSizeValue : firstRangeAvg || param.estimateSize;
  }
  function getIndexoffset(idx) {
    if (!idx) return 0;
    let offset = 0;
    for (let i = 0; i < idx; i++) {
      let indexSize = childSizes.get(param.uniqueIds[i]);
      offset += typeof indexSize === "number" ? indexSize : getEstimateSize();
    }
    return offset;
  }
  function checkRange(start, end) {
    const total = param.uniqueIds.length;
    const keeps = param.keeps;
    if (total < keeps) {
      start = 0;
      end = total - 1;
    } else if (end - start < keeps - 1) {
      start = Math.max(0, end - keeps + 1);
      end = start + keeps - 1;
    }
    updateRange(start, end);
  }
  function getScrollOvers() {
    if (isFixed()) {
      return Math.floor(offsetValue / getEstimateSize());
    } else {
      let low = 0;
      let high = param.uniqueIds.length;
      let mid = 0;
      let midOffset = 0;
      while (low <= high) {
        mid = low + Math.floor((high - low) / 2);
        midOffset = getIndexoffset(mid);
        if (midOffset === offsetValue) {
          return mid;
        } else if (midOffset < offsetValue) {
          low = mid + 1;
        } else if (midOffset > offsetValue) {
          high = mid - 1;
        }
      }
      return low > 0 ? --low : 0;
    }
  }
  function getEndByStart(start) {
    const computedEnd = start + param.keeps - 1;
    return Math.min(computedEnd, param.uniqueIds.length - 1);
  }
  function handleScrollFront() {
    const scrollOvers = getScrollOvers();
    if (scrollOvers > range.start) {
      return;
    }
    const start = Math.max(scrollOvers - param.buffer, 0);
    checkRange(start, getEndByStart(start));
  }
  function handleScrollBehind() {
    const scrollOvers = getScrollOvers();
    if (scrollOvers < range.start + param.buffer) {
      return;
    }
    checkRange(scrollOvers, getEndByStart(scrollOvers));
  }
  function handleScroll(offset) {
    const direction = offset < offsetValue ? "FRONT" : "BEHIND";
    offsetValue = offset;
    switch (direction) {
      case "FRONT":
        handleScrollFront();
        break;
      case "BEHIND":
        handleScrollBehind();
        break;
    }
  }
  function handleResize(key, size) {
    switch (calcType) {
      case "init" /* INIT */:
        fixedSizeValue = size;
        calcType = "fixed" /* FIXED */;
        break;
      case "fixed" /* FIXED */:
        if (size !== fixedSizeValue) {
          calcType = "dynamic" /* DYNAMIC */;
          fixedSizeValue = 0;
        }
        break;
      case "dynamic" /* DYNAMIC */:
        if (childSizes.size < Math.min(param.keeps, param.uniqueIds.length)) {
          firstRangeAvg = [...childSizes.values()].reduce((acc, cur) => acc + cur, 0) / childSizes.size;
        }
        break;
    }
  }
  function scrollTo(options) {
  }
  checkRange(0, param.keeps - 1);
  return {
    handleScroll,
    handleResize,
    scrollTo
  };
}

exports.initVirtual = initVirtual;
//# sourceMappingURL=virtual.cjs.map
