export const state = () => ({
    questionId: 1,
    answers: {},
    shoplist: {}
})

export const mutations = {
    set(state, id) {
        state.questionId = id
    },
    submit(state, {questionId, result}) {
        // debugger
        state.answers[questionId] = result
        if (state.questionId === 1) {
            state.questionId += 2
        } else {
            state.questionId++
        }
    },
    add(state, shop) {
        state.shoplist[shop.productName] = shop
    }
}
