<template>
	<div class="merchant-container">
		<van-nav-bar left-arrow @click-left="goback">
			<template #title>
				<span>{{ shopName }}</span>
			</template>
		</van-nav-bar>
		<div class="content">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
			  <van-swipe-item>1</van-swipe-item>
			  <van-swipe-item>2</van-swipe-item>
			  <van-swipe-item>3</van-swipe-item>
			  <van-swipe-item>4</van-swipe-item>
			</van-swipe>
			<van-tabs v-model="activeName">
				<van-tab title="点餐" name="order">
					<van-index-bar :index-list="indexList">
						<van-index-anchor index="1">标题1</van-index-anchor></van-index-anchor>
						<van-cell title="文本1" />
						<van-cell title="文本2" />
						<van-cell title="文本1" />
						<van-cell title="文本2" />
						<van-cell title="文本1" />
						<van-cell title="文本2" />
						<van-cell title="文本1" />
						<van-cell title="文本2" />
						<van-cell title="文本1" />
						<van-cell title="文本2" />
						<van-index-anchor index="2">标题2</van-index-anchor>
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-cell title="文本21" />
						<van-cell title="文本22" />
						<van-index-anchor index="3">标题3</van-index-anchor>
						<van-cell title="文本31" />
						<van-cell title="文本32" />
						<van-cell title="文本31" />
						<van-cell title="文本32" />
						<van-cell title="文本31" />
						<van-cell title="文本32" />
						<van-cell title="文本31" />
						<van-cell title="文本32" />
						<van-cell title="文本31" />
						<van-cell title="文本32" />
						<van-cell title="文本31" />
						<van-cell title="文本32" />
					</van-index-bar>
					<!-- <van-card
						v-for="(item, index) in goodMenu"
						:price="item.price"
						:desc="item.desc"
						:title="item.title"
						:thumb="item.thumb"
					>
						<template #num>
							<van-stepper v-model="item.num" theme="round" disable-input />
						</template>
					</van-card> -->
				</van-tab>
				<van-tab title="商家" name="shop"></van-tab>
			</van-tabs>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="cart" @click="onClick" />
			<span>￥1889</span>
			<van-goods-action-button type="primary" text="去结算" />
		</van-goods-action>

		<van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
	</div>
</template>

<script>
export default {
	name: 'merchant',
	data() {
		return {
			shopName: '麻辣小龙虾',
			activeName: "order",
			show: false,
			indexList: [1, 2, 3],
			goodMenu: [
				{
					num: 0,
					price: 10,
					desc: "test",
					title: "test",
					thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
				}
			]
		}
	},
	methods: {
		goback() {
			// 
		},
		onClick() {
			if (this.show) {
				this.show = false
			} else {
				this.show = true
			}
		},
		onChange(index) {
			Notify({ type: 'primary', message: index})
		}
	}
}
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-goods-action {
	z-index: 9999;
}
</style>
