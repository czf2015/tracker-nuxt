<template>
  <a :href="prev" class="back">
    <i class="fa fa-angle-left" />
  </a>
</template>

<script>
  export default {
    props: [{
      prev: String
    }]  
  }
</script>

<style scoped>
</style>