<template>
	<div class="merchant-container">
		<div class="nav-bar">
			<van-nav-bar
				:border="false"
				:left-arrow=true
				@click-left="goback"
				style="background-color:transparent;"
				>
				<template #left>
					<van-icon name="arrow-left" size="18px" />
				</template>
				<template #title>
					<span class="nav-title">{{ shopName }}</span>
				</template>
			</van-nav-bar>
		</div>

		<swipeSlider :imgData='imgList'></swipeSlider>

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
					            <span class="text">{{ menu.typeName }}</span>
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
					            <van-divider :style="{ color: 'black', borderColor: 'black', padding: '5px 16px' }">{{ menu.typeName }}</van-divider>
					            <ul>
					              <li v-for="(item, j) in menu.canPinlList" :key="j">
					                <card :item=item />
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
				<van-goods-action-icon icon="cart" size="30" color="#1989fa" :badge="hadSelectNum > 0 ? hadSelectNum : ''" @click="onClick" />
				<span class="total-currency-symbol">￥</span>
				<span class="total-price">{{ totalPrice }}</span>
				<van-button type="info" @click="onSubmit" text="去结算" />
			</van-goods-action>
		</div>

		<van-popup v-model="popupVisible" round position="bottom">
			<van-row>
				<van-col :span="12">
					<div class="popup-title popup-title-left">
						<span>已选商品</span>
					</div>
				</van-col>
				<van-col :span="12">
					<div class="popup-title popup-title-right" @click="clearShopping">
						<van-icon name="delete" />
						<span>清空</span>
					</div>
				</van-col>
			</van-row>
			<div class="had-menus" v-if="shoppingCardList.length>0">
				<ul>
					<li v-for="(item, j) in shoppingCardList" :key="j" class="shopping-card">
						<cardsmall :item=item />
					</li>
				</ul>
			</div>
			<div class="empty-shopping" v-else>
				<span>购物车空空如也</span>
			</div>
			<div class="popup-footer"></div>
		</van-popup>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Scroll from './scroll'
import card from './card'
import cardsmall from './card-small'
import swipeSlider from '@/views/components/carousel/index'
import { getImgList, getMenu } from '@/api/user'
import { Notify } from 'vant'

export default {
	name: 'merchant',
	components: {
		Scroll,
		card,
		cardsmall,
		swipeSlider
	},
	data() {
		return {
			shopName: "",
			// 获取菜单查询
			queryInfo: {
				shopId: this.$route.params.shopId,
				eatType: this.$route.params.eatType,
				orgId: this.$store.getters.orgId
			},
			// 当前选项卡名称
			activeName: "order",
			// 弹出框是否显示
			popupVisible: false,

			// 左右菜单联动属性
			rightTops: [],
			scrollY: 0,

			// 轮播图
			imgList: [],

			item: {
				name: '进口澳洲牛排套餐',
	      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
	      num: 0,
	      price: 99
			},

			menus: [],

			// 菜单列表
			menustest: [
				{
				  typeName: '甜点',
				  canPinlList: [
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0,
				      price: 99
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0,
				      price: 100
				    },
				    {
				      name: '进口澳洲牛排套餐',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0,
				      price: 100
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    }
				  ]
				},
				{
				  typeName: '菜单2',
				  canPinlList: [
				    {
				      name: '1.1',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.2',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.3',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.4',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.5',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				  ]
				},
				{
				  typeName: '菜单3',
				  canPinlList: [
				    {
				      name: '1.1',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.2',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.3',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.4',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.5',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    },
				    {
				      name: '1.6',
				      img: 'https://img.yzcdn.cn/vant/cat.jpeg',
				      num: 0
				    }
				  ]
				}
			]
		}
	},
	computed: {
		// 左边菜单当前索引
    currentIndex() {
			const { scrollY, rightTops } = this
			let index = rightTops.findIndex((height, index) => {
				return scrollY >= rightTops[index] && scrollY < rightTops[index + 1]
			})
			if (scrollY > rightTops[index + 1] - 50) {
				// console.log(scrollY, rightTops[index])
				index++;
			}
			return index
		},
		// 总价格
		totalPrice() {
			var totalPrice = 0
			this.menus.forEach(e => {
				if (e.canPinlList) {
					e.canPinlList.forEach(ee => {
						if (ee.price && ee.num) {
							totalPrice += ee.price * ee.num
						}
					})
				}
			})
			return totalPrice
		},
		// 已添加购物车总数
		hadSelectNum() {
			var totalNum = 0
			this.menus.forEach(e => {
				if (e.canPinlList) {
					e.canPinlList.forEach(ee => {
						if (ee.num) {
							totalNum += ee.num
						}
					})
				}
			})
			return totalNum
		},
		// 购物车列表
		shoppingCardList() {
			var cardList = []
			this.menus.forEach(e => {
				if (e.canPinlList) {
					e.canPinlList.forEach(ee => {
						if (ee.num) {
							cardList.push(ee)
						}
					})
				}
			})
			return cardList
		}
  	},
	created() {
		// 添加到缓存视图
		this.$store.dispatch('cacheViews/addCachedView', this.$route)
		this.$store.dispatch('order/updateShopId', this.$route.params.shopId)

		this.shopName = this.$route.params.shopName
		this.$nextTick(() => {
		  this._calculateHeight()
		})

		// getImgList接口必须传空数据，不然报错
		const data = {}
		getImgList(data).then(resp => {
			this.imgList = resp.imgList
		})

		this.fetchDate()
	},
	methods: {
		// 返回上级页面
		goback() {
			this.$router.go(-1)
		},
		// 点击购物车
		onClick() {
			if (this.popupVisible) {
				this.popupVisible = false
			} else {
				this.popupVisible = true
			}
		},

		// 去结算
		onSubmit() {
			if (this.shoppingCardList.length > 0) {
				this.$store.dispatch('order/setShoppingCart', this.shoppingCardList).then(() => {
					this.$router.push({ name: 'orderSubmit', params: { shopName: this.shopName } })
				}).catch(err => {
					Notify(err)
				})
			} else {
				Notify('请先选购商品')
			}
		},

		// 获取菜单数据
		fetchDate() {
			getMenu(this.queryInfo).then(resp => {
				const data = resp
				data.forEach(e => {
					if (e.canPinlList) {
						e.canPinlList.forEach(ee => {
							ee.num = 0
						})
					}
				})

				this.menus = resp
			})
		},

		// 清空购物车
		clearShopping() {
			this.menus.forEach(e => {
				if (e.canPinlList) {
					e.canPinlList.forEach(ee => {
						if (ee.num) {
							ee.num = 0
						}
					})
				}
			})
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
	.merchant-container .swipeBox {
		width: 100%;
		height: 200px;
		margin: 0 auto;
		margin-bottom: 10px;
		transform: translateZ(0);
	}

	.merchant-container {
		height: 100%;
	}

	.merchant-container .nav-bar {
    	padding-top: 20px;
    	padding-bottom: 20px;
    	transform: translateZ(0);
		-webkit-transform: translateZ(0);
	}

	.merchant-container .nav-title {
		font-size: 36px;
	}

	.merchant-container .my-swipe .van-swipe-item {
	  color: #fff;
	  font-size: 20px;
	  line-height: 150px;
	  text-align: center;
	  background-color: #39a9ed;
	}

	.merchant-container .tab-title {
		font-size: 34px;
		line-height: 34px;
	}

	.merchant-container .van-tabs__wrap, .merchant-container .van-tabs__wrap scroll-view, .merchant-container .van-tabs__nav, .merchant-container .van-tab {
	  height: 70px !important;   
	  background-color: #f5f5f5;
	}

	.merchant-container .cascad-menu {
		display: flex;
		height: 950px;
		width: 100%;
		height: calc(100vh - 460px);
		overflow: hidden;
	}

	.merchant-container .cascad-menu .left-menu {
		flex: 0 0 160px;
		text-align: center;
		width: 360px;
		background-color: #f5f5f5;
	}

	.merchant-container .cascad-menu .left-menu .left-item {
		height: 80px;
		width: 100%;
	}

	.merchant-container .cascad-menu .left-menu .left-item.current {
		background-color: #fff;
	}

	.merchant-container .cascad-menu .left-menu .left-item .text {
		width: 100%;
		font-size: 30px;
		line-height: 80px;
	}

	.merchant-container .cascad-menu .right-menu {
		flex: 1;
	}

	.merchant-container .van-goods-action {
		width: 100%;
		height: 105px;
		z-index: 9999;
	}

	.merchant-container .van-goods-action-icon {
		padding-left: 160px;
		padding-right: 50px;
		margin-top: 20px;
	}

	.merchant-container .van-icon.van-icon-cart.van-goods-action-icon__icon {
    font-size: 60px;
	}

	.merchant-container .total-currency-symbol {
		font-size: 28px;
		margin-top: 5px;
	}

	.merchant-container .total-price {
		font-size: 40px;
		margin-top: 5px;
	}

	.merchant-container .van-goods-action .van-button {
		width: 240px;
		height: 100%;
		font-size: 32px;
		margin: 0 0 0 auto;
	}

	.merchant-container .card {
		padding: 0 20px 30px 20px;
	}

	.merchant-container .popup-title {
		padding: 40px;
	}

	.merchant-container .popup-title-left {
		font-size: 30px;
	}

	.merchant-container i.van-icon.van-icon-delete {
    	vertical-align: middle;
	}

	.merchant-container .popup-title-right {
		font-size: 28px;
		color: #808080;
		text-align: right;
	}

	.merchant-container .popup-footer {
		padding-bottom: 130px;
	}

	.merchant-container .had-menus {
		padding: 40px;
	}

	.merchant-container .had-menus .shopping-card {
		margin-top: 10px;
	}

	.merchant-container .empty-shopping {
	    font-size: 30px;
	    text-align: center;
	    padding: 80px;
	    color: #808080;
	}
	.van-stepper__minus::after, .van-stepper__minus::before {
		background: #1989fa;
	}
	.van-stepper__plus::after, .van-stepper__plus::before {
		background: #fff;
	}
	.van-stepper__minus::before, .van-stepper__plus::before {
		height: 5px;
	}
	.van-stepper__minus::after, .van-stepper__plus::after {
		width: 5px;
	}
	.van-button__icon {
	    font-size: 2.4em;
	}
</style>
