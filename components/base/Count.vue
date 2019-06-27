<template>
  <div class="count">
    <button class="dec" @click="change(-1)" :disabled="count === 1">-</button>
    <input type="number" v-model="count">
    <button class="inc" @click="change(+1)">+</button>
  </div>
</template>

<script>
export default {
  props: {
    shop: Object
  },

  data() {
    return {
      count: this.shop.count
    };
  },

  methods: {
    change(step) {
      this.count += step;
      this.$emit("change", {
        id: this.shop.product.id,
        count: this.count
      });
    }
  }
};
</script>

<style scoped>
.count {
  vertical-align: center;
}

.dec,
.inc {
  color: blue;
}

input[type="number"] {
  width: 32px;
  color: red;
}
</style>

