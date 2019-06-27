<template>
  <dl class="aspect">
    <dt class="category">{{category}}</dt>
    <dd class="entry" v-for="(item, index) in suggestion" :key="index">
      <span class="entry-left">0{{index+1}}|</span>
      <span class="entry-right">{{item}}</span>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    category: String,
    suggestion: Array
  }
};
</script>

<style scoped>
.aspect {
}

.category {
}

.entry {
}

.entry-left {
}

.entry-right {
  background: #ccc;
}
</style>


