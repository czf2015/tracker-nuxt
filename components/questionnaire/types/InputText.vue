<template>
  <section class="text">
    <input
      type="text"
      :placeholder="question.placeholder"
      v-model="message"
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
    return {
      message: this.$store.state.answers[this.$store.state.questionId] || ""
    };
  },

  methods: {
    next() {
      if (this.question.validation.required && this.message.length === 0) {
        this.$emit("error", {
          type: "null",
          msg: `请输入${this.question.text}`
        });
      } else if (
        this.question.validation.minLength !== -1 &&
        this.message.length < this.question.validation.minLength
      ) {
        this.$emit("error", {
          type: "short",
          msg: `${this.question.question_text}长度不能小于${
            this.question.validation.minLength
          }`
        });
      } else if (
        this.question.validation.maxLength !== -1 &&
        this.message.length > this.question.validation.maxLength
      ) {
        this.$emit("error", {
          type: "long",
          msg: `${this.question.question_text}长度不能大于${
            this.question.validation.maxLength
          }`
        });
      } else {
        this.$store.commit("submit", {
          questionId: this.question.id,
          result: this.message
        });
        // {
        //   questionId: this.question.id,
        //   value: that.message
        // });
      }
    }
  }
};
</script>

<style scoped>
.text {
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
}

input[type="text"] {
  margin-top: 16px;
  text-align: center;
  line-height: 2;
}

button {
  width: 200px;
  margin-top: 16px;
  font-size: 16px;
  inline-size: 2;
  color: blue;
  background-color: #ccc;
  border-radius: 5px;
}
</style>

