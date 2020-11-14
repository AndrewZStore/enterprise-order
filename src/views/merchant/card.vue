<template>
	<div class="card">
  	<van-row>
    	<van-col :span="9">
        <van-image lazy-load fit="fill" :src="item.img">
        	<template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
          <template v-slot:error>加载失败</template>
        </van-image>
			</van-col>
			<van-col :span="15">
				<van-row>
		     	<span class="card-title">{{ item.name }}</span>
		    </van-row>
		    <van-row>
		    	<van-col :span="8">
		        	<div class="card-total-price">
			  			<span class="currency-symbol">￥</span>
				        <span class="card-price">{{ item.price }}</span>
				    </div>
				</van-col>
				<van-col :span="16">
			  	<div class="stepper">
			  		<van-button v-if="item.num != 0" @click="subNum(item)"  type="info">
							<svg-icon icon-class="minus2" />
			  		</van-button>
			  		<span v-if="item.num != 0" class="value">{{ item.num }}</span>
			  		<van-button @click="addNum(item)"  type="info">
							<svg-icon icon-class="plus2" />
			  		</van-button>
			  	</div>
				</van-col>
			  </van-row>
			</van-col>
		</van-row>
  </div>
</template>

<script>
	export default {
		name: "card",
		props: ["item"],
		data() {
			return {
				
			}
		},
		methods: {
			addNum(item) {
				item.num += 1
			},
			subNum(item) {
				item.num -= 1
			},
			onChange() {
				
			}
		}
	}
</script>

<style>
	.card .van-image {
		width: 180px;
		height: 180px;
	}

	.card .card-title {
		font-size: 30px;
	}
	
	.card .currency-symbol {
		font-size: 28px;
		color: #fb5443;
	}

	.card-total-price {
		padding-top: 100px;
	}

	.card-price {
		font-size: 40px;
		color: #fb5443;
	}

	.card .stepper {
		text-align: right;
		padding-top: 95px;
	}

	.card .stepper .value {
		font-size: 30px;
		padding: 10px;
	}
</style>