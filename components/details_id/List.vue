<template>
  <ul>
    <li v-for="(item, index) of list" :key="index">
      <div class="item-title border-bottom">
        <i class="fa fa-ticket" />{{ item.title }}
      </div>
      <div v-if="item.children" class="item-chilren">
        <list :list="item.children" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: Array
  }
};
</script>

<style scoped>
.item-title {
  line-height: .6rem;
  font-size: .25rem;
  padding: 0 .1rem;
}

.item-chilren{
  padding: 0 .35rem;
}
</style>
