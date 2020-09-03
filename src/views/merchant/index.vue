<template>
	<div class="merchant-container">
		<van-nav-bar left-arrow @click-left="goback">
			<template #title>
				<span>{{ shopName }}</span>
			</template>
		</van-nav-bar>
		<van-swipe class="my-swipe" :autoplay="1000" indicator-color="white">
		  <van-swipe-item>1</van-swipe-item>
		  <van-swipe-item>2</van-swipe-item>
		  <van-swipe-item>3</van-swipe-item>
		  <van-swipe-item>4</van-swipe-item>
		</van-swipe>
		<van-tabs v-model="activeName">
			<van-tab title="点餐" name="order">
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
				            <p class="text">{{menu.name}}</p>
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
				            <div class="title">{{menu.name}}</div>
				            <ul>
				              <li v-for="(item, j) in menu.data" :key="j">
				                <div class="data-wrapper">
				                  <div class="data">{{item.name}}</div>
				                </div>
				              </li>
				            </ul>
				          </li>
				        </ul>
				      </div>
				    </scroll>
				  </div>
			</van-tab>
			<van-tab title="商家" name="shop"></van-tab>
		</van-tabs>
		<van-goods-action>
			<van-goods-action-icon icon="cart" @click="onClick" />
			<span>￥1889</span>
			<van-goods-action-button type="primary" text="去结算" />
		</van-goods-action>

		<van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Scroll from './scroll'

export default {
	name: 'merchant',
	data() {
		return {
			shopName: '麻辣小龙虾',
			activeName: "order",
			show: false,
			rightTops: [],
			scrollY: 0,
			leftScrollY: 0,
			menus: [
				{
				  name: '菜单1',
				  data: [
				    {
				      name: '1.1'
				    },
				    {
				      name: '1.2'
				    },
				    {
				      name: '1.3'
				    },
				    {
				      name: '1.4'
				    },
				    {
				      name: '1.5'
				    },
				    {
				      name: '1.6'
				    }
				  ]
				},
				{
				  name: '菜单2',
				  data: [
				    {
				      name: '1.1'
				    },
				    {
				      name: '1.2'
				    },
				    {
				      name: '1.3'
				    },
				    {
				      name: '1.4'
				    },
				    {
				      name: '1.5'
				    },
				    {
				      name: '1.6'
				    },
				  ]
				},
				{
				  name: '菜单3',
				  data: [
				    {
				      name: '1.1'
				    },
				    {
				      name: '1.2'
				    },
				    {
				      name: '1.3'
				    },
				    {
				      name: '1.4'
				    },
				    {
				      name: '1.5'
				    },
				    {
				      name: '1.6'
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
				console.log(scrollY, rightTops[index])
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
		goback() {
			// 
		},
		onClick() {
			if (this.show) {
				this.show = false
			} else {
				this.show = true
			}
		},
		onChange(index) {
			Notify({ type: 'primary', message: index})
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
	},
	components: {
		Scroll
	}
}
</script>

<style>
.merchant-container {
	height: 100%;
}

.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.van-goods-action {
	z-index: 9999;
}


.cascad-menu {
	display: flex;
	position: absolute;
	top: 200px;
	bottom: 200px;
	width: 100%;
	overflow: hidden;
}

.cascad-menu .left-menu {
	flex:0 0 80px;
	width: 320px;
	background:#f3f5f7;
}

.cascad-menu .left-menu .left-item {
	height: 108px;
	width: 100%;
}

.cascad-menu .left-menu .left-item.current {
	width:200%;
	background:#fff;
}

.cascad-menu .left-menu .left-item .text {
	width:100%;
	line-height:108px;
}

.cascad-menu .right-menu {
	flex:1;
}

.cascad-menu .right-menu .right-item {
	height:100%;
	border:1px solid #ccc;
}

.cascad-menu .right-menu .right-item .title {
	border-bottom:1px solid #ccc;
	height:40px;
}

.cascad-menu .right-menu .right-item .data-wrapper .data {
	line-height:80px;
	height:80px;
}

</style>
