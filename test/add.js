const assert = require('assert')
let testsCompleted = 0

const tests = [{
    input: [1],
    output: 1
}, {
    input: [1, 2],
    output: 3
}, {
    input: [1, 2, 3],
    output: 6
}]

tests.forEach(({input, output}) => {
    assert.equal(add(...input), output)
    testsCompleted++
})

console.log(testsCompleted)

function add(...list) {
    return list.reduce((a, b) => a + b, 0)
}