<template>
  <ul>
    <li v-for="(item, index) of list" :key="index">
      <details>        
        <summary class="item-title border-bottom">
          {{ item.title }}
        </summary>
        <div v-if="item.children" class="item-chilren">
          <cascade :list="item.children" />
        </div>
      </details>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  }
};
</script>

<style scoped>
.item-title {
  line-height: .6rem
  font-size: .25rem
  padding: 0 .1rem
}

.item-chilren{
  padding: 0 .35rem
}
</style>
