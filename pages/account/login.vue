<template>
  <article id="login">
    <header>
      <a href="/">首页</a>
      <a href="/account/register">注册</a>
    </header>
    <form class="center">
      <legend>用户登录</legend>
      <span v-if="error" class="danger">
        <i class="fa fa-exclamation-circle" />
        {{ error }}
      </span>
      <p class>
        <label class="title">
          用户名：
          <input type="text" v-model="username" placeholder="用户名" />
        </label>
      </p>
      <p class>
        <label class="title">
          密码：
          <input type="password" v-model="password" placeholder="密码" />
        </label>
      </p>
      <p class>
        <label>
          <input type="radio" v-model="auto" />7天内自动登录
        </label>
        <a href="/account/forget">忘记密码？</a>
      </p>
      <p>
        <button @click.prevent="login">登录</button>
      </p>
    </form>
  </article>
</template>


<script>
import md5 from "js-md5";
import api from "~/utils/api.js";

export default {
  layout: "blank",

  data() {
    return {
      username: "",
      password: "",
      auto: false,
      error: ""
    };
  },

  methods: {
    login() {
      api
        .post("account/login", {
          username: encodeURIComponent(this.username),
          password: md5(this.password)
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              sessionStorage.setItem("auto", this.auto);
              location.href = "/";
            } else {
              this.error = data.msg;
            }
          } else {
            this.error = "服务器出错";
          }
        })
        .catch(e => {
          console.log(e)
        });
    }
  }
};
</script>

<style scoped>
#login {
  margin: 0 10px;
  text-align: center;
}

#login > header {
  display: flex;
  justify-content: space-between;
  /* padding: 20px; */
}

.center {
  /* margin: 10px 0; */
  /* display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; */
}

.flex {
  display: flex;
  justify-content: space-around;
}
</style>
