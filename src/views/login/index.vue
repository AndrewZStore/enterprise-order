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
          :type="showPassword ? 'text' : 'password'"
          :border="false"
          placeholder="请输入密码"
          :rules="[{ required: true }]"
        >
          <template #left-icon>
            <svg-icon icon-class="password" />
          </template>
          <template slot="right-icon">
            <svg-icon :icon-class="showPassword ? 'eye-open' : 'eye'" @click="switchShowPassword" />
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
import { login, getOpenId } from '@/api/user'

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        openId: ''
      },
      loading: false,
      redirect: undefined,
      showPassword: false
    }
  },
  created() {
    this.getCode()
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
    },
    getCode() { // 非静默授权，第一次有弹框
      var local = window.location.href.split('#/')[0] // 获取页面url
      var appid = 'wx58871940ee66494f' 
      var code = this.getUrlCode().code // 截取code
      if (code == null || code === '') { // 如果没有code，则去请求
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      } else {
        getOpenId({ code: code }).then(resp => {
          data = resp.userDTO
          this.loginForm.openId = data.openId
          this.$store.commit('SET_HEADIMG', data.img)
        })
      }
    },
    getUrlCode() { // 截取url中的code方法
        var url = location.search
        this.winUrl = url
        var theRequest = new Object()
        if (url.indexOf("?") != -1) {
            var str = url.substr(1)
            var strs = str.split("&")
            for(var i = 0; i < strs.length; i ++) {
                theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
            }
        }
        return theRequest
    },
    switchShowPassword() {
      this.showPassword = !this.showPassword
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
