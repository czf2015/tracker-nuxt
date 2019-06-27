<template>
  <span class="back" @click="back">
    <i class="fas fa-chevron-left"/>
    {{prev}}
  </span>
</template>

<script>
import {prerequisite} from "@/services/Questionnaire.js";

export default {
  props: {
    r: Object,
    prev: {
      type: String,
      default: "上一题"
    }
  },

  methods: {
    back() {
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
.back {
  font-size: 16px;
  line-height: 2;
}
</style>
