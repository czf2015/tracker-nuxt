<template>
  <section class="radio">
    <div
      class="button"
      v-for="option in options"
      :key="option.option_id"
      @click="next(option.id)"
    >{{option.text}}</div>
  </section>
</template>

<script>
import { isOption } from "../../utils/prerequisite.js";

export default {
  props: {
    question: Object,
    r: Object
  },

  data() {
    return {
      picked: this.$store.state.answers[this.$store.state.questionId] || []
    };
  },

  computed: {
    options() {
      const that = this;
      return that.question.options.filter(item => {
        return that.r[that.question.id]
          ? isOption(
              item.id,
              that.r[that.question.id].options,
              that.$store.state.answers
            )
          : true;
      });
    }
  },

  methods: {
    next(val) {
      // debugger;
      this.picked.push(Number(val));
      this.$store.commit("submit", {
        questionId: this.question.id,
        value: this.picked
      });
    }
  }
};
</script>

<style scoped>
.radio {
  display: flex;
  flex-direction: column;
}

.button {
  margin: 16px 0;
  width: 300px;
  line-height: 2;
  text-align: center;
  background-color: #ccc;
  border-radius: 5px;
}
</style>
