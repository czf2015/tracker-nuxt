<template>
  <section class="positive-integer">
    <input
      type="number"
      :placeholder="question.placeholder"
      v-model.number="message"
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
      message: this.$store.state.answers[this.$store.state.questionId]
    };
  },

  methods: {
    next() {
      if (typeof this.message === "undefined") {
        this.$emit("error", {
          type: null,
          msg: `请输入${this.question.text}`
        });
      } else if (
        this.question.validation.min !== -1 &&
        this.message < this.question.validation.min
      ) {
        this.$emit("error", {
          type: "small",
          msg: `${this.question.question_text}不能小于${
            this.question.validation.min
          }`
        });
      } else if (
        this.question.validation.max !== -1 &&
        this.message > this.question.validation.max
      ) {
        this.$emit("error", {
          type: "large",
          msg: `${this.question.question_text}不能大于${
            this.question.validation.max
          }`
        });
      } else {
        // debugger;
        this.$store.commit("submit", {
          questionId: this.question.id,
          result: this.message
        });
        // {
        //   questionId: this.question.id,
        //   value: this.message
        // });
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

