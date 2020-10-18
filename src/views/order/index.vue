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
				<span><b>{{ $route.params.shopName }}</b></span>
			</div>
			<van-row>
				<van-col span="8">
					<span class="info">订单配送至</span>
				</van-col>
				<van-col span="16">
					<span class="info info-value van-ellipsis" style="color:#57a6fc;" @click="addrSelect">{{ addressNow }}<van-icon name="arrow" /></span>
					<van-action-sheet v-model="addrSelectVisible" title="选择收货地址">
						<div class="action-sheet-content">
							<van-radio-group v-model="addressSeclect" v-for="(item, i) in addrs">
							  <van-radio icon-size="15px" :name="item.address">{{ item.address }}</van-radio>
							</van-radio-group>
						</div>
						<div class="action-sheet-button">
							<van-button type="info" @click="addrSelectSubmit">确定</van-button>
						</div>
					</van-action-sheet>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">{{ $store.getters.userName }}</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">{{ $store.getters.userPhone }}</span>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">配送时间：</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">{{ this.$store.getters.orderDate }}&nbsp;{{ eatTypeCn }}</span>
				</van-col>
			</van-row>
			<van-row>
				<van-col span="12">
					<span class="info">支付方式：</span>
				</van-col>
				<van-col span="12">
					<span class="info info-value">企业付款</span>
				</van-col>
			</van-row>
		</div>
		<div class="footer van-hairline--surround">
			<ul>
		        <li v-for="(item, j) in items" :key="j">
		          <div class="confirm-card">
		          	<van-row>
			          	<van-col :span="6">
				            <van-image :src="item.img" />
			  			</van-col>
			  			<van-col :span="10">
				            <span class="card-title">{{ item.name }}</span>
			  			</van-col>
			  			<van-col :span="2">
				            <span class="card-num">x{{ item.num }}</span>
			  			</van-col>
			  			<van-col :span="2"></van-col>
			  			<van-col :span="4">
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
						<span class="total-num">{{ totalPrice }}</span>
					</div>
				</van-col>
			</van-row>
		</div>
		<div class="submit-button">
			<van-button @click="onSubmit" class="submit">提交订单</van-button>
		</div>
	</div>
</template>

<script>
import { getAddress, submitOrder } from '@/api/user'
import { Notify } from 'vant'
import { Toast } from 'vant'

export default {
	name: 'confirmOrder',
	data() {
		return {
			// 控制地址选择面板是否显示
			addrSelectVisible: false,
			// 当前地址
			addressNow: '地址选择',
			// 地址选择器选择地址
			addressSeclect: '',
			// 当前订餐类型
			eatTypeCn: '',
			// 地址列表
			addrs: [],
			addrsTest: [
				{ name: '嘉定区人民街200弄' },
				{ name: '嘉定区人民街201弄' },
				{ name: '嘉定区人民街202弄' }
			],
			// 商品总价
			totalPrice: 0,
			// 下单商品列表
			items: [],
			itemsTest: [
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
	created() {
		this.items = this.$store.getters.shoppingCart
		this.items.forEach(e => {
			this.totalPrice += e.price * e.num
		})

		const eatType = this.$store.getters.currentEatType
		if (eatType == 'A') {
			this.eatTypeCn = '早餐'
		} else if (eatType == 'B') {
			this.eatTypeCn = '午餐'
		} else if (eatType == 'C') {
			this.eatTypeCn = '晚餐'
		} else if (eatType == 'D') {
			this.eatTypeCn = '下午茶'
		}
	},
	methods: {
		// 返回
		goback() {
			this.$router.go(-1)
		},
		// 地址选择
		addrSelect() {
			if (this.addrs.length == 0) {
				const params = { orgId: '100052155' }
				getAddress(params).then(resp => {
					this.addrs = resp.addressList
				})
			}
			this.addrSelectVisible = true
		},
		// 提交订单
		onSubmit() {
			if (this.addressNow == '地址选择') {
				// Notify('请选择送货地址')
				Toast.fail({
					message: '请选择送货地址',
					duration: 3000
				})
			} else {
				const params = {
					shopId: this.$store.getters.shopId,
					eatType: this.$store.getters.currentEatType,
					orgId: this.$store.getters.orgId,
					userId: this.$store.getters.userId,
					address: this.addressNow,
					openid: '',
					selectDate: this.$store.getters.orderDate,
					totalPrice: this.totalPrice,
					productJSON: this.$store.getters.shoppingCart
				}
				submitOrder(params).then(resp => {
					const toast = Toast.loading({
					  duration: 0, // 持续展示 toast
					  forbidClick: true,
					  message: '提交成功',
					});

					let second = 3;
					const timer = setInterval(() => {
					  if (second) {
					    toast.message = `返回首页 ${second} 秒`
					  } else {
					    clearInterval(timer)
					    // 手动清除 Toast
					    Toast.clear()
					    this.$router.push({name: 'home'})
					  }
					  second--
					}, 1000)
				}).catch(err => {
					Notify('提交失败，请重新提交')
				})
			}
		},
		// 地址选择确定
		addrSelectSubmit() {
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

.confirm-container .nav-bar {
    padding-top: 30px;
    padding-bottom: 20px;
}

.confirm-container .nav-title {
	color: white;
	font-size: 36px;
}

.confirm-container .user-info, .footer, .submit-button {
	margin: 0 auto;
	width: 94%;
	background-color: white;
	border-radius: 15px;
	margin-top: 15px;
	box-shadow: 0 0 1px 1px #efefef;
}

.confirm-container .user-info {
	padding: 20px 20px;
}

.confirm-container .footer {
	padding: 20px 20px;
}

.confirm-container .merchantName {
	font-size: 42px;
	letter-spacing: 2px;
}

.confirm-container .van-row {
	margin: 30px 0;
}

.confirm-container span.info {
	font-size: 30px;
	letter-spacing: 1px;
	color: #333333;
}

.confirm-container span.info-value {
	display: block;
	text-align: right;
}

.confirm-container span.total-text {
	font-size: 48px;
}

.confirm-container div.total-value {
	color: #fb5443;
	display: block;
	text-align: right;
}

.confirm-container span.currency-symbol {
	font-size: 28px;
}

.confirm-container span.total-num {
	font-size: 48px;
}

.confirm-container .submit {
	width: 700px;
    height: 100px;
	font-size: 32px;
	color: white;
	background-color: #49b5e9;
	border-radius: 10px;
	margin-top: 20px;
}

.confirm-container .van-image {
	width: 130px;
	height: 130px;
}

.confirm-card span.card-title, span.card-num {
	font-size: 30px;
}

.confirm-card span.card-price {
	font-size: 40px;
}

.confirm-card .van-row {
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

.van-toast {
	width: 220px;
	min-height: 200px;
	font-size: 30px;
}

.van-toast__icon {
    font-size: 60px;
}
</style>