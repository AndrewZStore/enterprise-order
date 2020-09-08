<template>
	<div class="confirm-container">
		<div class="header-background">
		</div>
		<div class="nav-bar">
			<van-nav-bar
				:left-arrow=true
				:border=false
				@click-left="goback"
				style="background-color:transparent;"
			>
				<template #left>
					<van-icon name="arrow-left" color="white" size="18px" />
				</template>
				<template #title>
					<span class="nav-title">确认订单</span>
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
					<van-action-sheet v-model="addrSelectVisible" title="选择收货地址">
						<div class="action-sheet-content">
							<van-radio-group v-model="addressSeclect" v-for="(item, i) in addrs">
							  <van-radio icon-size="15px" :name="item.name">{{ item.name }}</van-radio>
							</van-radio-group>
						</div>
						<div class="action-sheet-button">
							<van-button type="info" @click="selectSubmit">确定</van-button>
						</div>
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
			<ul>
		        <li v-for="(item, j) in items" :key="j">
		          <div class="card">
		          	<van-row>
			          	<van-col :span="6">
				            <van-image :src="item.thumb" />
			  			</van-col>
			  			<van-col :span="10">
				            <span class="card-title">{{ item.title }}</span>
			  			</van-col>
			  			<van-col :span="2">
				            <span class="card-num">x{{ item.num }}</span>
			  			</van-col>
			  			<van-col :span="3"></van-col>
			  			<van-col :span="3">
				  			<div class="card-total-price">
					  			<span class="currency-symbol">￥</span>
						        <span class="card-price">{{ item.price }}</span>
						    </div>
			  			</van-col>
			  		</van-row>
		          </div>
		        </li>
		    </ul>
			<van-row>
				<van-col :span="12">
					<span class="total-text"><b>总金额：</b></span>
				</van-col>
				<van-col :span="12">
					<div class="total-value">
						<span class="currency-symbol">￥</span>
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
			addressSeclect: '',
			addrs: [
				{ name: '嘉定区人民街200弄' },
				{ name: '嘉定区人民街201弄' },
				{ name: '嘉定区人民街202弄' }
			],
			items: [
				{
					"num": 2,
					"thumb": "https://img.yzcdn.cn/vant/cat.jpeg",
					"price": 12,
					"title": "香菇肉丝"
				}, {
					"num": 2,
					"thumb": "https://img.yzcdn.cn/vant/cat.jpeg",
					"price": 12,
					"title": "香菇肉丝"
				}, {
					"num": 2,
					"thumb": "https://img.yzcdn.cn/vant/cat.jpeg",
					"price": 12,
					"title": "香菇肉丝"
				}
			]
		}
	},
	methods: {
		// 返回
		goback() {
			//
		},
		// 地址选择
		addrSelecter(item) {
			this.addressNow = item.name
		},
		selectSubmit() {
			if (this.addressSeclect) {
				this.addressNow = this.addressSeclect
			}

			this.addrSelectVisible = false
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

.nav-title {
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

.user-info {
	padding: 20px 20px;
}

.footer {
	padding: 20px 20px;
}

.merchantName {
	font-size: 42px;
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

span.currency-symbol {
	font-size: 28px;
}

span.total-num {
	font-size: 48px;
}

.submit {
	width: 700px;
    height: 100px;
	font-size: 32px;
	color: white;
	background-color: #49b5e9;
	border-radius: 10px;
}

.van-image {
	width: 130px;
	height: 130px;
}

span.card-title, span.card-num {
	font-size: 30px;
}

span.card-price {
	font-size: 40px;
}

.card .van-row {
	display: -webkit-flex;
	display: flex;
	-webkit-align-items: center;
	align-items: center;
}

.van-action-sheet__header {
	padding-top: 40px;
	padding-bottom: 30px;
    font-size: 36px;
}

.action-sheet-content span.van-radio__label {
    font-size: 30px;
    padding-left: 10px;
}

.action-sheet-content .van-radio {
    padding: 0 30px 30px 30px;
}

.action-sheet-button {
	margin: 0 auto;
    width: 94%;
    padding-top: 10px;
    padding-bottom: 10px;
}

.action-sheet-button button.van-button.van-button--info.van-button--normal {
    width: 700px;
    height: 100px;
    font-size: 32px;
    color: white;
	background-color: #48b1e1;
    border-radius: 10px;
}
</style>