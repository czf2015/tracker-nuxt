// 来源：https://blog.csdn.net/weixin_38098195/article/details/80811223

// 获取cookie、
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

// 删除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

export function parseCookie(cookie) {
    const cookies = {}
    if (cookie) {
        cookie.split(';').forEach(item => {
            const pair = item.split('=')
            cookies[pair[0].trim()] = pair[1]
        })
        cookies.name = 'connect.sid'
        cookies.value = cookies[cookies.name]
    }
    return cookies
}