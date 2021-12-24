<template>
	<view class="content">
		<view class="inputView">
			<label for="accountInput">账号</label>
			<input type="text" placeholder="accid" id="accountInput" v-model="account" />
		</view>
		<view class="inputView">
			<label for="pwdInput">密码</label>
			<input type="text" placeholder="token" id="pwdInput" v-model="password" />
		</view>
		<view class="loginBtn" @click="login"><button>登录</button></view>
	</view>
</template>

<script>
import NIMSDK from 'nim-web-sdk-ng/dist/NIM_UNIAPP_SDK';
export default {
	data() {
		return {
			account: 'yanchaodemo01',
			password: 'aaaaaa',
			nim: {}
		};
	},
	methods: {
		async login() {
			this.nim = new NIMSDK({
				appkey: '4727023efa991d31d61b3b32e819bd5b',
				account: this.account,
				token: this.password,
				debugLevel: 'debug'
			});

			getApp().globalData.nim = this.nim;

			//初始化事件监听
			getApp().globalData.eventList.forEach(key => {
				this.nim.on(key, res => {
					console.log(`收到 ${key} 事件：`, res ? JSON.parse(JSON.stringify(res)) : res);
				});
			});

			//连接并且登陆后，会收到 logined 事件W
			try {
				await this.nim.connect();
				getApp().globalData.accid = this.account;
				uni.redirectTo({
					url: '/pages/sessions/sessions'
				});
			} catch (ex) {
				console.warn('登录失败', ex);
			}
		}
	}
};
</script>

<style lang="scss">
input {
	font-size: 28rpx;
	border-radius: 5rpx;
	padding: 20rpx 15rpx;
	box-shadow: 0 0 2rpx #000;
}

label {
	font-size: 28rpx;
	padding: 20rpx 15rpx;
}
.content {
	position: absolute;
	top: 10%;
	left: 33%;
	transform: translate(-16.5%, -50%);
	.inputView {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		align-items: center;
		justify-content: center;
		.loginBtn {
			display: block;
		}
	}
}
</style>
