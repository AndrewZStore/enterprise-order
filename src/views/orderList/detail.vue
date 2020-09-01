<template>
	<div>
		<van-nav-bar
		  title="订单详情"
		  left-arrow
		  @click-left="onClickLeft"
		/>

		<van-tabs v-model="active">
		  <van-tab title="全部">
		  	<div class="order-item">
		  		<div>
		  			<span class="shopName">店铺名称</span>
		  			<van-tag plain type="success">已完成</van-tag>
		  		</div>
		  		<van-divider />
			    <div class="order">
			        <div class="left"><div class="img-ctn"><img class="deal-avatar" src=""></div></div>
			        <div class="right">
			            <dl>
			                <dt class="title">
			                  <div>新辣道鱼火锅2人餐</div>
			                  <span class="unitCost">20.50</span>
			                </dt>
                      <dt class="item">x 1</dt>
			            </dl>
			        </div>
			    </div>
			    <div class="order">
			        <div class="left"><div class="img-ctn"><img class="deal-avatar" src=""></div></div>
			        <div class="right">
			            <dl>
			                <dt class="title">
			                  <div>新辣道鱼火锅2人餐</div>
			                  <span class="unitCost">20.50</span>
			                </dt>
                      <dt class="item">x 1</dt>
			            </dl>
			        </div>
			    </div>
			    <div class="clearfix">
			    	<div class="orderTime">下单时间：<span>2020-08-01</span></div>
			    	<div class="settlement">共2件商品，实付<i>￥40.00</i></div>
			    </div>
			    <span class="lookMore">查看详情</span>
				</div>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<style>
	.van-nav-bar{
		height: 100px;
		line-height: 100px;
		background: #4b4b4b;
	}
	.van-nav-bar__left i.van-icon, .van-nav-bar__text{
		color: #fff;
		font-size: 30px;
	}
	.van-nav-bar__title{
		color: #fff;
		font-size: 40px;
	}
	/**以上可共用**/
	body{
		background-color: #f5f5f5;
	}
	.van-tabs--line .van-tabs__wrap{
		height: 90px;
		line-height: 90px;
		font-size: 30px;
	}
	.van-tabs__line{
		background-color: #4b4b4b;
	}
	.van-tabs__content{
		width: 95%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.order-item {
    box-sizing: border-box;
    padding: 15px 20px 85px;
    position: relative;
    overflow: visible;
    -webkit-transition: -webkit-transform .2s;
    background-color: #fff;
    border-radius: 10px;
	}
</style>