<template>
  <section class="page">
    <Prev class="prev" v-show="questionId !== 1" @step="handleStep"/>
    <Question :question="q[questionId]" :r="r" :key="questionId"/>
  </section>
</template>

<script>
import api from "@/utils/api.js";
import { convert, prerequisite } from "@/services/Questionnaire.js";
import Prev from "@/components/questionnaire/control/Prev.vue";
import Question from "@/components/questionnaire/Question.vue";

export default {
  async asyncData() {
    const q = {};
    const r = {};
    const [{ data: questions }, { data: relations }] = await Promise.all([
      api.get("questionnaire/questions"),
      api.get("questionnaire/relations")
    ]);
    questions.forEach(item => (q[item.id] = item));
    relations.forEach(item => (r[item.questionId] = item));
    return {
      q,
      r
    };
  },

  components: {
    Prev,
    Question
  },

  methods: {
    handleStep({ msg }) {
      let id = this.$store.state.questionId;

      if (msg === "prev") {
        do {
          id -= id === 3 ? 2 : 1;
        } while (!prerequisite(id, this.r, this.$store.state.answers));
        this.$store.commit("set", id);
      } else {
      }
    }
  },

  computed: {
    questionId() {
      const that = this;
      let id = that.$store.state.questionId;
      if (id <= 57) {
        while (!prerequisite(id, that.r, that.$store.state.answers)) {
          id += id === 1 ? 2 : 1;
        }
        that.$store.commit("set", id);
        return that.$store.state.questionId;
      } else {
        // 输出数据
        const output = {};
        const answers = that.$store.state.answers;
        // console.log(answers);
        Object.keys(answers).forEach(key => {
          output[key] = convert(that.q, answers, key);
        });
        // console.log(output);
        const openid = "okhMG0cb-prOSD2NTnAYBmHb4aw4";
        axios
          .post("questionnaire/answer", Object.assign(output, { openid }))
          .then(function(res) {
            // debugger;
            window.sessionStorage.setItem(openid, JSON.stringify(res.data));
            window.location.href = `http://localhost:3000/report/${openid}`;
          });
      }
    }
  }
};
</script>

<style scoped>
.page {
  position: relative;
  z-index: 99;
  width: 100%;
  height: 100%;
  padding: 0 8px;
}

.prev {
  position: absolute;
}
</style>
