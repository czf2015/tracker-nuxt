<template>
  <span class="prev" @click="prev">
    <i class="fas fa-chevron-left"/>
    上一题
  </span>
</template>

<script>
export default {
  methods: {
    prev() {
      this.$emit('step', {msg: 'prev'})
    }
  }
};
</script>

<style scoped>
.prev {
  font-size: 16px;
  line-height: 2;
}
</style>
