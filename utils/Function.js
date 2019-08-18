export function bind(fn, context) {
    return function (...args) {
        fn.apply(context, args)
    }
} 


export function pipe(...fns) {
    return function (x) {
        fns.reduce((v, fn) => fn(v), x)
    } 
}
