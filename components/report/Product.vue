<template>
  <article class="recipe">
    <Side :nutrition="nutrition" class="right"/>
    <main class="left">
      <h5 class="nutrition">
        {{nutrition.product.cnproductName}}
        <span
          v-for="(item, index) in nutrition.product.functionIco"
          :key="index"
        >
          <img :src="item" class="icon">
        </span>
      </h5>
      <p class="summary">{{nutrition.product.description}}</p>
    </main>
    <footer class="left">
      <p class="provider">
        生产商：{{nutrition.product.provider}}
        <a href="#" class="link">看详情></a>
      </p>
    </footer>
    <div class="clear"></div>
  </article>
</template>

<script>
import Side from "./Side.vue";

export default {
  components: {
    Side
  },

  props: {
    nutrition: Object
  }
};
</script>

<style scoped>
.recipe {
  margin-top: 8px;
  padding: 8px;
  max-width: 375px;
  border-bottom: 2px solid black;
}

.left {
  float: left;
  width: 70%;
}

.right {
  float: right;
  width: 30%;
}

.clear {
  clear: both;
}

.quant {
}

.nutrition {
}

.icon {
  width: 16px;
}

.summary {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.25;
}

.provider {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.25;
}

.link {
}
</style>
