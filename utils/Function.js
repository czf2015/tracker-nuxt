export function bind(fn, context) {
    return function (...args) {
        fn.apply(context, args)
    }
} 


export const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
