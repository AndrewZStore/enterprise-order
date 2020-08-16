<template>
	<div>
		<!-- 头部 -->
		<div class="homeHeader mianBackground">
			<van-nav-bar
				class='homeTitle mianBackground'
			  title="点餐"
			  right-arrow
			  right-text="2020-8-9"
			  @click-right="onClickRight"
			/>
			<van-row class='orderMealTime'>
			  <van-col span="6" @click='breakfastTime'>早餐<br>
			  	<span class="orderTime">Breakfact</span>
			  </van-col>
			  <van-col span="6">午餐<br>
			  	<span class="orderTime">Lunch</span>
			  </van-col>
			  <van-col span="6">下午茶<br>
			  	<span class="orderTime">Afternoon tea</span>
			  </van-col>
			  <van-col span="6">晚餐<br>
			  	<span class="orderTime">Dinner</span>
			  </van-col>
			</van-row>
		</div>

		<!-- 轮播 -->
		<div class="swipeBox">
			<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item>1</van-swipe-item>
		  <van-swipe-item>2</van-swipe-item>
		  <van-swipe-item>3</van-swipe-item>
		  <van-swipe-item>4</van-swipe-item>
		</van-swipe>
		</div>

		<!-- 店铺列表 -->
		<van-list class='storeList'>
		  <van-cell>
		  	<a href="" class="react ">
					<div class="dealcard">
						<div class="dealcard-img imgbox">
							<img src="">
						</div>
						<div class="dealcard-block-right">
							<div class="dealcard-brand single-line">
								店铺名称
								<van-icon name="arrow" />
							</div>
							<div class="title text-block">
								<van-icon class="store" name="shop-o" size='25px'/>店铺地址
							</div>
							<div class="price">
								<span class="strong">麻辣翠香买三斤送半斤，让你吃够</span>
							</div>
						</div>
					</div>
				</a>
		  </van-cell>
		</van-list>


	</div>

</template>

<script>
import { getTimeQuantum } from '@/api/user'

	export default {
		data() {
			return {
				storeImg: './../icons/svg/',
				dataList: {},
				queryInfo: {
					Breakfast: '',
				}
			}
		},
		created() {
			this.breakfastTime()
		},
		methods:{
			onClickRight() {

			},
			breakfastTime() {
				getTimeQuantum({ zaocanTime:this.Breakfast }).then(resp => {
					console.log(resp)
				})
			}
		}
	}
</script>

<style>
	.homeHeader {
		padding-bottom:100px;
	}
	.homeTitle {
		height: 55px;
		line-height: 55px;
		padding: 36px 0;
	}
	[class*=van-hairline]::after {
		border-bottom: 0
	}
	.homeTitle .van-nav-bar__title {
		font-size: 28px;
		color: #fff;
	}
	.homeTitle .van-nav-bar__right .van-nav-bar__text {
		color: #fff;
		font-size: 20px;
	}
	.orderMealTime {
		text-align: center;
		font-size: 22px;
		color: #fff;
	}
	.orderMealTime .orderTime {
		font-size: 18px
	}
	.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 240px;
    text-align: center;
    background-color: #39a9ed;
  }
  .swipeBox {
  	width: 95%;
  	margin: -85px auto 20px;
  	border-radius: 10px;
  	overflow: hidden;
  }
  .storeList {
  	border-top: 4px solid #f5f5f5;
  	padding-bottom: 20px;
  }
  .van-cell {
  	border-bottom: 1px solid #f5f5f5;
    overflow: hidden;
    font-size: inherit;
    font-weight: 400;
    position: relative;
    padding: 20px 1rem;
  }
  .react {
  	padding-left: 0;
  }
  .dealcard {
  	position: relative;
    box-sizing: border-box;
  }
  .dealcard-img {
  	position: absolute;
    width: 180px;
    height: 160px;
    text-align: center;
    overflow: hidden;
    background: #999;
    border-radius: 10px;
  }
  .dealcard .dealcard-block-right {
    margin-left: 200px;
    position: relative;
    height: 164px;
	}
	.dealcard .dealcard-brand {
    padding: 10px 20px 0 0;
    margin-bottom: 10px;
    font-size: 26px;
    font-weight: 400;
    color: #333;
    line-height: 40px;
    position: relative;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.dealcard .dealcard-brand .van-icon {
		position: absolute;
		right: 0;
    line-height: 40px;
    color: #333;
	}
	.dealcard .title {
    font-size: 20px;
    height: 60px;
    line-height: 30px;
    margin-bottom: 16px;
    color: #999;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    position: relative;
    padding-left: 40px;
	}
	.store {
		position: absolute;
		left: 0;
	}
	.dealcard .price {
    position: absolute;
    width: 100%;
    bottom: 10px;
	}
	.strong {
		color: #ffa45b;
		background: #fff4eb;
		display: inline-block;
		padding: 5px;
		font-size: 14px;
		border-radius: 3px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		max-width: 100%
	}
</style>