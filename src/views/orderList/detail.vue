<template>
	<div class="order-detail">
		<van-nav-bar
		  title="订单详情"
		  left-arrow
		  @click-left="goback"
		/>

		<div>
			<div class="order-menu-block">
				<div class="shopinfo">
					<div class="name"><span class="name-txt">{{ orderDetail.shopName }}</span></div>
				</div>
				<div class="dishitem" v-for="item in orderDetail.productList">
          <span class="proImg">
            <img src="">
          </span>
          <span class="name">★★{{ item.productName }}★★</span>
          <span class="count">{{ item.productNum }}份</span>
          <span class="price">¥{{ item.productPrice }}</span>
        </div>
				<div class="actual"><span class="label">总计：</span><span class="price">¥{{ orderDetail.totalPrice }}</span></div>
			</div>
		</div>

		<div>
			<div class="delivery-block mb-10">
				<div class="deliverytime"><span class="label">下单人</span><span class="time-desc">{{ orderDetail.userName }}</span></div>
				<div class="deliverytime"><span class="label">订单号</span><span class="time-desc">{{ orderDetail.orderId }}</span></div>
				<div class="deliverytime"><span class="label">下单时间</span><span class="time-desc">{{ orderTime }}</span></div>
				<div class="deliverytime"><span class="label">支付方式</span><span class="time-desc">{{ orderDetail.payType }}</span></div>
				<div class="deliverytime"><span class="label">收货地址</span><span class="time-desc">{{ orderDetail.address }}</span></div>
			</div>
		</div>

	</div>
</template>

<script>
import { getOrderDetail } from '@/api/user'

export default {
	name: 'orderDetail',
  data() {
    return {
      orderId: this.$route.params.orderId,
      orderDetail: {}
    }
  },
  created() {
    this.getOrder()
  },
  computed: {
    orderTime: function() {
        if (this.orderDetail.orderTime) {
            this.orderDetail.orderTime.replace('.0', '')
        }
        
    }
  },
  methods: {
    // 返回上一级
    goback() {
        this.$router.go(-1)
    },
    getOrder() {
      getOrderDetail({ orderId: this.$route.params.orderId }).then(resp => {
        this.orderDetail = resp
      })
    }
  }
}
</script>

<style>
	.order-detail .van-nav-bar {
		height: 100px;
		line-height: 100px;
		background: #4b4b4b;
	}
	.order-detail .van-nav-bar__left i.van-icon, .van-nav-bar__text {
		color: #fff;
		font-size: 30px;
	}
	.order-detail .van-nav-bar__title {
		color: #fff;
		font-size: 40px;
	}
	/**以上可共用**/
	.order-detail {
    background-color: #f5f5f5;
	}
	.order-detail .shopinfo {
    font-size: 34px;
    line-height: 60px;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 2px solid #f1f0f0;
    padding: 5px 15px;
    background-color: #fff;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    color: #333333;
	}
	.order-detail .proImg {
		width: 80px;
		height: 80px;
		background-color: #333;
	}
	.order-detail .shopinfo .name {
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 480px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
	}
	.order-detail .shopinfo .cutTime{
		font-size: 12px;
		float: right;
		padding-left: 15px;
		color: #999;
	}
	.order-detail .shopinfo .cutTime i{
		font-style: normal;
	}
	.order-detail .order-menu-block, .delivery-block {
		width: 95%;
    margin: 0 auto;
    margin-top: 1.25rem;
    box-sizing: border-box;
    padding: 0.9375rem 1.25rem;
    background-color: #fff;
	}
	.order-detail .shopinfo .name .name-txt {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
	}
	.order-detail .shopinfo .name:after {
    content: '';
    width: 10px;
    padding-top: 17.33333333px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAABGdBT…aHwNyBI0lPJKoELhw4zsEGbzlwnoMNPgU+gQ/gqCsE+AFduoRIOYcOtQAAAABJRU5ErkJggg==) no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 15px;
	}
	.order-detail .dishitem {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 10px 15px;
    font-size: 30px;
    line-height: 55px;
    background-color: #fff;
    color: #333333;
	}
	.order-detail .dishitem .name {
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	}
	.order-detail .dishitem .count {
    width: 12%;
    white-space: nowrap;
    text-align: left;
	}
	.order-detail .dishitem .price {
    -webkit-flex: 1 1;
    -ms-flex: 1 1;
    flex: 1 1;
    text-align: right;
    white-space: nowrap;
	}
	.order-detail .deliveryfee {
    line-height: 60px;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #fff;
    font-size: 30px;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    z-index: 1;
    border-top: 1px solid #f1f0f0;
	}
	.order-detail .deliveryfee .title {
    font-size: 30px;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
	}
	.order-detail .deliveryfee .price {
    font-size: 30px;
		float: right;
	}
	.actual {
    color: #333333;
    line-height: 65px;
    font-size: 30px;
    text-align: right;
    border-top: 1px solid #f1f0f0;
	}
	.actual .price {
    color: #333;
    font-size: 38px;
    font-weight: bold;
	}
	.totalprice:after {
    position: absolute;
    left: 15px;
    right: 0;
    height: 1px;
    background: #f1f0f0;
    z-index: -1;
	}
	.deliverytime {
    font-size: 30px;
    color: #333333;
    border-bottom: 1px solid #f1f0f0;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    line-height: 55px;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
    z-index: 1;
    border-bottom: 1px solid transparent;
    background: #fff;
	}
	.deliverytime:before {
    position: absolute;
    left: 15px;
    right: 0;
    height: 1px;
    background: #f1f0f0;
    z-index: -1;
	}
	.deliverytime .label {
    text-align: justify;
    height: 45px;
    text-align: left;
    min-width: 60px;
    color: #999;
	}
	.deliverytime .time-desc {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-left: 10px;
    text-align: right;
	}
</style>