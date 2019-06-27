<template>
  <article id="advice">
    <header class="top">
      <h5>
        你的
        <span class="subject">个人营养报告</span>
      </h5>
      <p>请尽量遵循LemonBox为你定制的健康建议，逐步改善饮食和生活习惯，从而减少每日服用的营养补剂种类。</p>
    </header>
    <main class="content">
      <h5 class="title">个人营养建议</h5>
      <p class="summary">{{report.outSuggestionSummary}}</p>
      <ul class="details">
        <li
          is="Aspect"
          v-for="(value, key) in suggestions"
          :key="key"
          :category="key"
          :suggestion="value"
        />
      </ul>
    </main>
    <footer class="bottom">
      <p>我们推荐在</p>
      <p class="time">3个月后</p>
      <p>（或已经明显改善生活习惯或有新的体检结果后）</p>
      <p>重新填写个人营养问卷</p>
      <p>以便根据你的情况降低补剂种类和数量</p>
      <button class="btn">立即购买</button>
    </footer>
  </article>
</template>

<script>
import Aspect from "./Aspect.vue";

export default {
  components: {
    Aspect
  },

  props: {
    report: Object
  },

  computed: {
    suggestions() {
      const obj = {};
      this.report.OutSuggestion.forEach(item =>
        obj[item.category]
          ? obj[item.category].push(item.Suggestion)
          : (obj[item.category] = [item.Suggestion])
      );
      return obj;
    }
  }
};
</script>

<style scoped>
#advice {
  padding: 8px;
}

.top {
  line-height: 1.5;
  background: pink;
}

.subject {
  font-size: 14px;
}

.content {
  margin: 8px 0;
  line-height: 1.25;
}

.title {
  line-height: 1.5;
}

.summary {
}

.details {
}

.bottom {
  font-size: 14px;
  line-height: 1.25;
  text-align: center;
}

.time {
}

.btn {
  margin-top: 8px;
  font-size: 14px;
  line-height: 1.25;
  background: yellow;
  border-radius: 5px;
}
</style>

