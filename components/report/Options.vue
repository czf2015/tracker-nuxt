<template>
  <article id="options">
    <header class="title">
      可能对你有帮助的其它
      <span class="category">草本补剂</span>:
    </header>
    <main class="content">
      <Carte v-for="(item, index) in options" :key="index" :product="item.product"/>
    </main>
    <footer class="endnote">
      <p class="tip">* 标注的功效有待更多的临床研究证实。</p>
      <button class="btn">立即购买</button>
    </footer>
  </article>
</template>

<script>
import Carte from "./Carte.vue";

export default {
  components: {
    Carte
  },

  props: {
    options: Array
  }
};
</script>

<style scoped>
#options {
  padding: 8px;
}

.title {
}

.category {
}

.content {
}

.endnote {
  text-align: center;
}

.tip {
  line-height: 1.5;
}

.btn {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.25;
  background: yellow;
  border-radius: 5px;
}
</style>

