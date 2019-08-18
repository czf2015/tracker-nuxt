export function financial(x) {
  return Number(x).toFixed(2)
}

export function formatDate(fmt = 'YYYY-MM-DD hh-mm-ss', date = new Date()) {
  let result = fmt
  const pattern = {
    "Y+": date.getFullYear(),
    "M+": date.getMonth() + 1,                 //月份
    "D+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "Q+": Math.floor(date.getMonth() / 3 + 1), //季度
    "S+": date.getMilliseconds()             //毫秒
  };
  for (const key in pattern) {
    if (new RegExp(`(${key})`).test(fmt)) {
      if (key == "Y+") {
        result = fmt.replace(RegExp.$1, `pattern[key]`.slice(4 - RegExp.$1.length));
      } else if (key == "S+") {
        const len = RegExp.$1.length == 1 ? 3 : RegExp.$1.length
        result = fmt.replace(RegExp.$1, `00${pattern[key]}`.slice(-1, len))
      } else {
        result = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? pattern[key] : `00${pattern[key]}`.slice(-2));
      }
    }
  }
  return result;
}