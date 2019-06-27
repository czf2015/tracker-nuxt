<template>
  <section id="account">
    <a href="/register" :disabled="isOnline">注册</a>
    <a href="/login" v-show="!isOnline">登陆</a>
    <button @click.prevent="logout" v-show="isOnline">退出</button>
  </section>
</template>

<script>
import api from "@/utils/api.vue";

export default {
  props: {
    isOnline: Boolean
  },

  methods: {
    logout() {
      const that = this;
      api
        .post("/v1/logout")
        .then(res => {
          if (res.data.status === "success") {
            that.isOnline = false;
            alert(res.data.result);
            window.location.href = "/questionnaire";
          } else {
            console.log(res.data.error);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
#account {
}

button {
  padding: 5px 8px;
  background: red;
}
</style>
