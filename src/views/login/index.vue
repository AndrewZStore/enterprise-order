<template>
  <div class="login-container">
    <div class="background">
      <img :src="background" width="100%" height="100%"></img>
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登&nbsp;录</h3>
      </div>

      <div class="logo">
        <img src="@/assets/logo.jpg" width="75px" height="75px">
      </div>

      <div class="input-form">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
            clearable
          />
          <el-divider></el-divider>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          <el-divider></el-divider>
        </el-form-item>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-top:80px;padding:15px;" @click.native.prevent="handleLogin">登&nbsp;录</el-button>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      background:require("@/assets/logo-background.png"),
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log('hehh')
            this.$router.push({ path: this.redirect || '/home' })
            this.loading = false
          }).catch(err => {
            console.log(err)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style>
.login-container {
  width: 100%;
  height: 100%;
}

.background {
  width: 100%;
  height: 50%;
  z-index: -1;
  position: absolute;
}

.title {
  margin-top: 50px;
  text-align: center;
  color: white;
  font-size: 34px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 80px
}

.logo img {
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #efefef;
}

.el-form {
  width: 95%;
  max-width: 80%;
  margin: 0 auto;
  overflow: hidden;
}

.el-form-item {
  position: relative;
  margin-top: 80px;
  margin-left: 10px;
}

.el-divider {
  margin: 0 12px;
  width: 92%;
}

.input-form {
  padding-top: 35px;
  margin-top: 80px;
  background-color: white;
  border-radius: 3%;
}

.el-input {
  width: 85%;
}

.el-input input {
  border: 0;
  padding: 12px 5px 12px 5px;
}

.svg-container {
  padding: 6px 5px 6px 15px;
}

.show-pwd {
  position: absolute;
  right: 40px;
}

.el-button {
  background-color: #565656;
  font-size: 32px;
}
</style>
