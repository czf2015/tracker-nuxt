<template>
  <span class="tag"
    :key="tag.name"
    :type="tag.type"
    v-if="show"
    @click="!show"
  >
    {{tag.name}}
  </span>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      tag: { name: '标签一', type: '' }
    };
  }
}
</script>

<style>
.tag {
  background-color: red;
}

.tag::before {
  content: "";
}
</style>