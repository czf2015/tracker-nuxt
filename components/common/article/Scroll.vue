<template>
  <ul class="container">
    <li class="item" v-for="(item, index) in list" :key="item.index">
      <nuxt-link :to="item.link">
        <figure>
          <label v-if="index < label.length">
            <img :src="label[index]" />
          </label>
          <img :src="item.picture"/>
          <figcaption>
            <h3>${item.title}</h3>
            <slot :item="item" />
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

<style>
.container {
  white-space: nowrap;
}

.item {
  display: inline-block;
  width: 2rem;
  margin-right: .5rem;
  text-align: center;
  line-height: 1.5;
  list-style: none;
}
</style>