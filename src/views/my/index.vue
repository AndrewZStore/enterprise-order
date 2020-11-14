<template>
	<div class="me-container">
		<!-- header -->
		<div class="header">
			<van-nav-bar title="我的"/>
			<div class="my-account">
        <van-image class="avater" :src="require('@/assets/head.png')" />
        <div class="user-info more">
          <p class="uname">{{ $store.getters.userName }}<i class="department">{{ $store.getters.deptName }}</i></p>
          <p class="unum">{{ $store.getters.userPhone }}</p>
      	</div>
			</div>
		</div>	

		<dl class="list">
	    <dd>
		    <router-link :to="{ name: 'orderList' }" class="react">
			    <div class="more-weak">
		        <i class="list-order"></i>个人账单
			    </div>
		    </router-link>
	    </dd>
	    <dd>
		    <router-link :to="{ name: 'password' }" class="react">
			    <div class="more-weak">
		        <i class="modify-pwd"></i>修改密码
			    </div>
		    </router-link>
	    </dd>
	    <dd>
		    <router-link :to="{ name: 'complain' }" class="react">
			    <div class="more-weak">
		        <i class="complain-icon"></i>投诉 / 建议
			    </div>
		    </router-link>
	    </dd>
	    <dd>
		    <a class="react" @click="onPhone">
			    <div class="more-weak">
		        <i class="phone-icon"></i>联系客服
			    </div>
		    </a>
	    </dd>
	    <dd>
		    <a class="react" @click="onLogout">
			    <div class="more-weak">
		        <i class="exit-icon"></i>退出登录
			    </div>
		    </a>
	    </dd>
		</dl>
		<footerNav :activePage="'me'" />

		<!-- 拨打电话 -->
		<van-dialog v-model="show" title="客服热线">
		  <p>客服电话1： <a :href="'tel:' + 16628532627">16628532627</a></p>
		  <p>客服电话2： <a :href="'tel:' + 18501798775">18501798775</a></p>
		</van-dialog>
	</div>
</template>

<script>
import footerNav from '@/views/components/FooterNav/index'
import { Toast, Dialog } from 'vant'

export default {
	name: "me",
	components: {
		footerNav
	},
	data() {
		return {
			show: false
		}
	},
	methods: {
		onPhone() {
			this.show = true
		},
		onLogout() {
			this.$store.dispatch('user/logout')
			this.$router.push(`/login`)
		}
	}
}
</script>

<style>
	.me-container .header {
		height: 350px;
		background: url(../../assets/mine-black.jpg) no-repeat center;
		color: #fff;
		background-size: 100%; 
	}

	.me-container .header .van-nav-bar {
		height: 100px;
		line-height:100px;
		background: transparent;
		padding: 25px 0;
	}

	.me-container .header .van-nav-bar__title {
		font-size: 40px;
		color: #fff;
		letter-spacing: 10px;
		margin-top: 20px;
	}

	[class*=van-hairline]::after {
		border-bottom:0;
	}

	.my-account {
	    color: #333;
	    position: relative;
	    display: block;
	    height: 160px;
	    position: relative;
	    padding-right: 20px;
		padding-bottom: 20px;
		margin-top: 50px;
	}

	.my-account .avater {
	    position: absolute;
	    top: 20px;
	    left: 40px;
	    width: 120px;
	    height: 120px;
	    border-radius: 50%;
	    border:1px solid #fff;
	}

	.my-account .user-info {
	    z-index: 1;
	    position: relative;
	    height: 100%;
	    padding: 25px 20px;
	    margin-right: 20px;
	    box-sizing: border-box;
	    padding-left: 200px;
	    font-size: 24px;
	    color: #fff;
	}

	.my-account .uname {
		font-size: 30px;
		margin: 5px 0;
	}

	.my-account .unum {
		font-size:24px;
	}

	.my-account .department {
		display: inline-block;
		color: #fff;
		border:1px solid #fff;
		font-size: 10px;
		font-style: normal;
	    padding: 4px 8px;
	    border-radius: 6px;
	    margin-left: 20px;
	}

	dl.list {
	    margin-top: 20px;
	    margin-bottom: 0;
	    background-color: #fff;
	}

	dl.list dd {
	    margin: 0;
	    border-bottom: 1px solid #DDD8CE;
	    overflow: hidden;
	    font-size: 35px;
	    font-weight: 400;
	    position: relative;
	    line-height: 40px;
	    padding-left: 90px;
	}

	dl.list dd>.react {
    	padding: 28px 20px;
	}

	.more-weak {
	    position: relative;
	    padding-right: 30px;
	    width: 100%;
	    box-sizing: border-box;
	}

	.more-weak:after {
	    position: absolute;
	    right: 25px;
	    top: 50%;
	    display: block;
	    content: '';
	    width: 30px;
	    height: 30px;
	    border-left: 4px solid #b5b5b5;
	    border-bottom: 4px solid #b5b5b5;
	    -webkit-transform: translateY(-50%) scaleY(0.7) rotateZ(-135deg);
	    -moz-transform: translateY(-50%) scaleY(0.7) rotateZ(-135deg);
	    -ms-transform: translateY(-50%) scaleY(0.7) rotateZ(-135deg);
	}

	.more-weak i {
		position: absolute;
		width: 50px;
		height: 50px;
		left: -65px;
	}

	.list-order {
		background: url(../../assets/icon-list.png) no-repeat center;
		background-size: 50px;
	}

	.modify-pwd {
		background: url(../../assets/icon-pwd.png) no-repeat center;
		background-size: 50px;
	}

	.complain-icon {
		background: url(../../assets/icon-advise.png) no-repeat center;
		background-size: 50px;
	}

	.exit-icon {
		background: url(../../assets/icon-exit.png) no-repeat center;
		background-size: 50px;
	}
	.phone-icon {
		background: url(../../assets/phone.png) no-repeat center;
		background-size: 48px;
	}
	.van-dialog {
		top: 40%;
		width: 70%;
		-webkit-transform: translate(-50%);
    transform: translate(-50%);
	}
	.van-dialog__header {
    padding-top: 2rem;
    font-weight: 500;
    line-height: 4rem;
    text-align: center;
    font-size: 40px;
	}
	.van-dialog__content {
		font-size: 30px;
		padding: 0 40px 20px;
	}
	.van-dialog__content p {
		margin: 10px 0;
	}
	.van-dialog__content p a {
		color: #4994df;
	}
	.van-dialog__footer button {
		font-size: 30px;
		line-height: 80px;
		height: 80px;
	}
</style>

