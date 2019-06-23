<template>
  <ul class="clearfix">
    <li class="float" v-for="(item, index) in list" :key="index">
      <nuxt-link :to="item.link">
        <i :class="item.icon" />{{item.title}}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        title: '附近',
        link: '/around',
        icon: 'fa fa-map-marker'
      }, {
        title: '各地',
        link: '/various',
        icon: 'fa fa-globe'
      }]
    }
  }
}
</script>

<style scoped>
.float {
  float: left;
  width: 50%;
  padding: .1rem 0;
  text-align: center;
  outline: solid 1px #ccc;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
