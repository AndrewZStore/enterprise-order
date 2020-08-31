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
		<div class="content">
			<van-tabs v-model="activeName">
				<van-tab title="点餐" name="order">
					<div id="wrap">
						<div class="goodMenu" ref="goodMenu">
							<ul>
							  <li v-for="(item ,index) in goodMenu" :key="index"
							   :class="{active: currentIndex === index}"
							   @click="selectLeft(index)" ref="lItem">{{ item}}</li>
							</ul>
						</div>
						<div class="goodList" ref="goodList">
							<ul>
							  <li v-for="(items, index) in goodList" :key="index" ref="rItem">
							    <p>{{ items.name}}</p>

							    <div v-for="(item, key) in items.data" :key="key">
							      {{ item}}
							    </div>
							  </li>
							</ul>
						</div>
					</div>
					<!-- <van-card
						v-for="(item, index) in goodMenu"
						:price="item.price"
						:desc="item.desc"
						:title="item.title"
						:thumb="item.thumb"
					>
						<template #num>
							<van-stepper v-model="item.num" theme="round" disable-input />
						</template>
					</van-card> -->
				</van-tab>
				<van-tab title="商家" name="shop"></van-tab>
			</van-tabs>
		</div>
		<van-goods-action>
			<van-goods-action-icon icon="cart" @click="onClick" />
			<span>￥1889</span>
			<van-goods-action-button type="primary" text="去结算" />
		</van-goods-action>

		<van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />
	</div>
</template>

<script>
import BScroll from "better-scroll"

export default {
	name: 'merchant',
	data() {
		return {
			goodMenu: ['菜单1', '菜单2','菜单3', '菜单4', '菜单5', '菜单6', '菜单7', '菜单8'],
			goodList: [
				{ name: '菜单1', data: ['1.1', '1.2', '1.3', '1.4', '1.5']},
				{ name: '菜单2', data: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6']},
				{ name: '菜单3', data: ['1.1', '1.2', '1.3', '1.4', '1.5']},
				{ name: '菜单4', data: ['1.1', '1.2', '1.3', '1.4', '1.5']},
				{ name: '菜单5', data: ['1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8']},
				{ name: '菜单6', data: ['1.1', '1.2', '1.3', '1.4', '1.5']},
				{ name: '菜单7', data: ['1.1', '1.2', '1.3', '1.4']},
				{ name: '菜单8', data: ['1.1', '1.2']},
			],
			//获取实时滚动位置
			scrollY: 0,
			//获取每一个li的高度
			heightList: [],
			shopName: '麻辣小龙虾',
			activeName: "order",
			show: false,
			goodMenua: [
				{
					num: 0,
					price: 10,
					desc: "test",
					title: "test",
					thumb: "https://img.yzcdn.cn/vant/ipad.jpeg"
				}
			]
		}
	},
	created() {
        //因为 _scrollInit函数需要操作DOM，因此必须在DOM元素存在文档中才能获取DOM节点
        //因此在 nextTick回调函数里面调用可以是实现此功能
        this.$nextTick(() => { 
            this._scrollInit()
            this.getHeight()
        }) 
    },
    computed: {
        currentIndex(){
            const index = this.heightList.findIndex((item, index) =>{
                return this.scrollY >= this.heightList[index] && this.scrollY < this.heightList[index + 1]
            })

        	return index > 0 ? index : 0
        }
    },
	methods: {
		selectLeft (index) {
	        let rItem = this.$refs.rItem
	        let el = rItem[index]
	        this.goodmenu.scrollToElement(el, 1000)
	    },
		//初始化 better-scroll
        _scrollInit() {
            this.menuList = new BScroll(this.$refs.goodMenu, {
                click: true
            })

            this.goodmenu = new BScroll(this.$refs.goodList, {
                probeType: 3
            })
	        this.goodmenu.on('scroll', (pos) =>{
	            //获取实时滚动的距离 使用scrollY接收         
	            this.scrollY = Math.abs(Math.round(pos.y))
	        })
        },
        getHeight(){
            //获取每一个li的高度
            const lis = this.$refs.rItem
            //heightList的第一个元素为0
            let height = 0
            this.heightList.push(height)
            //之后的高度即为当前li的高度加上之前面li的高度和
            lis.forEach(item =>{
            height += item.clientHeight
               this.heightList.push(height)
            })
        },
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
		}
	}
}
</script>

<style>
.merchant-container {
	overflow: hidden;
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

.goodMenu {
    float: left;
}

.goodList {
    float: left;
    margin-left: 20px;
    overflow: auto;
    height: 1000px;
}
</style>
