<template>
	<div>
		<!-- 头部 -->
		<div class="fixed">
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
			<swipeSlider :imgData='imgList'></swipeSlider>
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
								<van-icon class="store" name="shop-o" size='20px'/>{{item.address}}
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
		<footerNav :activePage="'order'" />
	</div>
</template>

<script>
import footerNav from '@/views/components/FooterNav/index'
import swipeSlider from '@/views/components/carousel/index'
import { getMealTime, getImgList } from '@/api/user'

export default {
	components: {
		swipeSlider,
		footerNav
	},
	data() {
		return {
			show: false,
			storeImg: './../icons/svg/',
			dataList: {},
			queryAllShop: {
				companyId: '100052155',
			},
			queryMealTime: {
				companyId: '100052155',
				systemId: '109',
				selectDate: '2020-08-07',
				eatType: 'A',
			},
			imgList: [],
			selectDate: '',
			minDate: new Date(2020, 0, 1),
	        maxDate: new Date(2105, 10, 1),
	        currentDate: new Date(),
		}
	},
	created() {
		this.breakfastTime()
		this.getTime()
		this.showCarousel()
	},
	methods: {
		// 时间选择弹窗
		showPopup() {
			this.show = true
		},
		// 获取轮播图片
		showCarousel() {
			// getImgList接口必须传空数据，不然报错
			const data = {}
			getImgList(data).then(resp => {
				this.imgList = resp.imgList
			})
		},
		// 餐段查询
		eatTime(eatType1) {
			getMealTime({ orgId:this.queryMealTime.companyId, sysId:this.queryMealTime.systemId, selectDate:this.queryMealTime.selectDate, eatType: eatType1 }).then(resp => {
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
	.fixed {
		position: fixed;
		top: 0;
		z-index: 9;
		width: 100%;
		background-color: #fff;
	}
	.homeHeader .van-nav-bar{
		height: 100px;
		line-height: 100px;
	}
	.homeHeader .van-nav-bar__left i.van-icon, .van-nav-bar__text{
		color: #fff;
		font-size: 30px;
	}
	.homeHeader .van-nav-bar__title{
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
		top: 5px;
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
  .storeList {
  	margin-top: 460px;
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
    line-height: 30px;
    color: #333;
	}
	.dealcard .title {
    font-size: 30px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 16px;
    color: #999;
    overflow: hidden;
    position: relative;
    padding-left: 45px;
	}
	.store {
		position: absolute;
		left: 0;
	}
	.dealcard .price {
    position: absolute;
    width: 100%;
    bottom: 0;
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