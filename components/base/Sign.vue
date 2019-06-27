<template>
  <figure class="sign">
    <img :src="symbol" class="sign-symbol" v-show="symbol">
    <figcaption class="sign-context">{{context}}</figcaption>
  </figure>
</template>

<script>
export default {
  props: {
    symbol: String,
    context: String
  }
};
</script>

<style scoped>
.sign {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-symbol {
  width: 32px;
  height: 32px;
}

.sign-context {
  font-size: 12px;
  /* line-height: 2; */
}
</style>
