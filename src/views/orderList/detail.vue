<template>
	<div>
		<van-nav-bar
		  title="订单详情"
		  left-arrow
		  @click-left="onClickLeft"
		/>

		<div>
			<div class="order-menu-block">
				<div class="shopinfo">
					<div class="name"><span class="name-txt">蜀地源冒菜（老虹井路)</span></div>
					<div class="cutTime">结单时间： <i>2020-08-01 15:00</i></div>
				</div>
				<div class="dishitem"><span class="proImg"><img src=""></span><span class="name">★★厦门泡面★★</span><span class="count">1份</span><span class="price">¥5.98</span></div>
				<div class="dishitem"><span class="proImg"><img src=""></span><span class="name">★★厦门门泡面泡面厦门泡面★★</span><span class="count">1份</span><span class="price">¥5.98</span></div>
				<div class="dishitem"><span class="proImg"><img src=""></span><span class="name">★★厦门泡面★★</span><span class="count">1份</span><span class="price">¥5.98</span></div>
				<div class="dishitem"><span class="proImg"><img src=""></span><span class="name">★★厦门泡面★★</span><span class="count">1份</span><span class="price">¥5.98</span></div>
				<div class="deliveryfee">
					<div><span class="title">企业补贴</span><span class="price">¥38</span></div>
					<div><span class="title">自付金额</span><span class="price">¥38</span></div>
				</div>
				<div class="actual"><span class="label">实付：</span><span class="price">¥17.76</span></div>
			</div>
		</div>

		<div>
			<div class="delivery-block mb-10">
				<div class="deliverytime"><span class="label">下单人</span><span class="time-desc">张小姐</span></div>
				<div class="deliverytime"><span class="label">订单号</span><span class="time-desc">1234567890</span></div>
				<div class="deliverytime"><span class="label">下单时间</span><span class="time-desc">2020-08-01 12:00</span></div>
				<div class="deliverytime"><span class="label">送餐时间</span><span class="time-desc">2020-08-01 12:00</span></div>
				<div class="deliverytime"><span class="label">支付方式</span><span class="time-desc">企业支付</span></div>
				<div class="deliverytime"><span class="label">收货地址</span><span class="time-desc">东莞市交管局如果换热管呵呵</span></div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'orderDetail'
	}
</script>

<style>
	.van-nav-bar {
		height: 100px;
		line-height: 100px;
		background: #4b4b4b;
	}
	.van-nav-bar__left i.van-icon, .van-nav-bar__text {
		color: #fff;
		font-size: 30px;
	}
	.van-nav-bar__title {
		color: #fff;
		font-size: 40px;
	}
	/**以上可共用**/
	body {
    background-color: #f5f5f5;
	}
	.shopinfo {
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
	.proImg {
		width: 80px;
		height: 80px;
		background-color: #333;
	}
	.shopinfo .name {
    border-right: 1px solid #f1f0f0;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    width: 280px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
	}
	.shopinfo .cutTime{
		font-size: 12px;
		float: right;
		padding-left: 15px;
		color: #999;
	}
	.shopinfo .cutTime i{
		font-style: normal;
	}
	.order-menu-block, .delivery-block {
		width: 95%;
    margin: 0 auto;
    margin-top: 1.25rem;
    box-sizing: border-box;
    padding: 0.9375rem 1.25rem;
    background-color: #fff;
	}
	.shopinfo .name .name-txt {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
	}
	.shopinfo .name:after {
    content: '';
    width: 10px;
    padding-top: 17.33333333px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAaCAYAAABozQZiAAAABGdBT…aHwNyBI0lPJKoELhw4zsEGbzlwnoMNPgU+gQ/gqCsE+AFduoRIOYcOtQAAAABJRU5ErkJggg==) no-repeat;
    background-size: contain;
    display: inline-block;
    margin-right: 15px;
	}
	.dishitem {
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
	.dishitem .name {
    width: 60%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
	}
	.dishitem .count {
    width: 12%;
    white-space: nowrap;
    text-align: left;
	}
	.dishitem .price {
    -webkit-flex: 1 1;
    -ms-flex: 1 1;
    flex: 1 1;
    text-align: right;
    white-space: nowrap;
	}
	.deliveryfee {
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
	.deliveryfee .title {
    font-size: 30px;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
	}
	.deliveryfee .price {
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