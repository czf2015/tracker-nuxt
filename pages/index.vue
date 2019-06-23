<template>
  <div>
    <carrousel :banners="banners" /> 
    <columns /> 
    <position />
    <billboard :ranks="ranks" /> 
    <recommend :recommends="recommends" />
  </div>
</template>

<script>
import axios from "axios"

import Carrousel from "~/components/common/transition/Carrousel.vue"
import Columns from "~/components/common/navigation/Columns.vue"
import Position from "~/components/common/article/Parallel.vue"
import Billboard from "~/components/home/Billboard.vue"
import Recommend from "~/components/home/Recommend.vue"

export default {
  components: {
    Carrousel,
    Columns,
    Position,
    Billboard,
    Recommend
  },
  serverCacheKey() {
    // cache ...
  },
  // https://nuxtjs.org/guide/async-data#returning-a-promise
  asyncData() {
    return axios.get('http://localhost:3000/api/index.json')
                .then(res => ({
                  banners: res.data.banners,
                  ranks: res.data.ranks,
                  recommends: res.data.recommends
                }))
  },
  mounted() {
    // 启动加载进度条：如果要在mounted方法中启动它，请确保使用this.$nextTick来调用它，因为$loading可能无法立即使用。
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  }
}
</script>


<style scoped>
  
</style>
