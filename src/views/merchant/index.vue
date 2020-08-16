<template>
	<div class="merchant-container">
		<div class="merchant_detail_header">
			<span class="svg-container">
        <svg-icon icon-class="back" />
      </span>
			<span class="merchant_name">
				{{ shopName }}
			</span>
		</div>
		<div class="merchant_detail_logo" width="80" height="80">
			<img src="@/assets/logo.jpg" width="80" height="80">
		</div>
		<div class="merchant_intro">
			<span>{{ shopName }}</span>
		</div>
		<div class="merchant_detail_info">
			 
		</div>
	</div>
</template>

<script>
	export default {
		name: 'merchant',
		data() {
			return {
				shopName: '麻辣小龙虾'
			}
		},
		methods: {
			goback() {
				// 
			}
		}
	}
</script>

<style>
.merchant-container {
	width: 100%;
	height: 100%;
}

.merchant_detail_header {
	width: 100%;
	height: 120px;
	background-color: #a8a8a8;
	position: relative;
}

.merchant_name {
	
}

.svg-container {
	
}

.merchant_logo {
	background-color: #a8a8a8;
}

</style>
