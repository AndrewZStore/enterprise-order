<template>
	<div class="pwdBg">
		<div class="nav-bar pwd-bar">
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
					<span class="nav-title">投诉 / 建议</span>
				</template>
			</van-nav-bar>
		</div>

		<div class="modifyCont">
			<h3>投诉内容</h3>
			<van-field
				v-model='name'
			  readonly
			  clickable
			  name="picker"
			  :value="value"
			  label="投诉"
			  placeholder="请选择类型"
			  :rules="[{ required: true }]"
			  @click="showPicker = true"
			/>
			<van-popup v-model="showPicker" position="bottom">
			  <van-picker
			    show-toolbar
			    :columns="columns"
			    @confirm="onConfirm"
			    @cancel="showPicker = false"
			  />
			</van-popup>
			<h3>建议内容</h3>
			<van-field
			  v-model="advice"
			  rows="2"
			  autosize
			  type="textarea"
			  maxlength="50"
			  :rules="[{ required: true }]"
			  placeholder="请输入内容"
			  show-word-limit
			/>
			<van-button type="primary" @click='submit'>提交</van-button>
		</div>
	</div>
</template>

<script>
	import { submitComplain, ComplainType } from '@/api/user'
	import { Toast } from 'vant'
	export default {
		name: 'Complain',
		data() {
			return {
				value: '',
				complain: '',
				name : '',
				advice: '',
				showPicker: false,
				commentType: {},
				columns: []
			}
		},
		created() {
			this.getQueryCommentType()
			// console.log(this.commentType)
			//this.columns = commentType.values
		},
		methods: {
			// 返回
			goback() {
				this.$router.go(-1)
			},
			onConfirm(values) {
				this.commentType.map(re => {
					if (re.val == values){
						this.complain = re.key
						this.name = re.val
					}
				})
				this.showPicker = false;

				/*
	      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/');
	      this.showPicker = false;*/
	    },
			getQueryCommentType() {
				ComplainType({}).then(resp => {
					this.commentType = resp.list

					this.commentType.map(re => {
						this.columns.push(re.val)
					})
					console.log(this.columns)
				})
			},
			submit() {
				submitComplain({ userId: this.$store.getters.userId, sysId: this.$store.getters.sysId, commentType: this.complain, commentInfo: this.advice }).then(resp => {
					console.log(resp)
					Toast.success('提交成功');
					this.goback()
				}).catch(err => {
					console.log(err)
					Toast.fail('提交失败，请重新提交')
				})
			}
		}
	}
</script>

<style>
	.pwdBg {
		background: #f5f5f5;
		min-height: 100vh;
	}
	.pwd-bar {
  	padding-top: 20px;
  	padding-bottom: 20px;
  	transform: translateZ(0);
		-webkit-transform: translateZ(0);
		background: #fff;
		margin-bottom: 15px;
	}
	.pwd-bar .van-nav-bar__title {
    max-width: 60%;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 1rem;
	}
	.pwd-bar .nav-title {
		font-size: 36px;
	}
	.modifyCont {
		box-sizing: border-box;
		padding: 0 10px;
	}
	.modifyCont .van-field__label {
		width: 180px;
		font-size: 25px;
		line-height: 70px;
	}
	.modifyCont .van-field__body {
		font-size: 25px;
		line-height: 70px;
	}
	.modifyCont .van-button {
		display: block;
    margin: 0 auto;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
    margin-top: 25px;
    width: 150px;
    background: #434343;
    border: 0;
	}
.van-toast {
	width: 220px;
	min-height: 200px;
	font-size: 30px;
}

.van-toast__icon {
  font-size: 60px;
}
</style>