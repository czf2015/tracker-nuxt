<template>
  <header>
    <nuxt-link to="/" class="header-abs" v-show="showAbs">
      <i class="header-abs-back">&#x276E;</i>
    </nuxt-link>
    <nuxt-link
      to="/"
      class="header-fixed"
      v-show="!showAbs"
      :style="opacityStyle"
    >
      <i class="header-fixed-back">&#x276E;</i>{{ sightName }}
    </nuxt-link>
  </header>
</template>

<script>
export default {
  props: {
    sightName: String
  },
  data() {
    return {
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    };
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
        this.showAbs = false;
      } else {
        this.showAbs = true;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="stylus" scoped>
.header-abs
  position: absolute
  left: .1rem
  top: .1rem
  width: .6rem
  height: .6rem
  line-height: .6rem
  border-radius: .3rem
  text-align: center
  background: rgba(0, 0, 0, .8)
  .header-abs-back
    color: #fff
    font-size: .4rem
.header-fixed
  z-index: 1
  position: fixed
  top: 0
  left: 0
  right: 0
  height: .6rem
  line-height: .6rem
  text-align: center
  color: #fff
  background: #00bcd4
  font-size: .25rem
  .header-fixed-back
    position: absolute
    top: 0
    left: .1rem
    text-align: center
    font-size: .4rem
    color: #fff
</style>
