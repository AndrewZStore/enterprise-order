<template>
	<div class="pwdBg">
		<div class="nav-bar pwd-bar">
			<van-nav-bar
				:border="false"
				:left-arrow=true
				@click-left="goback"
				style="background-color:transparent;"
				>
				<template #left>
					<van-icon name="arrow-left" size="18px" />
				</template>
				<template #title>
					<span class="nav-title">修改密码</span>
				</template>
			</van-nav-bar>
		</div>

		<div class="modifyCont">
			<van-field v-model="userName" label="请输入账号：" />
			<van-field v-model="newPwd" label="请输入新密码：" />
			<van-button type="primary" @click='submit'>提交</van-button>
		</div>
	</div>
</template>

<script>
	import { modifyPwd } from '@/api/user'
	import { encrypt } from '@/utils/encrypt'
	import { Toast } from 'vant'
	export default {
		name: 'ModifyPwd',
		data() {
			return {
				userName: '',
				newPwd: ''
			}
		},
		methods: {
			// 返回
			goback() {
				this.$router.go(-1)
			},
			submit() {
				modifyPwd({ userName: this.userName, password: encrypt(this.newPwd) }).then(resp => {
					Toast.success(resp.msg)
					this.$router.push({ path:'/my'  })
				})
			}
		}
	}
</script>

<style>
.pwdBg {
	background: #f5f5f5;
	min-height: 100vh;
}
	.pwd-bar {
  	padding-top: 20px;
  	padding-bottom: 20px;
  	transform: translateZ(0);
		-webkit-transform: translateZ(0);
		background: #fff;
		margin-bottom: 15px;
	}
	.pwd-bar .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 1rem;
	}
	.pwd-bar .nav-title {
		font-size: 36px;
	}
	.modifyCont .van-field__label {
		width: 180px;
		font-size: 25px;
		line-height: 70px;
	}
	.modifyCont .van-field__body {
		font-size: 25px;
		line-height: 70px;
	}
	.modifyCont .van-button {
		display: block;
    margin: 0 auto;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
    margin-top: 25px;
    width: 150px;
	}
</style>