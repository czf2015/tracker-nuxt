function formatDate(date = new Date(), fmt = 'YYYY-MM-DD hh-mm-ss') {
    let result = fmt
    const parser = {
        //   "Y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份
        "D+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "Q+": Math.floor(date.getMonth() / 3 + 1), //季度
        "S+": date.getMilliseconds()             //毫秒
    };
    if (/(Y+)/.test(fmt)) {
        result = fmt.replace(RegExp.$1, `${date.getFullYear()}`.slice(-RegExp.$1.length));
    }
    for (const key in parser) {
        if (new RegExp(`(${key})`).test(fmt)) {
            result = result.replace(RegExp.$1, RegExp.$1.length == 1 ? parser[key] : `00${parser[key]}`.slice(-2));
        }

    }
    return result;
}

console.log(formatDate())