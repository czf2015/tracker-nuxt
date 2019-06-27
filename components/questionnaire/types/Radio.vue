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
import { isOption } from "@/services/questionnaire.js";

export default {
  props: {
    question: Object,
    r: Object
  },

  data() {
    // return {
    //   picked: this.$store.state.answers[this.$store.state.questionId].value || ''
    // };
  },

  computed: {
    options() {
      return this.question.options.filter(item => {
        return this.r[this.question.id]
          ? isOption(
              item.id,
              this.r[this.question.id].options,
              this.$store.state.answers
            )
          : true;
      });
    }
  },

  methods: {
    next(val) {
      // debugger;
      // this.picked = val;
      this.$store.commit("submit", {
        questionId: this.question.id,
        result: val // this.picked
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
