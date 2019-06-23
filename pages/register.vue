<template>
  <article id="register">
    <header id="register-header">
      <a href="/">首页</a>
      <a href="/login">登录</a>
    </header>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
      margin="20px"
    >
      <el-form-item
        label="昵称"
        prop="name"
      >
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
      >
        <el-input v-model="ruleForm.email" />
        <el-button
          size="mini"
          round
          @click="sendMsg"
        >
          发送验证码
        </el-button>
        <span class="status">{{ statusMsg }}</span>
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="code"
      >
        <el-input
          v-model="ruleForm.code"
          maxlength="4" 
        />
      </el-form-item>
      <el-form-item
        label="密码"
        prop="pwd"
      >
        <el-input
          v-model="ruleForm.pwd"
          type="password" 
        />
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="cpwd"
      >
        <el-input
          v-model="ruleForm.cpwd"
          type="password" 
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="register"
        >
          同意以下协议并注册
        </el-button>
        <div class="error">{{ error }}</div>
      </el-form-item>
      <el-form-item>
        <a
          href="http://www.meituan.com/about/terms"
          target="_blank"
        >
          《***网用户协议》
        </a>
      </el-form-item>
    </el-form>
  </article>
</template>


<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data() {
    const _this = this
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [{
          required: true,
          type: 'string',
          message: '请输入昵称',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'email',
          message: '请输入邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator(rule, value, callback) {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== _this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    sendMsg() {
      const _this = this
      let namePass
      let emailPass

      _this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })

      _this.statusMsg = ''

      if (namePass) {
        return false
      }

      _this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })

      if (emailPass) {
        return false
      }

      if (!namePass && !emailPass) {
        _this.$axios.post('/users/verify', {
          username: encodeURIComponent(_this.ruleForm.name),
          email: _this.ruleForm.email
        }).then(({status, data}) => {
          if (status === 200 && data && data.code === 0) {
            let count = 60

            _this.timerid = setInterval(() => {
              if (count === 0) {
                clearInterval(_this.timerid)
              } else {
                _this.statusMsg = `验证码已发送, 剩余${--count}秒`
              }
            }, 1000)
          } else {
            _this.statusMsg = data.msg
          }
        })
      }
    },
    register() {
      const _this = this
      _this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          _this.$axios.post('/users/register', {
            username: window.encodeURIComponent(_this.ruleForm.name),
            password: CryptoJS.MD5(_this.ruleForm.pwd).toString(),
            email: _this.ruleForm.email,
            code: _this.ruleForm.code
          }).then(({status, data}) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/login'
              } else {
                _this.error = data.msg
              }
            } else {
              _this.error = `服务器出错，错误码: ${status}`
            }

            setTimeout(() => {
              _this.error = ''
            }, 1000)
          })
        }
      })
    }
  }
}
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
