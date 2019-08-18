const assert = require('assert')
let testsCompleted = 0

const { prerequsite, questions } = require('./questionnaire.js')

const tests = [{
    input: ['0004', [{ id: '0001', value: '' }, { id: '0002', value: '' }, { id: '0003', value: '' }], prerequsite],
    output: true
}]

tests.forEach(({ input, output }) => {
    assert.equal(isExist(...input), output)
    testsCompleted++
})

console.log(testsCompleted)

function isExist(questionId, results, prerequisite) {
    const restrict = prerequisite[questionId]

    if (restrict) {
        const find = item => results.find(result => result.id = item)

        if (restrict.not.or.some(find) ||
            restrict.not.all.every(find) ||
            !(restrict.or.some(find) &&
                restrict.all.every(find))) {
            return false
        }
    }

    return true
}