<template>
	<div class="card-small">
  	<van-row>
    	<van-col :span="5">
        <van-image :src="item.img" />
			</van-col>
			<van-col :span="19">
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
				  		<van-button v-if="item.value == 0" @click="addNum(item)" round icon="plus" type="info" size="30"></van-button>
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
		name: "card-small",
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
	.card-small .van-image {
		width: 125px;
		height: 125px;
	}

	.card-small .card-title {
		font-size: 30px;
	}
	
	.card-small .currency-symbol {
		font-size: 28px;
		color: #fb5443;
	}

	.card-small .card-total-price {
		padding-top: 50px;
	}

	.card-small .card-price {
		font-size: 40px;
		color: #fb5443;
	}

	.card-small .stepper {
		text-align: right;
		padding-top: 32px;
	}

	button.van-button.van-button--info.van-button--30.van-button--round {
	    width: 60px;
	    height: 60px;
	}

	.card-small .van-stepper--round .van-stepper__plus {
	    color: #fff;
	    background-color: #1989fa;
	}

	.card-small .van-stepper--round .van-stepper__minus {
		color: #1989fa;
		border-color: #1989fa;
	}

	.card-small input.van-stepper__input {
    	font-size: 30px;
	}
</style>