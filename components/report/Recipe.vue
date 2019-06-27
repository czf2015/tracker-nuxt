<template>
  <section id="recipe">
    <header class="recipe-summary">
      <h5 class="title">你的每日营养补充包配方</h5>
      <p>-- 每日补充片剂将分装维独立小包装，方便服用。</p>
      <p>-- 每盒LemonBox含有30袋。</p>
    </header>
    <main class="recipe-details">
      <Product v-for="(item, index) in QuantNutrition" :key="index" :nutrition="item"/>
    </main>
  </section>
</template>

<script>
import Product from "./Product.vue";

export default {
  components: {
    Product
  },

  props: {
    QuantNutrition: Array
  }
};
</script>

<style scoped>
#recipe {
}

.recipe-summary {
  padding: 8px;
  font-size: 14px;
  line-height: 1.5;
  border-bottom: 2px solid black;
}

.recipe-details {
}

.title {
  font-size: 14px;
  /* line-height: 1.5; */
}
</style>

