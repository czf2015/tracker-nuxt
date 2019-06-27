<template>
  <article class="question">
    <header class="question-header">{{question.title}}</header>
    <main class="question-content">
      <Sign :symbol="question.image" :context="question.text"/>
      <p v-if="errorMsg" class="error">{{errorMsg}}</p>
      <p class="remark">{{question.remark}}</p>
      <p class="remark">{{question.subRemark}}</p>
      <component
        :is="typeComponent[question.type]"
        :question="question"
        :r="r"
        @error="handleError"
      />
    </main>
  </article>
</template>

<script>
import Sign from "@/components/base/Sign.vue";
import InputText from "./types/InputText.vue";
import InputNumber from "./types/InputNumber.vue";
import Radio from "./types/Radio.vue";
import Checkbox from "./types/Checkbox.vue";
import ImgCheckbox from "./types/ImgCheckbox.vue";

export default {
  components: {
    Sign,
    InputText,
    InputNumber,
    Radio,
    Checkbox,
    ImgCheckbox
  },

  props: {
    question: Object,
    r: Object
  },

  data() {
    return {
      errorMsg: "",
      typeComponent: {
        TEXT: "InputText",
        POSITIVE_INTEGER: "InputNumber",
        RADIO: "Radio",
        CHECKBOX: "Checkbox",
        IMG_CHK: "ImgCheckbox"
        // RADIO_OTHER: "Radio" // 需要修改
      }
    };
  },

  methods: {
    handleError({ type, msg }) {
      this.errorMsg = msg;
    }
  }
};
</script>

<style scoped>
.question-header {
  height: 32px;
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 2;
}

.question-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.error {
  font-size: 12px;
  line-height: 2;
  color: red;
}

.remark {
  font-size: 12px;
  line-height: 2;
}
</style>
