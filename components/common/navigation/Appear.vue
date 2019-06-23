<template>
  <header v-show="!show" :style="opacityStyle" class="appear">
    <nuxt-link :to="back" class="back">
      <i class="fa fa-angle-left" />
    </nuxt-link>
    <span href="#top" class="title">{{ title }}</span>
    <nuxt-link :to="next" class="next">
      <i class="fa fa-handle-o-right" />
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
      next: '',
      show: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      const top = document.documentElement.scrollTop
      if (top > 60) {
        let opacity = top / 140
        opacity = opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.show = false
      } else {
        this.show = true
      }
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
.appear {
  position: fixed;
  top: 0;
  left: 0;
  height: .5rem;
  font-size: .4rem;
  line-height: 1.25;
  text-align: center;
  color: #fff;
  background: #00bcd4;
  z-index: 1;
}

.back {
  position: absolute;
  top: 0;
  left: .1rem;
}

.next {
  position: absolute;
  top: 0;
  right: .1rem;
}
</style>