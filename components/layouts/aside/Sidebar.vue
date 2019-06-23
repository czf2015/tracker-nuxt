<template>
  <ul class="container">
    <li v-for="(item, index) in list" :key="index" class="item">
      <nuxt-link :to="item.link">
        <i :class="item.icon" :title="item.title" />
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        title: '编辑',
        icon: 'fa fa-edit',
        link: ''
      }, {
        title: '动态',
        icon: 'fa fa-spinner',
        link: ''
      }, {
        title: '订阅',
        icon: 'fa fa-feed',
        link: ''
      }, {
        title: '顶部',
        icon: 'fa fa-angle-up',
        link: '#top'
      }]
    }
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  right: 0;
}

.item {
  padding: .15rem;
  text-align: center;
  color: #ccc;
  border-bottom: 1px solid #ccc;
}
</style>
