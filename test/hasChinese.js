const assert = require('assert')

const tests = [{
    input: 'f',
    output: false,
}, {
    input: '是',
    output: true,
}, {
    input: 'f是',
    output: true,
}]

let testsCompleted = 0

tests.forEach(({input, output}) => {
    assert.equal(hasChinese(input), output)
    testsCompleted++
})

console.log(testsCompleted)

function hasChinese(str) {
    return str.search(/[\u4e00-\u9fa5]/g) !== -1
}