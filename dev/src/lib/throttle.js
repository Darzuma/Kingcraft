export default function (fn, delay) {
    let flag = true
    return function (...args) {
        if (!flag)
            return
        flag = false
        let t = setTimeout(() => {
            fn(...args)
            flag = true
            clearTimeout(t)
        }, delay)
    }
}