<template>
	<div>
		<!-- 头部 -->
		<div class="homeHeader mianBackground">
 			<van-nav-bar title="标题" class='homeTitle mianBackground' right-arrow>
			  <template #right>
			    <van-field
			    	class='selectTime'
		            v-model="selectDate"
		            placeholder="选择时间" right-arrow readonly="readonly"
		            @click="showPopup"
		        />
			  </template>
			</van-nav-bar>

			<van-row class='orderMealTime'>
			  <van-col span="6" @click='breakfastTime'>早餐<br>
			  	<span class="orderTime">Breakfact</span>
			  </van-col>
			  <van-col span="6" @click='lunchTime'>午餐<br>
			  	<span class="orderTime">Lunch</span>
			  </van-col>
			  <van-col span="6" @click='AfternoonTea'>下午茶<br>
			  	<span class="orderTime">Afternoon tea</span>
			  </van-col>
			  <van-col span="6" @click='dinnerTime'>晚餐<br>
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
		  <van-cell v-for='item in dataList'>
		  	<a href="" class="react ">
					<div class="dealcard">
						<div class="dealcard-img imgbox">
							<img src="">
						</div>
						<div class="dealcard-block-right">
							<div class="dealcard-brand single-line">
								{{item.shopName}}
								<van-icon name="arrow" />
							</div>
							<div class="title text-block">
								<van-icon class="store" name="shop-o" size='25px'/>{{item.address}}
							</div>
							<div class="price">
								<span class="strong">麻辣翠香买三斤送半斤，让你吃够</span>
							</div>
						</div>
					</div>
				</a>
		  </van-cell>
		</van-list>

		<van-popup v-model="show" position="bottom">
			<van-datetime-picker
			  v-model="currentDate"
			  type="date"
			  :columns-order="['month', 'day', 'year']"
			  title="送餐时间"
			  :min-date="minDate"
			  :max-date="maxDate"
			  :formatter="formatter"
			  @confirm="confirmPicker"
			/>
		</van-popup>

	</div>

</template>

<script>
import { getTimeQuantum } from '@/api/user'

let listState = {"list":[{"address":"张江1","shopName":"农家土菜馆","shopImg":"","shopId":"100052157"},
{"address":"张江2","shopName":"农家土菜馆","shopImg":"","shopId":"100052157"},
{"address":"张江3","shopName":"农家土菜馆","shopImg":"","shopId":"100052157"}]};

  export {
    listState, 
  }

	export default {
		data() {
			return {
				show: false,
				storeImg: './../icons/svg/',
				dataList: {},
				queryInfo: {
					companyId: '100052155',
					systemId: '109',
					selectDate: '2020-08-05',
					Breakfast: 'A',
				},
				selectDate: '',
				minDate: new Date(2020, 0, 1),
		        maxDate: new Date(2105, 10, 1),
		        currentDate: new Date(),
			}
		},
		created() {
			this.breakfastTime()
			this.getTime()
		},
		methods:{
			showPopup() {
				this.show = true
			},
			eatTime(eatType1) {
				getTimeQuantum({ orgId:this.queryInfo.companyId, sysId:this.queryInfo.systemId, selectDate:this.queryInfo.selectDate, eatType: eatType1 }).then(resp => {
					resp = listState;
					this.dataList = resp.list
					
				})
			},
			breakfastTime() {
				this.eatTime('A');
			},
			lunchTime() {
				this.eatTime('B');
			},
			AfternoonTea() {
				this.eatTime('D');
			},
			dinnerTime() {
				this.eatTime('C');
			},
			formatter (type, value) {
		      if (type === 'year') {
		        const date = new Date()
		        const y = date.getFullYear()
		        const m = date.getMonth() + 1
		        const d = date.getDate()
		        const dt = new Date(y, m, d)
		        const dt2 = new Date();
				const weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
				const week = weekDay[dt2.getDay()];
				return week
		      } else if (type === 'month') {
		        return `${value}月`
		      } else if (type === 'day') {
		        return `${value}日`
		      }
		      return value
		    },
		    // 默认显示当前时间
		    getTime () {
		      let date = new Date()
		      let y = date.getFullYear()
		      let m = date.getMonth() + 1
		      let d = date.getDate()
		      // let s = date.getSeconds()
		      if (m >= 1 && m <= 9) { m = `0${m}` }
		      if (d >= 1 && d <= 9) { d = `0${d}` }
		      let time = `${y}-${m}-${d}`
		      this.selectDate = time
		  },
		    // 确认选择之后的时间
		    confirmPicker (val) {
		      let year = val.getFullYear()
		      let month = val.getMonth() + 1
		      let day = val.getDate()
		      // let second = val.getSeconds()
		      if (month >= 1 && month <= 9) { month = `0${month}` }
		      if (day >= 1 && day <= 9) { day = `0${day}` }
		      this.selectDate = `${year}-${month}-${day} `
		      console.log(this.selectDate)
		      this.show = false
		    },
		}
	}
</script>

<style>
	.van-nav-bar{
		height: 100px;
		line-height: 100px;
	}
	.van-nav-bar__left i.van-icon, .van-nav-bar__text{
		color: #fff;
		font-size: 30px;
	}
	.van-nav-bar__title{
		color: #fff;
		font-size: 40px;
	}
	.homeHeader {
		padding-bottom:130px;
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
	.van-nav-bar__right .selectTime{
		background: transparent;
		border-bottom: none;
		text-align: right;
		width: 190px;
		position: relative;
	}
	.van-nav-bar__right .selectTime:after {
		display: inline-block;
		background: url(../../assets/arrow.svg) no-repeat center;
		position: absolute;
		right: 0px;
		width: 45px;
		height: 55px;
		top: 10px;
		left: auto;
		border-bottom: 0;
		font-size: 28px;
		color: #fff;
		background-size: 100%;
	}
	.van-nav-bar__right .selectTime .van-field__control {
		color: #fff;

	}
	.orderMealTime {
		text-align: center;
		font-size: 22px;
		color: #fff;
		margin-top: 40px
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
  	margin: -100px auto 20px;
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