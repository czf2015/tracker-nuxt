<template>
  <figure class="carte">
    <img class="right" :src="product.image">
    <figcaption class="left">
      <h5 class="product">
        {{product.cnproductName}}
        <span v-for="(icon, index) in product.functionIco" :key="index">
          <img :src="icon" class="icon">
        </span>
      </h5>
      <p class="effect">{{product.description}}</p>
    </figcaption>
    <div class="clear"/>
  </figure>
</template>

<script>
export default {
  props: {
    product: Object
  }
};
</script>

<style scoped>
.carte {
  margin-top: 8px;
  padding: 8px 0;
  line-height: 1.5;
  border-bottom: 2px solid #ccc;
}

.right {
  float: right;
  width: 20%;
}

.left {
  float: left;
  width: 70%;
}

.clear {
  clear: both;
}

.product {
  font-size: 16px;
}

.icon {
  width: 16px;
  margin-left: 8px;
}

.effect {
}
</style>
