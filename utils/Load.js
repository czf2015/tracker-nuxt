const params = {
    tag: 'script',
    type: 'text/javascript',
    src: ''
}

export function load({ tag, type, src }) {
    return new Promise((resolve, reject) => {
        try {
            const ele = document.createElement(tag)
            ele.type = type // 'text/javascript'
            ele.src = src
            ele.onload = resolve
            ele.onerror = reject
            document.getElementsByTagName('body')[0].appendChild(ele)
        } catch (e) {
            reject(e)
        }
    })
}