<template>
	<!-- 轮播 -->
	<div class="swipeBox">
		<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
		  <van-swipe-item v-for='(item, index) in imgData' :key='index'>
        <van-image lazy-load fit="fill" width="100%" height="100%" :src="item.imgUrl">
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
  .swipeBox {
  	width: 100%;
    height: 100%;
  	border-radius: 15px;
    transform: translateZ(0);
  }

  .my-swipe.van-swipe {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }

  .my-swipe {
    transform: translateZ(0);
    z-index: 100;
  }
</style>