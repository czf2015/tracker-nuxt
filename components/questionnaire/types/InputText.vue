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
      const that = this;
      if (that.question.validation.required && that.message.length === 0) {
        that.$emit("error", {
          type: "null",
          msg: `请输入${that.question.text}`
        });
      } else if (
        that.question.validation.minLength !== -1 &&
        that.message.length < that.question.validation.minLength
      ) {
        that.$emit("error", {
          type: "short",
          msg: `${that.question.question_text}长度不能小于${
            that.question.validation.minLength
          }`
        });
      } else if (
        that.question.validation.maxLength !== -1 &&
        that.message.length > that.question.validation.maxLength
      ) {
        that.$emit("error", {
          type: "long",
          msg: `${that.question.question_text}长度不能大于${
            that.question.validation.maxLength
          }`
        });
      } else {
        that.$store.commit("submit", {
          questionId: that.question.id,
          value: that.message
        });
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

