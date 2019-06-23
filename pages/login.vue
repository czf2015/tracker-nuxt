<template>
  <article id="login">
    <header id="login-header">
      <a href="/">首页</a>
      <a href="/register">注册</a>
    </header>
    <form>
      <h4
        v-if="error"
        class="tips"
      >
        <i class="fa fa-exclamation-circle" />{{ error }}
      </h4>
      <el-input v-model="username" placeholder="用户名" prefix-icon="profile" />
      <el-input v-model="password" placeholder="密码" prefix-icon="password" type="password" />
      <p class="flex">
        <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
        <a href="/forget">忘记密码？</a>
      </p>
      <el-button type="success" size="mini" @click="login">
        登录
      </el-button>
    </form>
  </article>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  data() {
    return {
      checked: '',
      username: '',
      password: '',
      error: ''
    }
  },
  layout: 'blank',
  methods: {
    login() {
      const _this = this
      _this.$axios.post('/users/login', {
        username: window.encodeURIComponent(_this.username),
        password: CryptoJS.MD5(_this.password).toString()
      }).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.code === 0) {
            location.href = '/'
          } else {
            _this.error = data.msg
          }
        } else {
          _this.error = '服务器出错'
        }
      })
    }
  }
}
</script>

<style scoped>
#login {
  margin: 0 10px;
  text-align: center;
}

#login-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

form>* {
  margin: 10px 0;
}

.flex {
  display: flex;
  justify-content: space-around;
}
</style>
