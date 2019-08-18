const assert = require('assert')
let testsCompleted = 0

const tests = [{
    input: [' ', 3],
    output: ' '
}, {
    input: ['fsfsfsfafs-sf', 3],
    output: 'fsf'
}, {
    input: ['fs-sf', 3],
    output: 'fs-'
}, {
    input: ['fsfsfsfafs-sf', 20],
    output: 'fsfsfsfafs-sf'
}]

tests.forEach(({input, output}) => {
    assert.equal(cutStr(...input), output)
    testsCompleted++
})

console.log(testsCompleted)

function cutStr(str, max) {
    if (str.length > max) {
        return cutStr(str.slice(0, -1), max)
    } else {
        return str
    }
}