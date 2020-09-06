<template>
	<div class="confirm-container">
		<div class="header-background">
		</div>
		<div class="nav-bar">
			<van-nav-bar
				:left-arrow=true
				:border=false
				@click-left="onback"
				style="background-color:transparent;"
			>
				<template #left>
					<van-icon name="arrow-left" color="white" size="18px" />
				</template>
				<template #title>
					<span class="title">确认订单</span>
				</template>
			</van-nav-bar>
		</div>
		<div class="user-info">
			<div class="merchantName">
				<span><b>{{ merchantName }}</b></span>
			</div>
			<van-row>
				<van-col span="8">
					<span class="info">订单配送至</span>
				</van-col>
				<van-col span="16">
					<span class="info info-value van-ellipsis" style="color:#57a6fc;" @click="addrSelectVisible = true">{{ addressNow }}<van-icon name="arrow" /></span>
					<van-action-sheet
						v-model="addrSelectVisible"
						:actions="addrs"
						title="选择收货地址"
						close-on-click-action
						@select="addrSelecter"
					>
					</van-action-sheet>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">{{ contact }}</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">{{ phone }}</span>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">配送时间：</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">2020-08-01 晚餐</span>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">支付方式：</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">货到付款</span>
				</van-col>
			</van-row>
		</div>
		<div class="footer van-hairline--surround">
			<van-card
			  num="2"
			  price="2.00"
			  title="商品标题"
			  thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
			>
			</van-card>
			<van-card
			  num="2"
			  price="2.00"
			  title="商品标题"
			  thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
			>
			</van-card>
			<van-card
			  num="2"
			  price="2.00"
			  title="商品标题"
			  thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
			>
			</van-card>
			<van-row>
				<van-col :span="12">
					<span class="total-text"><b>总金额：</b></span>
				</van-col>
				<van-col :span="12">
					<div class="total-value">
						<span class="total-symbol">￥</span>
						<span class="total-num">297</span>
					</div>
				</van-col>
			</van-row>
		</div>
		<div class="submit-button">
			<van-button class="submit">提交订单</van-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'confirmOrder',
	data() {
		return {
			merchantName: '麻辣小龙虾（普陀店）',
			contact: '张先生',
			phone: '13457854512',
			addrSelectVisible: false,
			addressNow: '地址选择',
			addrs: [
				{ name: '嘉定区人民街200弄asdfasdfasdfasfasdfsadfasasdfasdf' },
				{ name: '嘉定区人民街201弄' }
			]
		}
	},
	methods: {
		// 返回
		onback() {
			//
		},
		// 地址选择
		addrSelecter(item) {
			this.addressNow = item.name
		}
	}
}
</script>

<style>
.confirm-container {
	width: 100%;
	height: 100%;
}

.header-background {
	width: 100%;
	height: 300px;
	background-color: #49b5e9;
	position: absolute;
	z-index: -1;
}

.nav-bar {
    padding-top: 30px;
    padding-bottom: 20px;
}

.title {
	color: white;
	font-size: 36px;
}

.user-info, .footer, .submit-button {
	margin: 0 auto;
	width: 94%;
	background-color: white;
	border-radius: 15px;
	margin-top: 15px;
	box-shadow: 0 0 1px 1px #efefef;
}

.user-info, .footer {
	padding: 20px 30px;
}

.merchantName {
	font-size: 42px;
	margin: 20px 0;
	letter-spacing: 2px;
}

.van-row {
	margin: 30px 0;
}

span.info {
	font-size: 30px;
	letter-spacing: 1px;
	color: #333333;
}

span.info-value {
	display: block;
	text-align: right;
}

span.total-text {
	font-size: 48px;
}

div.total-value {
	color: #fb5443;
	display: block;
	text-align: right;
}

span.total-symbol {
	font-size: 28px;
}

span.total-num {
	font-size: 48px;
}

.submit {
	width: 100%;
	font-size: 32px;
	color: white;
	background-color: #49b5e9;
	padding: 50px;
	margin-top: 10px;
	border-radius: 10px;
}
</style>