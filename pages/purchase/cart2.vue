<template>
  <ul>
    <li v-for="item in cart[0].orders" :key="item.order_item_id">
      <Order :order="item" :products="products" :id="cart[0].id"/>
    </li>
  </ul>
</template>

<script>
import api from "@/utils/api.js";
import Order from "@/components/purchase/Order.vue";

export default {
  async asyncData() {
    const [
      {
        data: {
          result: { data: products }
        }
      },
      {
        data: {
          result: { data: cart }
        }
      }
    ] = await Promise.all([
      api.get("/v1/query_all_products"),
      api.get("/v1/query_shopping_cart")
    ]);
    debugger;
    return {
      cart,
      products
    };
  },

  components: {
    Order
  }
};
</script>

<style scoped>
</style>
