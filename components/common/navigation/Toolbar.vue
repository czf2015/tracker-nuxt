<template>
  <div class="wrapper">
    <ul v-show="show" class="container">
      <li v-for="(item, index) in list" :key="item.index"  class="item">
        <nuxt-link :to="item.link">
          <i :class="item.icon" :title="item.title" />
        </nuxt-link>
      </li>
    </ul>
    <button @click="show = !show"  id="switch">
      <i :class="show ? off : on" />
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      on: 'fa fa-plus-circle',
      off: 'fa fa-times-circle',
      list: [{
        title: '',
        icon: '',
        link: ''
      }]
    }
  }
}
</script>

<style scoped>
  #switch {
    position: fixed;
    bottom: 5px;
    right: 5px;
    background: #fff;
  }

  .container {
    position: fixed;
    bottom: 1px;
    right: 0;
    width: 16px;
    background: #fff;
  }

  .item {
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
</style>
