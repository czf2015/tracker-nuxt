<template>
  <div>
    <appear back="/" :title="title" />
    <banner
      :title="title"
      :bannerImg="bannerImg"
      :galleryImgs="galleryImgs"
    />
    <div class="details">
      <list :list="categoryList" />
    </div>
  </div>
</template>

<script>
import Appear from "~/components/common/navigation/Appear.vue"
import Banner from "~/components/details_id/Banner.vue"
import List from "~/components/details_id/List.vue"
import axios from "axios"

export default {
  layout: 'blank',
  components: {
    Appear,
    Banner,
    List
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);// 或 return !isNaN(+params.id)
  },
  // https://nuxtjs.org/guide/async-data#handling-errors
  asyncData({params, error}) {
    // return axios.get(`http://localhost:3000/details/${params.id}`)
                // .then(res => ({
                //   title: res.data.title,
                //   bannerImg: res.data.bannerImg,
                //   galleryImgs: res.data.galleryImgs,
                //   list: res.data.categoryList
                // }))
    return axios.get('http://localhost:3000/api/details.json')
                .then(res => res.data.details.find(value => value.id === params.id))
                .catch((e) => {
                  error({ statusCode: 404, message: 'Post not found' })
                })
  },
  data() {
    return {
      show: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll() {
      const top = document.documentElement.scrollTop;
      if (top > 60) {
        let opacity = top / 140;
        opacity = opacity > 1 ? 1 : opacity;
        this.opacityStyle = { opacity };
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  unmounted() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  transition: "test"
};
</script>

<style scoped>
.header-abs {
  position: absolute;
  left: .1rem;
  top: .1rem;
  width: .6rem;
  height: .6rem;
  line-height: .6rem;
  border-radius: .3rem;
  text-align: center;
  background: rgba(0, 0, 0, .8);
}
.header-abs-back {
  color: #fff;
  font-size: .4rem;
}
.header-fixed {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: .6rem;
  line-height: .6rem;
  text-align: center;
  color: #fff;
  background: #00bcd4;
  font-size: .25rem;
}
.header-fixed-back {
  position: absolute;
  top: 0;
  left: .1rem;
  text-align: center;
  font-size: .4rem;
  color: #fff;
}
</style>
