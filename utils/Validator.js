class Validator {
    constructor() {
        this.cache = []
    }
    add(dom, rules) {
        const self = this
        rules.forEach(rule => {
            const strategyArr = rule.strategy.split(':');
            const errorMsg = rule.errorMsg;
            self.cache.push(() => {
                const strategy = strategyArr.shift();
                strategyArr.unshift(dom.value);
                strategyArr.push(errorMsg);
                return strategies[strategy].apply(dom, strategyArr);
            });
        })
    }
    start() {
        for ( var i = 0, validatorFunc; validatorFunc = this.cache[ i  ]; ){                
            var
    }
}