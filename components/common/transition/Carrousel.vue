<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="banner in banners" :key="banner.id">
        <nuxt-link :to="banner.link">
          <img class="swiper-img" :src="banner.picture" :alt="banner.desc" />
        </nuxt-link>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination" />
    </swiper>
  </div>
</template>


<script>
export default {
  props: {
    banners: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        autoplay: true,
        loop: true
      }
    }
  },
  computed: {
    showSwiper() {
      return this.banners.length
    }
  }
}
</script>


<style scoped>
.wrapper >>> .swiper-pagination-bullet-active {
  background: #fff;
}

.wrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
  background: #eee;
}

.swiper-img {
  width: 100%;
}
</style>
