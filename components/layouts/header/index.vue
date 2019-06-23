<template>
  <header class="flex-container">
    <nuxt-link :to="back" class="back">
      <i class="fa fa-angle-left" />
    </nuxt-link>
    <span href="#top" class="title">{{ title }}</span>
    <nuxt-link :to="next" class="next">
      <i class="fa fa-hand-o-right" />
    </nuxt-link>
  </header>
</template>

<script>
export default {
  props: {
    back: String,
    title: String,
  },
  data () {
    return {
      next: ''
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>  
.flex-container {
  display: flex;
  justify-content: space-around;
}
</style>