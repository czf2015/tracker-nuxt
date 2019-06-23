<template>
  <div :style="">
    <button
      v-for="tab in tabs"
      :key="tab"
      :class="['tab-button', { active: currentTab === tab }]"
      @click="currentTab = tab"
    >{{ tab }}</button>

    <component
      :is="currentTabComponent"
      class="tab"
    />
  </div>
</template>

<script>
import Candlestick from '@/components/common/chart/Candlestick.vue'
import Calendar from '@/components/common/chart/Calendar.vue'

export default {
  components: {
    Candlestick,
    Calendar
  },
  data() {
    return {
      tabs: ['Candlestick', 'Calendar'],
      currentTab: 'Candlestick'
    }
  },
  computed: {
    currentTabComponent() {
      return this.currentTab.toLowerCase()
    }
  }
}
</script>

<style scoped>
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
