const assert = require('assert')

const tests = [{
    input: 'fdsfsf',
    output: 6,
}, {
    input: '是否是',
    output: 6,
}, {
    input: 'fdsfsf是否是',
    output: 12,
}]

let testsCompleted = 0

tests.forEach(({input, output}) => {
    assert.equal(getRealLength(input), output)
    testsCompleted++
})

console.log(testsCompleted)

function getRealLength(str) {
    let result = 0

    if (str) {
        for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                result++
            } else {
                result += 2
            }
        }
    }
    return result
}