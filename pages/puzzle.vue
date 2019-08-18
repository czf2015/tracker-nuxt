<template>
    <div class="puzzle">
        <template v-for="(color, index) in colors">
            <div class="cell" :style='`background-color: ${color}`' />
            <div v-if='index % 20 == 19' />
        </template>
    </div>
</template>


<script>
import api from '@/utils/api.js';

export default {
    async asyncData() {
        const {data: colors} = await api.get(`/puzzle?${Math.random()}`)
        console.log(colors)
        return {
            colors,
        }
  },
}
</script>


<style scoped>
.cell {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: -2px;
}
</style>