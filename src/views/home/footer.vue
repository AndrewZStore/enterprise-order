<template>
	<van-tabbar v-model="active">
	  <van-tabbar-item icon="home-o">点餐</van-tabbar-item>
	  <van-tabbar-item icon="search">我的</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	export default {
		name: 'menus',
		props: []
	}
</script>

<style>
	.van-tabbar {
		height:100px;
	}
	.van-tabbar-item__text {
		font-size: 28px;
		color: #4b4b4b;
	}
	.van-icon-home-o::before {
    background: url(../../assets/meal.png) no-repeat center;
    content: '';
    width: 50px;
    height: 50px;
    background-size: cover;
	}
	.van-icon-search::before {
    background: url(../../assets/me.png) no-repeat center;
    content: '';
    width: 50px;
    height: 50px;
    background-size: cover;
	}
</style>