<template>
  <figure class="shop">
    <img :src="shop.image" :alt="shop.productName" class="product">
    <figcaption class="right">
      <h5>{{shop.productName}}</h5>
      <p>
        <span class="price">价格: {{shop.priceInfo.required}}元</span>
        <Count :shop="shop" class="count"/>
      </p>
      <p></p>
    </figcaption>
  </figure>
</template>

<script>
import Count from "../base/Count.vue";

export default {
  components: {
    Count
  },

  props: {
    shop: Object
  }
};
</script>

<style scoped>
.shop {
}

.product {
  width: 64px;
}

.right {
  float: right;
  width: 80%;
}

.price {
  font-size: 12px;
  color: blue;
}

.count {
  margin-top: 3px;
}
</style>


