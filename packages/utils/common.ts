export function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

// // 示例用法
// const className = "jv-icon";
// const camelCaseClassName = toCamelCase(className);
// console.log(camelCaseClassName); // 输出: jvIcon
