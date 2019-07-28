const assert = require('assert')
let testsCompleted = 0

// const tests = [{
//     input: [1],
//     output: 1
// }, {
//     input: [1, 2],
//     output: 3
// }, {
//     input: [1, 2, 3],
//     output: 6
// }]

// tests.forEach(({input, output}) => {
//     assert.equal(add(...input), output)
//     testsCompleted++
// })

// console.log(testsCompleted)
console.log(add(3)(4)())

function add(x = 0) {
    let sum = x
    return function (y = 0) {
        sum += y
        return function (z = 0) {
            sum += z
            return sum
        }
    }
}