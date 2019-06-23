<template>
  <ul class="flex-container">
    <li class="flex-item" v-for="(item, index) in list" :key="index">
      <nuxt-link :to="item.link">
        <figure>
          <img :src="item.icon" alt="item.title" class="icon" />
          <figcaption>{{item.title}}</figcaption>
        </figure>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        title: '成绩查询',
        icon: '/img/icons/成绩.png',
        link: '/assess'
      }, {
        title: '训练指导',
        icon: '/img/icons/课程.png',
        link: '/guide'
      }, {
        title: '国防教育',
        icon: '/img/icons/中国.png',
        link: '/defense'
      }, {
        title: '活动信息',
        icon: '/img/icons/信息.png',
        link: '/activity'
      }]
    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-around;
  padding: .1rem 0;
}

.flex-item {
  line-height: 1.25;
  text-align: center;
}
</style>