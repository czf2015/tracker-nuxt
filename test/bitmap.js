const assert = require('assert')

const tests = [{
    input: '110000000000000000000000000000000000000000000000',
    output: ['00:00~01:00'],
}, {
    input: '011000000000000000000000000000000000000000000000',
    output: ['00:30~01:30'],
}, {
    input: '010100000000000000000000000000000000000000000000',
    output: ['00:30~01:00', '01:30~02:00']
}]

let testsCompleted = 0

tests.forEach(({input, output}) => {
    assert.deepEqual(bitmap(input), output)
    testsCompleted++
})

console.log(testsCompleted)

function bitmap(str) {
    let start, end
    const len = str.length, result = []
    for (let i = 0; i < len; i++) {
        if ((i == 0 || i > 0 && str[i - 1] === '0') && str[i] === '1') {
            start = `${i >= 20 ? '' : '0'}${parseInt(i / 2)}:${i % 2 ? '30' : '00'}`
        }
        if ((i == len - 1 || i < len - 1 && str[i + 1] === '0') && str[i] === '1') {
            end = `${(i+1) >= 20 ? '' : '0'}${parseInt((i+1) / 2)}:${(i+1) % 2 ? '30' : '00'}`
            result.push(`${start}~${end}`)
        }
    }
    return result
}