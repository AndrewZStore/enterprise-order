<template>
			<!-- 轮播 -->
	<div class="swipeBox">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item v-for='(item, index) in imgData' :key='index'>
        <van-image lazy-load :src="item.imgUrl">
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
	export default {
		name: 'swipeSlider',
		props: ['imgData']
	}
</script>

<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 240px;
    text-align: center;
    background-color: #39a9ed;
    width: 100%;
    overflow: hidden;
  }
  .swipeBox {
  	width: 95%;
  	margin: -100px auto 20px;
  	border-radius: 10px;
  	overflow: hidden;
  	height: 250px;
  }
</style>