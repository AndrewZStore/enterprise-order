<template>
  <div class="login-container">
    <div class="login-background">
      <van-image :src="require('@/assets/logo-background.png')" />
    </div>
    
    <van-form>
      <h1 class="login-title">登&nbsp;录</h1>
      <div class="login-logo">
        <van-image :src="require('@/assets/logo.jpg')" />
      </div>
      <div class="login-form">
        <van-field
          v-model="loginForm.username"
          placeholder="请输入账号"
          clearable
          :border="false"
          :rules="[{ required: true }]"
        >
          <template #left-icon>
            <svg-icon icon-class="user" />
          </template>
        </van-field>
        <van-divider />
        <van-field
          v-model="loginForm.password"
          type="password"
          :border="false"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        >
          <template #left-icon>
            <svg-icon icon-class="password" />
          </template>
        </van-field>
        <van-divider />
      </div>
      <div class="login-button">
        <van-button :loading="loading" loading-type="spinner" block type="info" native-type="submit" @click="handleLogin">
          登&nbsp;录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
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
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.loading = false
        this.$router.push({ path: this.redirect || '/home' })
      }).catch(err => {
        console.log(err)
        this.loading = false
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

.login-background {
  width: 100%;
  height: 550px;
  z-index: -1;
  position: absolute;
}

.login-background .van-image {
  width: 100%;
}

.login-title {
  margin-top: 0;
  padding-top: 40px;
  text-align: center;
  color: white;
  font-size: 34px;
}

.login-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  position: absolute;
  z-index: 999;
}

.login-logo img.van-image__img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0 1px 2px 1px #efefef;
}

.login-form {
  width: 650px;
  height: 450px;
  margin: 160px auto;
  background-color: white;
  border-radius: 15px;
  padding-top: 50px;
}

.login-form .svg-icon {
  width: 40px !important;
  height: 40px !important;
}

.login-form .van-field {
  position: relative;
  padding: 80px 30px 0 30px;
  border-radius: 15px;
}

.login-form input.van-field__control {
  font-size: 30px;
  padding-left: 20px;
  padding-top: 5px;
}

.login-form .van-icon {
  font-size: 30px;
}

.login-form .van-divider.van-divider--hairline {
    border-color: #999999;
    padding: 0px 30px;
}

.login-button button.van-button.van-button--info.van-button--normal.van-button--block {
  width: 650px;
  height: 90px;
  margin: 0 auto;
  background-color: #494b4d;
  font-size: 32px;
  border-radius: 15px;
}
</style>
