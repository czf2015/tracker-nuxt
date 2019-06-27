export function convert(q/* questions */, answers, key) {
    // debugger
    // console.log(answers[key])
    return Array.isArray(answers[key])
        ? q[key].type === "RADIO"
            ? Object.assign(q[key].options.find(item => item.id === answers[key][0]), {
                question_id: q[key].question_id,
                question_text: q[key].question_text
            })
            : answers[key]
                .map(answer => Object.assign(q[key].options.find(item => item.id === answer), {
                    question_id: q[key].question_id,
                    question_text: q[key].question_text
                }))
        : { value: answers[key], question_text: q[key].question_text }
}

// 
export function matchType(requiredOption, answer/* Array */) {
    // debugger
    switch (requiredOption.matchType) {
        case "all":
            return answer && requiredOption.optionId.length === answer.length && requiredOption.optionId.every(item => answer.includes(item))
        case "include":
            return answer && requiredOption.optionId.every(item => answer.includes(item))
        case "exclude":
            return answer && !requiredOption.optionId.some(item => answer.includes(item))
    }
}

// 
export function match(requiredOptions, answer/* Array */) {
    // debugger
    // requiredOptions
    return requiredOptions.length > 0 ? requiredOptions.some(item => matchType(item, answer)) : true
}

// 
export function rangeOf(range, answer/* Number */) {
    // debugger
    return (range.min === -1 || (answer && (answer >= range.min))) && (range.max === -1 || (answer && (answer <= range.max)))
}

//
export function prov(condition, answers) {
    // debugger
    return condition
        ? condition.prerequisites.length > 0
            ? condition.prerequisites.every(item => item.requiredOptions.length > 0
                ? match(item.requiredOptions, answers[item.questionId])
                : rangeOf(item.range, answers[item.questionId]))
            : true
        : true
}

// 
export default function prerequisite(questionId, r, answers) {
    const relation = r[questionId]
    return prov(relation, answers)
}

export function isOption(optionId, options, answers) {
    const option = options.find(item => item.optionId === optionId)
    return prov(option, answers)
}

