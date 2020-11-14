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
		name: "card-small",
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
			}
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
		padding-top: 45px;
	}

	.card-small button.van-button.van-button--info.van-button--30.van-button--round {
	    width: 60px;
	    height: 60px;
	}

	.card-small .stepper .value {
		font-size: 30px;
		padding: 10px;
	}
</style>