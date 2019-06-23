<template>
  <a :href="link"><i :class="icon" /></a>
</template>

<script>
export default {
  props: ['icon', 'link']
}
</script>
