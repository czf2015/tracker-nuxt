<template>
  <ul class="container">
    <li class="item" v-for="(item, index) in list" :key="item.index">
      <nuxt-link :to="item.link">
        <figure>
          <label v-if="index < label.length">
            <img :src="label[index]" />
          </label>
          <img :src="item.picture" />
          <figcaption>
            <h3>${item.title}</h3>
            <slot :item="item">
              {{item.description}}
            </slot>
          </figcaption>
        </figure>
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array,
    label: Array
  }
}
</script>

<style scoped>
.container {
  text-align: center;
}

.item {
  display: inline-block;
  max-width: 7rem;
  min-width: 5rem;
  margin: .5rem;
  line-height: 1.25;
}

figure {
  display: flex;
}

label {
  position: relative;
  left: 0;
  top: 0;
  width: .5rem;
}
</style>