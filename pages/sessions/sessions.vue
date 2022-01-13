<template>
	<view class="wrapper">
		<view class="main-text-button">
			<view class="messageInputField"><input v-model="msg" /></view>
			<view class="messageSendButton"><button @click="sendMsg">Send</button></view>
			<view class="messageSendButton"><button @click="test">Test</button></view>
		</view>
		<view v-for="(msg, index) in msgList" :key="index">
			<view
				v-bind:class="{
					'msg-main': msg.isMe == true,
					'msg-main-from': msg.isMe == false
				}"
			>
				<view class="msg-main-head"><img src="../../static/default-icon.png" style="zoom: 48%" /></view>
				<view class="msg-main-text-box">
					<view class="msg-main-text">{{ msg.text }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nim: {},
			msg: '',
			msgList: []
		};
	},
	mounted() {
		const _this = this;
		if (Object.keys(getApp().globalData.nim).length === 0) {
			uni.redirectTo({
				url: '/pages/index/index'
			});
		} else {
			getApp().globalData.nim.on('msg', function(msg) {
				console.log('收到了消息', msg);
				if (msg.from !== getApp().globalData.accid) {
					_this.msgList.push(_this.buildMsg(msg));
				}
			});
		}
	},
	methods: {
		async sendMsg() {
			try {
				const msg = await getApp().globalData.nim.msg.sendTextMsg({
					scene: 'p2p',
					to: 'yanchaodemo2',
					body: this.msg
				});
				console.log(msg);
				this.msgList.push(this.buildMsg(msg));
				console.log(this.msgList);
			} catch (ex) {
				console.warn('发送消息失败', ex);
			}
		},
		buildMsg(msg) {
			return {
				id: msg.idClient,
				isMe: msg.from === getApp().globalData.accid,
				text: msg.body,
				time: msg.time
			};
		},
		async test() {
			try {
				console.log(getApp().globalData.nim);
				await getApp().globalData.nim.user.setBlack({ account: 'yanchaodemo2', isAdd: true });
				const list = await getApp().globalData.nim.user.getBlackList();
				console.log('list', list);
			} catch (ex) {
				console.warn(ex);
			}
		}
	}
};
</script>

<style lang="scss">
.main-text-button {
	display: flex;
	left: 0;
	width: 100%;
	background-color: #e5f4ff;
	border-radius: 0 0 5rpx 5rpx;
	padding: 10rpx;
}

.messageInputField {
	position: relative;
	height: 100%;
	width: 65%;
	float: left;
	padding: 10rpx;
}

.messageSendButton {
	position: relative;
	height: 100%;
	width: 30%;
	float: left;
	padding: 5rpx;
}

.msg-main {
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-start;
}

.msg-main {
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-start;
}

.msg-main-from {
	display: flex;
	align-items: flex-start;
}

.msg-main-head {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	overflow: hidden;
}

.msg-main-text-box {
	text-align: right;
}

.msg-main-text {
	position: relative;
	display: inline-block;
	padding: 14rpx 24rpx;
	margin: 0 20rpx;
	color: #fff;
	background: #5cacde;
	border-radius: 16rpx;
	text-align: left;
	max-width: 300rpx;
	word-break: break-all;
}
</style>
