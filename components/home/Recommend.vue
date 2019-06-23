<template>
  <section id="recommend">
    <header style="line-height: 1.5; color: red;"><i>&#x2764;</i>猜你喜欢</header>
    <main>
      <ul style="display: flex; flex-wrap: wrap; justify-content: space-between;">
        <li v-for="recommend of recommends" :key="recommend.id" style="display: inline-block; margin-bottom: 5px;">
          <nuxt-link :to="'/details/' + recommend.id">
            <figure style="display: flex;">
              <img :src="recommend.picture" style="width: 4.7rem; height: 2rem;" />
              <figcaption style="line-height: 2; text-align: center;">
                <h3>{{ recommend.subject }}</h3>
                <p>
                  <span>{{ recommend.mark }}</span>
                  <span>{{ recommend.reviews }}</span>
                </p>
                <p>
                  <span>{{ recommend.price }}元起</span>
                  <span>{{ recommend.place }}</span>
                </p>
              </figcaption>
            </figure>
          </nuxt-link>
        </li>
      </ul>
    </main>
  </section>
</template>

<script>
export default {
  props: {
    recommends: Array
  }
};
</script>

<style scoped>
</style>
