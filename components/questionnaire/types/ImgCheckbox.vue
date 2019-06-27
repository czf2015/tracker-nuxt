<template>
  <section class="img-checkbox">
    <div class="flex-container">
      <div class="select" v-for="option in options" :key="option.option_id">
        <input
          type="checkbox"
          id="option.id"
          :value="option.id"
          v-model.number="checked"
          @click="turn(option)"
        >
        <label for="option.id">
          <Sign :symbol="option.image" :context="option.text"/>
        </label>
      </div>
    </div>
    <button @click="next(checked)">提交</button>
  </section>
</template>

<script>
import { isOption } from "../../utils/prerequisite.js";
import Sign from "../base/Sign.vue";

const cancle = ["无"];

export default {
  components: {
    Sign
  },

  props: {
    question: Object,
    r: Object
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
      if (cancle.includes(option.text)) {
        this.checked = [option.id];
      } else {
        // 过滤 <- 定位
        const no = this.options.find(item => cancle.includes(item.text));
        if (no) {
          this.checked = this.checked.filter(item => item !== no.id);
        }
      }
    }
  }
};
</script>

<style scoped>
.img-checkbox {
  text-align: center;
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}

.select {
  width: 33%;
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
