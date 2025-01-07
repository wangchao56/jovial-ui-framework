'use strict';

class TimeManager {
  // 初始化
  constructor() {
  }
  /**
   * 格式化日期为指定的格式
   * @param date 要格式化的日期
   * @param format 格式化字符串，使用 FormatOptions 中的值组合
   * @returns 格式化后的日期字符串
   */
  formatDate(date, format) {
    const options = {
      ss: date.getSeconds().toString().padStart(2, "0"),
      mm: date.getMinutes().toString().padStart(2, "0"),
      hh: date.getHours().toString().padStart(2, "0"),
      dd: date.getDate().toString().padStart(2, "0"),
      MM: (date.getMonth() + 1).toString().padStart(2, "0"),
      // 月份从0开始，需要加1
      yy: date.getFullYear().toString().slice(-2)
      // 只取年份的最后两位
    };
    return format.split("").map((char) => options[char] || char).join("");
  }
  /**
   * 计算两个日期之间的时间差（以天为单位）
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 两个日期之间的天数差
   */
  calculateDaysDifference(startDate2, endDate2) {
    const timeDifference = endDate2.getTime() - startDate2.getTime();
    return Math.ceil(timeDifference / (1e3 * 60 * 60 * 24));
  }
  /**
   * 将给定的日期字符串解析为 Date 对象
   * @param dateString 日期字符串，格式为 yyyy-MM-dd
   * @returns 解析后的 Date 对象
   */
  parseDate(dateString) {
    const parts = dateString.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  /**
   * 获取当前日期
   * @returns 当前日期
   */
  getCurrentDate() {
    return /* @__PURE__ */ new Date();
  }
}
const timeManager = new TimeManager();
const now = timeManager.getCurrentDate();
console.log("\u5F53\u524D\u65E5\u671F:", timeManager.formatDate(now, "yyyy-MM-dd"));
const startDate = timeManager.parseDate("2023-01-01");
const endDate = timeManager.parseDate("2023-12-31");
console.log(
  "\u4E24\u4E2A\u65E5\u671F\u4E4B\u95F4\u7684\u5929\u6570\u5DEE:",
  timeManager.calculateDaysDifference(startDate, endDate)
);
//# sourceMappingURL=date.cjs.map
