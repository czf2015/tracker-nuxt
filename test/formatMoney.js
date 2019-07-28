const assert = require('assert')
let testsCompleted = 0

const tests = [{
    input: ['1443242525.34$', 3],
    output: '1,443,242,525.340'
}, {
    input: ['525.343', 2],
    output: '525.34'
}, {
    input: ['1525', 2],
    output: '1,525.00'
}]

tests.forEach(({input, output}) => {
    assert.equal(formatMoney(...input), output)
    testsCompleted++
})

console.log(testsCompleted)

function formatMoney(m, n) {
    let result = ''
    const str = typeof m === 'string' ? parseFloat(m.replace(/[^\d-]$/, '')).toFixed(n) : m.toFixed(n)
    const [integer, decimal] = str.split('.')
    const len = integer.length
    for (let i = 0; i < len; i++) {
        result += str[i]
        if (len - i > 3 && (len - i) % 3 === 1) {
            result += ','
        }
    }
    result += `.${decimal}`
    return result
}