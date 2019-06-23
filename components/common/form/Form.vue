<template>
  <form action="">
    <p>
      <label for="username"><i class="fa fa-user" /></label>
      <input type="text" name="username" placeholder="昵称" />
    </p>
    <p>
      <label for="email"><i class="fa fa-envelope" /></label>
      <input type="email" name="email" placeholder="邮箱" />
    </p>
    <p>
      <label for="password"><i class="fa fa-key" /></label>
      <input type="password" name="password" placeholder="密码" />
    </p>
    <p>
      <label for="auto">7天内自动登录</label>
      <input type="checkbox" name="auto" value="true" />
    </p> 
    <p>
      <button type="submit">登录</button>
      <nuxt-link to="/forget">忘记密码？</nuxt-link>
    </p>
  </form>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  form {
    text-align: center;
    line-height: 2;
  }

  label {
    margin-right: 5px;
    color: #409eff;
  }

  input {
    width: 50%;
  }

  button {
    padding: 5px;
    margin-right: 35px;
    color: white;
    background-color: #409eff;
    border-radius: 50%;
  }
</style>