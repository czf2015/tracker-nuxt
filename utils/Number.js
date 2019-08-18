export function approxEqual(n1, n2, epsilon = 0.0001) {
    return Math.abs(n1 - n2) < epsilon
}

export function digit(x, y = 10) {
    if (x < y) {
        return 0
    } else {
        return 1 + digit(x / y, y)
    }
}

export function countdown(start, end = 0) {
    const divide = 10 ** digit(start)
    for (let current = start; current >= end; current--) {
        if (current >= divide) {
            console.log(current)
        } else {
            const str = String(current + division)
            console.log('0' + str.slice(1))
        }
    }
}

