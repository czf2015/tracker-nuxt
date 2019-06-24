<template>
  <section class="wrapper">
    <div id="banner" @click="handleBannerClick">
      <img class="banner-img" :src="bannerImg" />
      <div class="banner-info">
        <div class="banner-tittle">{{ this.sightName }}</div>
        <div class="banner-number">
          <i class="banner-icon">&#x2764;</i> {{ this.galleryImgs.length }}
        </div>
      </div>
    </div>
    <fade>
      <gallery
        :pictures="galleryImgs"
        v-show="showGallery"
        @close="handleGalleryClose"
      />
    </fade>
  </section>
</template>

<script>
import Gallery from "~/components/common/transition/Gallery.vue"
import Fade from "~/components/common/transition/Fade.vue"

export default {
  props: {
    sightName: String,
    bannerImg: String,
    galleryImgs: Array
  },
  data() {
    return {
      showGallery: false
    };
  },
  methods: {
    handleBannerClick() {
      this.showGallery = true;
    },
    handleGalleryClose() {
      this.showGallery = false;
    }
  },
  components: {
    Gallery,
    Fade
  }
};
</script>

<style scoped>
  #banner {
    position: relative;
    overflow: hidden;
    height: 0;
    padding-bottom: 55%;
  }
    .banner-img {
      width: 100%;
    }
    .banner-info {
      display: flex;
      position: absolute;
      left: 0;
      right: ;
      bottom: 0;
      line-height: .6rem;
      color: #fff;
      background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    }
      .banner-tittle {
        flex: 1;
        font-size: .32rem;
        padding: 0 .2rem;
      }
      .banner-number {
        height: .32rem;
        line-height: .32rem;
        margin-top: .14rem;
        padding: 0 .4rem;
        border-radius: .2rem;
        background: rgba(0, 0, 0, .8);
        font-size: .24rem;
      }
        .banner-icon {
          font-size: .24rem;
        }
</style>
