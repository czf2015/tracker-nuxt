<template>
  <section class="checkbox">
    <div class="select" v-for="option in options" :key="option.option_id">
      <input
        type="checkbox"
        id="option.id"
        :value="option.id"
        v-model.number="checked"
        @click="turn(option)"
      >
      <label for="option.id">{{option.text}}</label>
    </div>
    <button @click="next(checked)">提交</button>
  </section>
</template>

<script>
import { isOption } from "../../utils/prerequisite.js";

const cancel = ["无"];

export default {
  props: {
    question: Object,
    r: Object,
    errorMsg: String
  },

  data() {
    return {
      checked: this.$store.state.answers[this.$store.state.questionId] || []
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
      const that = this;
      if (that.question.validation.required && val.length === 0) {
        that.$emit("error", {
          type: null,
          msg: `请选择合适的选项`
        });
      } else if (
        that.question.validation.minOptionsNumber !== -1 &&
        val.length < that.question.validation.minOptionsNumber
      ) {
        that.$emit("error", {
          type: "less",
          msg: `选项数不能少于${that.question.validation.minOptionsNumber}个`
        });
      } else if (
        that.question.validation.maxOptionsNumber !== -1 &&
        val.length > that.question.validation.maxOptionsNumber
      ) {
        that.$emit("error", {
          type: "more",
          msg: `选项数不能多于${that.question.validation.maxOptionsNumber}个`
        });
      } else {
        that.$store.commit("submit", {
          questionId: that.question.id,
          value: val
        });
      }
    },
    // 绑定--参数
    turn(option) {
      if (cancel.includes(option.text)) {
        this.checked = [option.id];
      } else {
        // 过滤 <- 定位
        const no = this.options.find(item => cancel.includes(item.text));
        if (no) {
          this.checked = this.checked.filter(item => item !== no.id);
        }
      }
    }
  }
};
</script>

<style scoped>
.checkbox {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}

.select {
  margin-top: 8px;
  line-height: 2;
}

/**
 * Toggle buttons
 */

/* input[type="checkbox"] {
  position: absolute;
  clip: rect(0, 0, 0, 0);
}

input[type="checkbox"] + label {
  display: inline-block;
  padding: 0.35em 0.5em 0.2em;
  width: 300px;
  background: #ccc;
  background-image: linear-gradient(#ddd, #bbb);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  box-shadow: 0 1px white inset;
  text-align: center;
  text-shadow: 0 1px 1px white;
  cursor: pointer;
} */

/* input[type="checkbox"]:checked + label,
input[type="checkbox"]:active + label {
  box-shadow: 0.04em 0.1em 0.2em rgba(0, 0, 0, 0.6) inset;
  border-color: rgba(0, 0, 0, 0.3);
  background: #bbb;
} */

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
