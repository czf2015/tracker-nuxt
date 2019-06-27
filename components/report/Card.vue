<template>
  <section class="card">
    <p class="stamp">{{report.submitDate}}</p>
    <figure class="user">
      <img class="user-portrait" src alt="user-portrait">
      <figcaption class="user-info">
        <span class="user-name">{{report.userInfo.name}}</span>
        <span class="user-gender">{{report.userInfo.gender}}</span>
      </figcaption>
    </figure>
    <div class="targets">
      <h5 class="targets-title">当前营养目标：</h5>
      <p class="targets-icons">
        <span v-for="(icon, index) in report.targetsIcons" :key="index">
          <img class="icon" :src="icon">
        </span>
      </p>
      <p class="targets-content">{{report.targets}}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    report: Object
  }
};
</script>

<style scoped>
.card {
  padding: 16px;
  max-width: 375px;
  background: #fff8ed;
  border-radius: 3px;
}

.stamp {
  font-size: 14px;
  line-height: 1.5;
  background: linear-gradient(#fff8ed 60%, yellow 100%);
  /* background-size: 100% 12px; */
}

.user {
}

.user-portrait {
}

.user-info {
}

.user-name {
  font-weight: bold;
  font-size: 24px;
}

.user-gender {
  font-size: 12px;
}

.targets {
}

.targets-title {
  font-size: 16px;
  line-height: 1.5;
}

.targets-icons {
  height: 20px;
}

.icon {
  width: 16px;
  margin-left: 8px;
}

.targets-content {
  font-size: 12px;
  line-height: 1.5;
  color: #ccc;
}
</style>
