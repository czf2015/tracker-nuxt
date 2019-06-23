<template>
  <span class="title">{{title}}</span>
</template>

<script>
  export default {
    props: [{
      title: String
    }]  
  }
</script>

<style scoped>
  .title {
    width: 75%;
    text-align: center;
  } 
</style>