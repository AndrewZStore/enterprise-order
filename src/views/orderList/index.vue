<template>
	<div class="order-list-container">
		<van-nav-bar
		  title="订单"
		  right-text=""
		  left-arrow
		  @click-left="goback"
		  @click-right="exportExcel"
		/>

		<van-tabs v-model="activeName" @click="changeActive">
		  <van-tab title="支付成功" name="succeed">
			  <div class="tab-title" slot="title">支付成功</div>
	    	<div class="tab-content" v-for='item in shopList'>
		  		<div class="order-item">
			  		<div>
			  			<span class="shopName">{{ item.shopName }}</span>
			  			<van-tag plain type="success">已完成</van-tag>
			  		</div>
				    <div class="order">
				        <div class="left">
				        	<div class="img-ctn">
				        		<van-image class="deal-avatar" lazy-load fit="fill" :src="item.img">
						        	<template v-slot:loading>
						            <van-loading type="spinner" size="20" />
						          </template>
						          <template v-slot:error>加载失败</template>
						        </van-image>
				        	</div>
				        </div>
				        <div class="right">
				            <dl>
				                <dt class="title">
				                  <div>{{ item.productName }}</div>
				                  <span class="unitCost">{{ item.productPrice }}</span>
				                </dt>
	                      <dt class="item">x {{ item.productNum }}</dt>
				            </dl>
				        </div>
				    </div>
				    <div class="clearfix">
				    	<div class="orderTime">下单时间：<span>{{ item.createDate }}</span></div>
				    	<div class="settlement">共{{ item.productNum }}件商品，实付<i>￥{{ item.productPrice }}</i></div>
				    </div>
				    <span class="lookMore" @click="checkDetail(item)">查看详情</span>
		    	</div>
				</div>
		  </van-tab>
		  <van-tab title="已取消" name="cancel">
			  <div class="tab-title" slot="title">已取消</div>
		    	<div class="tab-content" v-for='item in shopList'>
			  		<div class="order-item">
				  		<div>
				  			<span class="shopName">{{item.shopName}}</span>
				  			<van-tag plain type="grey">已取消</van-tag>
				  		</div>
					    <div class="order">
					        <div class="left"><div class="img-ctn"><img class="deal-avatar" src=""></div></div>
					        <div class="right">
					            <dl>
					                <dt class="title">
					                  <div>{{item.productName}}</div>
					                  <span class="unitCost">{{item.productPrice}}</span>
					                </dt>
		                      <dt class="item">x {{item.productNum}}</dt>
					            </dl>
					        </div>
					    </div>
					    <div class="clearfix">
					    	<div class="orderTime">下单时间：<span>2020-08-01</span></div>
					    	<div class="settlement">共2件商品，实付<i>￥40.00</i></div>
					    </div>
					    <span class="lookMore">查看详情</span>
						</div>
					</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
import { getOrderList } from '@/api/user'

export default {
	data() {
		return {
			shopList: [],
			activeName: 'succeed'
		}
	},
	created() {
		this.getOrder()
	},
	methods: {
		// 返回
		goback() {
			this.$router.go(-1)
		},
		// 导出
		exportExcel() {

		},
		// 选项卡切换
		changeActive() {
			this.getOrder()
		},
		// 获得订单
		getOrder() {
			var state = ''
			if (this.activeName == 'succeed') {
				state = '02'
			}	else if (this.activeName == 'cancel') {
				state = '06'
			}
			getOrderList({ userId: this.$store.getters.userId, orderStatu: state }).then(resp => {
				this.shopList = resp.proList
			})
		},
		// 查询详情
		checkDetail(item) {
			this.$router.push({ name: 'orderDetail', params: { orderId: item.orderId } })
		}
	}
}
</script>

<style>
	.order-list-container .van-nav-bar{
		height: 100px;
		line-height: 100px;
		background: #4b4b4b;
	}
	.order-list-container .van-nav-bar__left i.van-icon, .van-nav-bar__text{
		color: #fff;
		font-size: 30px;
	}
	.order-list-container .van-nav-bar__title{
		color: #fff;
		font-size: 40px;
	}
	/**以上可共用**/
	.order-list-container {
		background-color: #f5f5f5;
	}
	.order-list-container .van-tabs--line .van-tabs__wrap {
		height: 90px;
		line-height: 90px;
		font-size: 30px;
	}
	.order-list-container .van-tabs__line{
		background-color: #4b4b4b;
	}
	.order-list-container .van-tabs__content{
		width: 95%;
		margin: 0 auto;
		margin-top: 20px;
		height: calc(100vh - 220px);
    	overflow: auto;
	}
	.order-list-container .order-item {
    box-sizing: border-box;
    padding: 15px 20px 85px;
    position: relative;
    overflow: visible;
    -webkit-transition: -webkit-transform .2s;
    background-color: #fff;
    border-radius: 10px;
	}
	.order-list-container .order-item .order {
    width: 100%;
    position: relative;
    margin: 10px 0;
	}
	.order-list-container .order-item .left {
    position: absolute;
    left: 0;
    top: 0;
    width: 84px;
	}
	.order-list-container .order-item .left .img-ctn {
    background: #f4f4f4;
    width: 85px;
    height: 85px
	}
	.order-list-container .order-item .left .img-ctn .van-image {
    width: 85px;
    height: 85px;
    border-radius: 8px;
	}
	.order-list-container .order-item .right {
    box-sizing: border-box;
    margin-left: 98px;
	}
	.order-list-container .order-item .right dl dt.title {
    color: #333;
    height: 55px;
    line-height: 55px;
    font-size: 30px;
    padding-bottom: 10px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
	}
	.order-list-container .order-item .right dl dt.title div:first-child {
    box-sizing: border-box;
    padding-right: .2rem;
    font-size: 30px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex: 1;
    width: 75%;
	}
	.order-list-container .order-item .right dl .item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 25px;
	}
	.order-list-container .shopName {
		width: 80%;
		display: inline-block;
		font-size: 30px;
	}
	.order-list-container .van-tag--plain {
		padding-top: 10px;
		float: right;
		font-size: 30px;
	}
	.order-list-container .van-tag--plain::before {
		border: none;
	}
	.order-list-container .van-tag--grey {
		color: #666666;
	}
	.order-list-container .clearfix {
		margin: 20px 0;
		color: #999;
		line-height: 38px;
	}
	.order-list-container .orderTime {
		float: left;
		font-size: 18px;
	}
	.order-list-container .settlement {
		float: right;
		font-size: 28px;
	}
	.order-list-container .settlement i{
		font-size: 32px;
		font-style: normal;
		color: #000;
	}
	.order-list-container .lookMore {
		border-radius: 20px;
		border: 1px solid #4b4b4b;
		padding: 15px 30px;
		margin-bottom: 15px;
		float: right;
	}

	.tab-content {
		margin-bottom: 20px;
	}
</style>