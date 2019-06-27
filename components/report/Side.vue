<template>
  <aside class>
    <div class="dose">{{nutrition.Dose}}</div>
    <div>
      <img :src="nutrition.product.image" class="entity">
    </div>
    <input type="radio" value v-model="picked">
  </aside>
</template>

<script>
export default {
  props: {
    nutrition: Object
  },

  data() {
    return {
      picked: this.nutrition.selected
    };
  }
};
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dose {
}

.entity {
  width: 64px;
}

input[type="radio"] {
}
</style>
