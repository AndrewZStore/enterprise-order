<template>
	<div class="merchant-container">
		<div class="nav-bar">
			<van-nav-bar
				:left-arrow=true
				@click-left="goback"
				style="background-color:transparent;"
				>
				<template #left>
					<van-icon name="arrow-left" size="18px" />
				</template>
				<template #title>
					<span class="nav-title">{{ merchantName }}</span>
				</template>
			</van-nav-bar>
		</div>

		<div class="slide-show">
			<van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
			  <van-swipe-item>1</van-swipe-item>
			  <van-swipe-item>2</van-swipe-item>
			  <van-swipe-item>3</van-swipe-item>
			  <van-swipe-item>4</van-swipe-item>
			</van-swipe>
		</div>

		<div class="tabs">
			<van-tabs 
				v-model="activeName" 
				line-height="3px"
				color="#1989fa">
				<van-tab name="order">
					<template #title>
						<span class="tab-title">点餐</span>
					</template>
					<div class="cascad-menu" ref="cascadMenu">
					    <scroll
					      class="left-menu"
					      :data="menus"
					      ref="leftMenu">
					      <div class="left-menu-container">
					        <ul>
					          <li
					            class="left-item"
					            ref="leftItem"
					            :class="{'current': currentIndex === index}"
					            @click="selectLeft(index, $event)"
					            v-for="(menu, index) in menus"
					            :key="index">
					            <span class="text">{{ menu.name }}</span>
					          </li>
					        </ul>
					      </div>
					    </scroll>
					    <scroll
					      class="right-menu"
					      :data="menus" 
					      ref="rightMenu"
					      @scroll="scrollHeight"
					      :listenScroll="true"
					      :probeType="3">
					      <div class="right-menu-container">
					        <ul>
					          <li class="right-item" ref="rightItem" v-for="(menu, i) in menus" :key="i">
					            <van-divider :style="{ color: 'black', borderColor: 'black', padding: '5px 16px' }">{{ menu.name }}</van-divider>
					            <ul>
					              <li v-for="(item, j) in menu.data" :key="j">
					                <div class="data-wrapper">
								          	<van-row>
									          	<van-col :span="8">
										            <van-image :src="item.img" />
											  			</van-col>
											  			<van-col :span="16">
												        <span class="card-title">{{ item.name }}</span>
												        <div class="card-total-price">
													  			<span class="currency-symbol">￥</span>
														        <span class="card-price">{{ item.price }}</span>
														    </div>
											  			</van-col>
											  		</van-row>
					                </div>
					              </li>
					            </ul>
					          </li>
					        </ul>
					      </div>
					    </scroll>
					</div>
				</van-tab>
				<van-tab name="merchant">
					<template #title>
						<span class="tab-title">商家</span>
					</template>
				</van-tab>
			</van-tabs>
		</div>

		<div class="footer">
			<van-goods-action>
				<van-goods-action-icon icon="cart" @click="onClick" />
				<span>￥1889</span>
				<van-goods-action-button type="primary" text="去结算" />
			</van-goods-action>
		</div>

		<van-popup v-model="popupVisible" round position="bottom" :style="{ height: '30%' }" />
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Scroll from './scroll'

export default {
	name: 'merchant',
	components: {
		Scroll
	},
	data() {
		return {
			// 商家名称
			merchantName: '麻辣小龙虾',
			// 当前选项卡名称
			activeName: "order",
			// 弹出框是否显示
			popupVisible: false,

			// 步进器是否显示
			stepperVisible: true,

			// 左右菜单联动属性
			rightTops: [],
			scrollY: 0,
			leftScrollY: 0,

			// 菜单列表
			menus: [
				{
				  name: '甜点',
				  data: [
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0,
				      price: 99
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0,
				      price: 100
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    }
				  ]
				},
				{
				  name: '菜单2',
				  data: [
				    {
				      name: '1.1',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.2',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.3',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.4',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.5',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				  ]
				},
				{
				  name: '菜单3',
				  data: [
				    {
				      name: '1.1',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.2',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.3',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.4',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.5',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      value: 0
				    }
				  ]
				}
			]
		}
	},
	computed: {
    	currentIndex () {
			const { scrollY, rightTops } = this
			let index = rightTops.findIndex((height, index) => {
				return scrollY >= rightTops[index] && scrollY < rightTops[index + 1]
			})
			if (scrollY > rightTops[index] + 50) {
				// console.log(scrollY, rightTops[index])
				index++;
			}
			return index
		}
  	},
	created() {
		this.$nextTick(() => {
		  this._calculateHeight()
		})
	},
	methods: {
		// 返回上级页面
		goback() {
			// 
		},
		// 菜品加数据
		plusNum(item) {
			item.value += 1
			
		},
		onClick() {
			if (this.popupVisible) {
				this.popupVisible = false
			} else {
				this.popupVisible = true
			}
		},

		selectLeft (index, event) {
		  	// console.log(index)
			if (!event._constructed) {
				return
			}
			let rightItem = this.$refs.rightItem
			let el = rightItem[index]
			this.$refs.rightMenu.scrollToElement(el, 300)
		},
		scrollHeight (pos) {
		  // console.log(pos);
		  this.scrollY = Math.abs(Math.round(pos.y))
		},
		_calculateHeight() {
			let lis = this.$refs.rightItem
			// console.log(lis)
			let height = 0
			this.rightTops.push(height)
			Array.prototype.slice.call(lis).forEach(li => {
			height += li.clientHeight
			this.rightTops.push(height)
			})
			// console.log(this.rightTops)
		}
	}
}
</script>

<style>
	.merchant-container {
		height: 100%;
	}

	.nav-bar {
    padding-top: 10px;
	}

	.nav-title {
		font-size: 36px;
	}

	.my-swipe {
		transform: translateZ(0);
	}

	.my-swipe .van-swipe-item {
	  color: #fff;
	  font-size: 20px;
	  line-height: 150px;
	  text-align: center;
	  background-color: #39a9ed;
	}

	.tab-title {
		font-size: 34px;
		line-height: 34px;
	}

	.van-tabs__wrap, .van-tabs__wrap scroll-view, .van-tabs__nav, .van-tab {
	  height: 70px !important;   
	  background-color: #f5f5f5;
	}

	.cascad-menu {
		display: flex;
		height: 1000px;
		width: 100%;
		overflow: hidden;
	}

	.cascad-menu .left-menu {
		flex: 0 0 160px;
		text-align: center;
		width: 360px;
		background-color: #f5f5f5;
	}

	.cascad-menu .left-menu .left-item {
		height: 80px;
		width: 100%;
	}

	.cascad-menu .left-menu .left-item.current {
		background-color: #fff;
	}

	.cascad-menu .left-menu .left-item .text {
		width: 100%;
		font-size: 30px;
		line-height: 80px;
	}

	.cascad-menu .right-menu {
		flex: 1;
		padding-left: 20px;
	}

	.cascad-menu .right-menu .right-item .data-wrapper {
		padding: 15px 0;
	}

	.cascad-menu .right-menu .right-item .van-image {
		width: 180px;
		height: 180px;
	}

	.cascad-menu .right-menu .right-item .card-title {
		font-size: 30px;
	}
	
	.cascad-menu .right-menu .right-item .currency-symbol {
		font-size: 28px;
		color: #fb5443;
	}

	.cascad-menu .right-menu .right-item .card-price {
		font-size: 40px;
		color: #fb5443;
	}

	.van-stepper__plus, .van-stepper__minus {
		background: #1989fa;
	}

	.van-goods-action {
		z-index: 9999;
	}
</style>
