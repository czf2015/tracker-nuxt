<template>
  <div id="report">
    <section class="page1">
      <Card :report="report"/>
      <Present/>
      <Poster/>
    </section>
    <section class="page2">
      <Recipe :QuantNutrition="report.QuantNutrition"/>
      <Options :options="report.OptionalList"/>
    </section>
    <section class="page3">
      <Advice :report="report"/>
    </section>
  </div>
</template>

<script>
import Card from "@/components/report/Card.vue";
import Present from "@/components/report/Present.vue";
import Poster from "@/components/report/Poster.vue";
import Recipe from "@/components/report/Recipe.vue";
import Options from "@/components/report/Options.vue";
import Advice from "@/components/report/Advice.vue";

export default {
  asyncData({ params }) {
    // debugger;
    console.log(window.sessionStorage.getItem(params.id));
    return {
      report: JSON.parse(window.sessionStorage.getItem(params.id))
    };
  },

  components: {
    Card,
    Present,
    Poster,
    Recipe,
    Options,
    Advice
  }
};
</script>

<style scoped>
#report {
  max-width: 375px;
}
</style>

