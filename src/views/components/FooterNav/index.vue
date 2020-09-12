<template>
	<div class="footer-nav">
		<van-tabbar v-model="active" active-color="#4b4b4b" inactive-color="#4b4b4b">
		  <van-tabbar-item name="order" replace to="/home">
		  	<span>点餐</span>
		  	<template #icon="props">
			  	<svg-icon :icon-class="props.active ? 'meal' : 'meal-outlined'" />
			</template>
		  </van-tabbar-item>
		  <van-tabbar-item name="me" replace to="/my">
		  	<span>我的</span>
		  	<template #icon="props">
		  		<svg-icon :icon-class="props.active ? 'user-smile-fill' : 'user-smile-line'" />
		  	</template>
		  </van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
	name: 'footerNava',
	props: ["activePage"],
	data() {
		return {
			active: this.activePage
		}
	}
}
</script>

<style>
	.van-tabbar {
		height: 110px;
	}
	.van-tabbar-item__text {
		font-size: 22px;
		color: #4b4b4b;
	}

	.footer-nav .svg-icon {
	  width: 40px !important;
	  height: 40px !important;
	}
</style>