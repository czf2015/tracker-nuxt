<template>
  <article id="wrapper">
    <header class="header">
      <a href="/">首页</a>
      <a href="/account/login">登录</a>
    </header>
    <main class="main">
      <form method="post" id="register">
        <fieldset>
          <legend>用户注册</legend>
          <label id="username">
            用户名：
            <input type="text" v-model="username" required>
          </label>
           <label id="email">
            邮箱：
            <input type="email" v-model="email" required>
          </label>
          <label id="password">
            密码：
            <input type="password" v-model="password" required>
          </label>
          <div class="center">
            <button @click.prevent="register">注册</button>
            <a href="#">其它登录</a>
          </div>
        </fieldset>
      </form>
    </main>
    <footer class="footer"></footer>
  </article>
</template>


<script>
import md5 from "js-md5";
import api from '~/utils/api.js'
import { interval } from "~/mock/TIME.js";

export default {
  layout: "blank",

  data() {
    return {
      username: "",
      password: "",
      email: "",
      code: "",
      error: "",
      statusMsg: ""
    };
  },

  methods: {
    // 
    sendMsg() {
      api
        .post("account/verify", {
          username: encodeURIComponent(this.username),
          email: this.email
        })
        .then(({ status, data }) => {
          if (status === 200 && data) {
            const { code, msg } = data;

            if (code === 0) {
              let count = 60;

              const timer = setInterval(() => {
                if (count === 0) {
                  clearInterval(timer);
                } else {
                  this.statusMsg = `验证码已发送, 剩余${--count}秒`;
                }
              }, interval);
            } else {
              this.statusMsg = msg;
            }
          }
        });
    },
    // 
    register() {
      api
        .post('account/register', {
          username: encodeURIComponent(this.username),
          password: md5(this.password),
          email: this.email,
          code: this.code
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = "/account/login";
            } else {
              this.error = data.msg;
            }
          } else {
            this.error = `服务器出错，错误码: ${status}`;
          }

          setTimeout(() => {
            this.error = "";
          }, 1000);
        })
        .catch(e => {
          console.log(e)
        });
    }
  }
};
</script>


<style scoped>
#register {
  margin: 0 10px;
}

#register-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
