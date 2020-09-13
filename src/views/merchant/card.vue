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
				  		<van-button v-if="item.value == 0" @click="addNum(item)" round icon="plus" type="info" size="30" style="width:30px;height:30px;line-height:30px;"></van-button>
				  		<van-stepper v-else min="0" v-model="item.value" theme="round" button-size="30" input-width="25" disable-input />
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
				item.value += 1
			},
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

	.stepper {
		text-align: right;
		padding-top: 85px;
	}

	.van-stepper--round .van-stepper__plus {
	    color: #fff;
	    background-color: #1989fa;
	}

	.van-stepper--round .van-stepper__minus {
		color: #1989fa;
		border-color: #1989fa;
	}

	input.van-stepper__input {
    	font-size: 30px;
	}
</style>