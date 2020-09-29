<template>
	<div class="home-container">
		<!-- 头部 -->
		<div class="fixed">
			<div class="homeHeader mianBackground">
	 			<van-nav-bar 
	 				title="点餐" 
	 				class='homeTitle mianBackground' 
	 				@click-right="popupVisible = true"
	 				:border="false">
				  <template #right>
				  	<span>{{ hadSelectDate }}</span>
				    <van-icon name="arrow" color="#fff" />
				  </template>
				</van-nav-bar>

				<van-tabs 
					v-model="eatType"
					@click="onChangeTab"
					line-height="3px"
					:ellipsis="false"
					title-inactive-color="white"
					title-active-color="white"
					background="linear-gradient(to right, #7c7c7c, #4b4b4b)"
					color="#fff">
				  <van-tab name="A">
				  	<template #title>
							<span class="tab-title-ch">早餐</span>
							<br>
				  		<span class="tab-title-en">Breakfact</span>
				  	</template>
				  </van-tab>
				  <van-tab name="B">
				  	<template #title>
				  		<span class="tab-title-ch">午餐</span>
				  		<br>
				  		<span class="tab-title-en">Breakfact</span>
				  	</template>
				  </van-tab>
				  <van-tab name="D">
				  	<template #title>
				  		<span class="tab-title-ch">下午茶</span>
				  		<br>
				  		<span class="tab-title-en">Afternoon tea</span>
				  	</template>
				  </van-tab>
				  <van-tab name="C">
				  	<template #title>
				  		<span class="tab-title-ch">晚餐</span>
				  		<br>
				  		<span class="tab-title-en">Dinner</span>
				  	</template>
				  </van-tab>
				</van-tabs>
			</div>
			<swipeSlider :imgData='imgList'></swipeSlider>
		</div>

		<!-- 店铺列表 -->
		<van-list class='shopList'>
		  <van-cell v-for='item in dataList'>
		  	<router-link :to="{ name: 'merchant', params: { shopName: item.shopName, shopId: item.shopId, eatType: eatType }}">
					<div class="dealcard">
						<div class="dealcard-img imgbox">
							<van-image fit="fill" width="100%" height="100%" :src="item.shopImg">
								<template v-slot:loading>
							    <van-loading type="spinner" size="20" />
							  </template>
								<template v-slot:error>加载失败</template>
							</van-image>
						</div>
						<div class="dealcard-block-right">
							<div class="dealcard-brand single-line">
								{{ item.shopName }}
								<van-icon name="arrow" />
							</div>
							<!-- <div class="title text-block">
								<van-icon class="store" name="shop-o" size='20px'/>{{item.address}}
							</div>
							<div class="price">
								<span class="strong">麻辣翠香买三斤送半斤，让你吃够</span>
							</div> -->
						</div>
					</div>
				</router-link>
		  </van-cell>
		</van-list>

		<footerNav :activePage="'order'" />

		<van-popup v-model="popupVisible" round position="bottom">
			<van-row class="home-popup-title popup-title-header">
				<span>送餐时间</span>
			</van-row>
			<van-row class="home-popup-title popup-title-tip">
				<span>选择时间请已目的城市时间为准</span>
			</van-row>
			<van-row>
				<van-picker
				  title="送餐时间"
				  :show-toolbar="false"
				  :columns="columns"
				  @change="onChange"
				/>
			</van-row>
			<van-row class="home-popup-footer">
				<van-button type="info" text="确定" class="submit" @click="onSubmit" />
				<van-button text="取消" class="cancel" @click="onCancel" />
			</van-row>
		</van-popup>
	</div>
</template>

<script>
import footerNav from '@/views/components/FooterNav/index'
import swipeSlider from '@/views/components/carousel/index'
import { getShop, getImgList } from '@/api/user'

export default {
	name: 'home',
	components: {
		swipeSlider,
		footerNav
	},
	data() {
		return {
			// 时间选择器数组
			columns: [],
			// 时间选择器数组对应的格式化日期
			columnValues: [],
			// 时间选择器选中时间
			selectDate: '',
			// 已经选择时间
			hadSelectDate: '选择时间',
			// 控制弹出框显示
			popupVisible: false,
			// 当前选项卡名称
			eatType: "",
			// 数据列表
			dataList: [],
			// 轮播图列表
			imgList: []
		}
	},
	created() {
		// 将当前视图添加到缓存
		this.$store.dispatch('cacheViews/addCachedView', this.$route)
		this.generateDateArray()
		
		// 获得轮播图照片
		// getImgList接口必须传空数据，不然报错
		const data = {}
		getImgList(data).then(resp => {
			this.imgList = resp.imgList
		})

		// 根据当前时间跳转对应选项卡
		// 早餐 00:01-10:00
		// 午餐 10:01-14:00
		// 下午茶 14:01-16:00
		// 晚餐 16:01-24:00
		var dateNow = new Date()
		var hourNow = dateNow.getHours()
		if (hourNow > 16) {
			this.eatType = "C"
		} else if (hourNow > 14) {
			this.eatType = "D"
		} else if (hourNow > 10) {
			this.eatType = "B"
		} else {
			this.eatType = "A"
		}

		this.onChangeTab(this.eatType)
	},
	watch: {
		eatType(val) {
			this.$store.dispatch('order/updateCurrentEatType', this.eatType)
		},
		hadSelectDate(val) {
			this.$store.dispatch('order/updateOrderDate', this.hadSelectDate)
		}
	},
	methods: {
		// 切换选项卡 
		onChangeTab(name) {
			const params = { 
				orgId: this.$store.getters.orgId, 
				sysId: this.$store.getters.systemId, 
				selectDate: "2020-09-12", 
				eatType: name 
			}
			getShop(params).then(resp => {
				// this.dataList = [{'address': '张江', 'shopName': '农家土菜馆', 'shopImg': '', 'shopId': '100052157'}, {'address': '紫薇路', 'shopName': '福瑞轩', 'shopImg': '', 'shopId': '100054052'}, {'address': '上海市南京路', 'shopName': '上海饭店', 'shopImg': '', 'shopId': '100077563'}, {'address': '北京市朝阳区区', 'shopName': '北京饭店', 'shopImg': '', 'shopId': '100077564'}, {'address': '浙江杭州市', 'shopName': '浙江饭店', 'shopImg': '', 'shopId': '100077565'}, {'address': '杭州市', 'shopName': '杭州饭店', 'shopImg': '', 'shopId': '100077566'}]
				this.dataList = resp.list
			})
		},
		// 生成选择器日期数组
    generateDateArray() {
    	var showDay = 15
			var tmpArr = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")

      for (var i=0; i<showDay; i++) {
      	var today = new Date()

      	var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * i
      	today.setTime(targetday_milliseconds)

	      var year = today.getFullYear()
	      
	      var month = today.getMonth() + 1
	      if(month < 10) {
	        month = "0" + month
	      }

	      var day = today.getDate()
	      if (day < 10) {
		      day = "0" + day
		    }

      	var date = month + '月' + day + '日' + '    ' + tmpArr[today.getDay()]
      	var value = year + '-' + month + '-' + day
      	this.columns.push(date)
      	this.columnValues.push(value)
    	}

    	// 初始值
			this.selectDate = this.columnValues[0]
			this.hadSelectDate = this.columnValues[0]
    },
    // 时间选择器 改变
    onChange(picker, value, index) {
    	this.selectDate = this.columnValues[index]
    },
    // 时间选择器 选择
    onSubmit() {
    	this.hadSelectDate = this.selectDate
    	this.popupVisible = false
    },
    // 时间选择器 取消
    onCancel() {
    	this.popupVisible = false
    }
  }
}
</script>

<style>
	.home-container {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.fixed {
		width: 100%;
		margin-bottom: 20px;
	}

	.homeHeader {
		padding-bottom: 130px;
	}

	.homeHeader .van-nav-bar{
		height: 100px;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
	}

	.homeHeader .van-nav-bar__title.van-ellipsis{
		color: #fff;
		font-size: 34px;
	}

	.homeHeader .van-nav-bar__right {
		font-size: 24px;
		color: #fff;
	}

	.homeHeader .van-tabs--line .van-tabs__wrap {
    height: 100px;
	}

	.tab-title-ch {
		font-size: 28px;
		line-height: 40px;
	}

	.tab-title-en {
		font-size: 20px;
		line-height: 40px;
	}

	.fixed .swipeBox {
		width: 95%;
		height: 200px;
		margin: 0 auto;
		margin-top: -110px;
	}

  .shopList {
  	border-top: 4px solid #f5f5f5;
  	height: calc(100vh - 560px);
  	overflow-y: scroll;
  }


  .van-cell {
  	border-bottom: 1px solid #f5f5f5;
    padding: 20px 20px;
  }

  .dealcard-img {
  	position: absolute;
    width: 180px;
    height: 160px;
    text-align: center;
    overflow: hidden;
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
    font-size: 32px;
    font-weight: 400;
    color: #333;
    line-height: 40px;
    position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.dealcard .dealcard-brand .van-icon {
		position: absolute;
		right: 0;
    line-height: 40px;
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

	.home-popup-title {
	    text-align: center;
	}

	.popup-title-header {
		padding-top: 40px;
		font-size: 36px;
	}

	.popup-title-tip {
		padding-top: 10px;
		padding-bottom: 40px;
		font-size: 26px;
		color: #9d9d9d;
	}

	.home-popup-footer {
    text-align: center;
    padding-top: 40px;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
	}

	.home-popup-footer .van-button {
		width: 290px;
		height: 70px;
		border-radius: 10px;
		margin-bottom: 20px;
	}

	.home-popup-footer .submit {
		font-size: 32px;
		margin-right: 40px;
	}

	.home-popup-footer .cancel {
		color: #48b1e1;
		font-size: 32px;
		border-color: #48b1e1;
	}

	.home-container .van-ellipsis {
    font-size: 36px;
	}
</style>