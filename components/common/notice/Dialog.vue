<!-- Simple pop-up dialog box containing a form -->
<template>
  <div class="wrapper">
    <dialog class="container" v-if="show">
      <slot></slot>
    </dialog>

    <menu>
      <button @click="!show"><slot></slot></button>
    </menu>
  </div>
</template>

<script >
  export default {

  }
</script>
