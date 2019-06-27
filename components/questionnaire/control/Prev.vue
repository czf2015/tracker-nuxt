<template>
  <span class="prev" @click="prev">
    <i class="fas fa-chevron-left"/>
    上一题
  </span>
</template>

<script>
import { prerequisite } from "@/services/Questionnaire.js";

export default {
  props: {
    r: Object
  },

  methods: {
    prev() {
      const that = this;
      let id = that.$store.state.questionId;
      do {
        id -= id === 3 ? 2 : 1;
      } while (!prerequisite(id, that.r, that.$store.state.answers));
      that.$store.commit("set", id);
    }
  }
};
</script>

<style scoped>
.prev {
  font-size: 16px;
  line-height: 2;
}
</style>
