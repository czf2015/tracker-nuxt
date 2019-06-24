<template>
  <section id="billboard">
    <header class="clearfix">
      <label class="left">
        <i class="fa fa-filter" />本周热榜
      </label>
      <nuxt-link to="#" class="right">
        全部榜单<i class="fa fa-angle-right" />
      </nuxt-link>
    </header>
    <ul class="container">
      <li v-for="(rank, index) of ranks" :key="rank.id" class="rank">
        <nuxt-link :to="rank.link">
          <figure>
            <label v-if="index < 3">
              <img :src="label[index]" class="label" />
            </label>
            <img :src="rank.picture" />
            <figcaption>
              <h3>{{rank.subject}}</h3>
              <p class="price">{{rank.price}}￥起</p>
            </figcaption>
          </figure>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  props: {
    ranks: Array
  },
  data () {
    return {
      label: [
        '/img/icons/top1.png',
        '/img/icons/top2.png',
        '/img/icons/top3.png'
      ]
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
}
#billboard {
  margin: .1rem 0;
  background: #fff;
  border-bottom: solid 1px #ccc;
}
  .clearfix {
    padding: .05rem .1rem;
    text-align: center;
  }
    .left {
      float: left;
      color: red;
    }
    .right {
      float: right;
    }
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  .container {
    overflow-y: hidden;
    white-space: nowrap;
    height: 2.85rem;
  }
    .rank {
      display: inline-block;
      list-style: none;
      position: relative;
      width: 2rem;
      margin-right: .05rem;
      text-align: center;
    }
      .label {
        position: absolute;
        z-index: 99;
        left: 0;
        width: .8rem;
      }
      .price {
        position: absolute;
        top: 2.35rem;
        width: 2rem;
        color: red;
      }
</style>
