<template>
  <section class="positive-integer">
    <input
      type="number"
      :placeholder="question.placeholder"
      v-model.number="num"
      :required="question.validation.required"
      :key="question.id"
    >
    <button @click="next">提交</button>
  </section>
</template>

<script>
export default {
  props: {
    question: Object
  },

  data() {
    // debugger;
    return {
      num: this.$store.state.answers[this.$store.state.questionId]
    };
  },

  methods: {
    next() {
      const that = this;
      if (typeof that.num === "undefined") {
        that.$emit("error", {
          type: null,
          msg: `请输入${that.question.text}`
        });
      } else if (
        that.question.validation.min !== -1 &&
        that.num < that.question.validation.min
      ) {
        that.$emit("error", {
          type: "small",
          msg: `${that.question.question_text}不能小于${
            that.question.validation.min
          }`
        });
      } else if (
        that.question.validation.max !== -1 &&
        that.num > that.question.validation.max
      ) {
        that.$emit("error", {
          type: "large",
          msg: `${that.question.question_text}不能大于${
            that.question.validation.max
          }`
        });
      } else {
        // debugger;
        that.$store.commit("submit", {
          questionId: that.question.id,
          value: that.num
        });
      }
    }
  }
};
</script>

<style scoped>
.positive-integer {
  display: flex;
  flex-direction: column;
}

input[type="number"] {
  margin-top: 16px;
  line-height: 2;
  text-align: center;
}

button {
  margin-top: 16px;
  width: 200px;
  font-size: 16px;
  line-height: 2;
  color: blue;
  background-color: #ccc;
  border-radius: 5px;
}
</style>

