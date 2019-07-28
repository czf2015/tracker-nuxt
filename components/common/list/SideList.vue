<template>
    <div class="wrapper">
        <div class="mask" @click="close" />
        <div class="container">
            <h5 class="title">{{order.title}}</h5>
            <ul class="list">
                <li class="item" v-for="(item, index) in order.list" :key="index" @click="select(item)">{{item}}</li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        order: {
            type: Object,
                default: {
                title: 'fds',
                list: ['fdsfsa', 'sfasgfsag']
            }
        } 
    },

    methods: {
        /**
         * 
         */
        select(item) {
            this.$emit('select', item)
        },
        /**
         * 
         */
        close() {
            this.$emit('close')
        }
    }
}
</script>


<style scoped>
.wrapper {
    /* width:  */
}

.mask {
    position: fixed;
    background: rgba(0, 0, 0, 4);
    z-index: 9;
}

.contanier {
    position: absolute;
    top: 0; right: 0; bottom: 0;
    min-width: 2rem;
    padding: 0.2rem;
    border: 0.02rem solid #e2c8a3;
    overflow: hidden;
    z-index: 99;
}

.title {
    height: 0.3rem;
    line-height: 0.3rem;
    border-bottom:  0.02rem solid #aaa;
}

.content {

}

.item {
    height: 0.3rem;
    line-height: 0.3rem;
    border-bottom: .02rem solid #aaa;
    cursor: pointer;
}

.content:last-child {
    border-bottom: none;
}
</style>

