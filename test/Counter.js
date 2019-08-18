class Counter {
    constructor(x) {
        this.count = x
    }
    increase() {
        this.counter++
    }
    decrease() {
        this.counter--
    }
    get() {
        return this.count
    }
    template() {
        return `<span @click="increase>+</span><span>{{count}}</span><span @click="decrease">-</span`
    }
}