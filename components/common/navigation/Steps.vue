<template>
  <div class="wrapper">
    <ul v-for="(item, index) in list" class="container">
      <li :key="item.index" class="item">
        <img class="icon" :src="item.icon" :active="active"/>
      </li>
    </ul>
    <button @click="next">下一步</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [{
        title: '',
        icon: ''
      }]
    }
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>

<style>
</style>