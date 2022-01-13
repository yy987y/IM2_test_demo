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
			account: 'yanchaodemo',
			password: 'aaaaaa'
		};
	},
	methods: {
		async login() {
			getApp().globalData.nim = new NIMSDK({
				appkey: '4727023efa991d31d61b3b32e819bd5b',
				account: this.account,
				token: this.password,
				debugLevel: 'debug'
			});

			// 初始化事件监听
			getApp().globalData.eventList.forEach(key => {
				getApp().globalData.nim.on(key, res => {
					console.log(`收到 ${key} 事件：`, res ? JSON.parse(JSON.stringify(res)) : res);
				});
			});
			getApp().globalData.nim.on('logined', res => {
				console.log(`收到 login 事件：`, res ? JSON.parse(JSON.stringify(res)) : res);
				console.log('收到了 aosPushToken，下一步需要注册给插件', res.aosPushInfo && res.aosPushInfo.pushType);
				this.regToken(getApp().globalData.nim, res.aosPushInfo);
				uni.redirectTo({
					url: '/pages/sessions/sessions'
				});
			});

			//连接并且登陆后，会收到 logined 事件W
			try {
				await getApp().globalData.nim.connect();
				getApp().globalData.accid = this.account;
			} catch (ex) {
				console.warn('登录失败', ex);
			}
		},

		regToken(nim, aosPushInfo = {}) {
			console.log('得到 aosPushInfo 为', aosPushInfo);

			// 判断系统类型，非手机环境、不支持 uni.requireNativePlugin 的则退出
			const systemInfo = uni.getSystemInfoSync() || {};
			const os = systemInfo.platform ? systemInfo.platform.toLowerCase() : '';
			if (os !== 'ios' && os !== 'android') {
				console.warn('所在环境非 IOS 或者 Android');
				return;
			}
			if (typeof uni.requireNativePlugin !== 'function') {
				console.warn('所在环境不支持 uni.requireNativePlugin');
				return;
			}
			try {
				// 获取前文注入工程的的原生插件
				let nimPushPlugin = uni.requireNativePlugin('NIMUniPlugin-PluginModule');
				console.log('nimPushPlugin' + nimPushPlugin==null);

				// 订正 pushType。其中 ios 没有 aosPushInfo 参数的，需要特意判断下。
				// 如果是 android 设备，但服务器并没有下发推荐的通道，那么可能是 FCM 的，注意，FCM 通道推送不成功。
				var pushType = '';
				if (aosPushInfo && aosPushInfo.pushType) {
					pushType = aosPushInfo.pushType;
				} else if (os === 'ios') {
					pushType = '';
				} else if (os === 'android') {
					pushType = '8';
				}

				if (typeof nimPushPlugin.getDeviceToken !== 'function') {
					console.warn('没有集成 NIMUniPlugin-PluginModule 插件');
					return;
				}

				console.log('和原生插件交互，注册厂商通道');
				// 和原生插件交互，注册厂商通道
				console.log("--------------------",nimPushPlugin)
				
				nimPushPlugin.getDeviceToken(
					{
						suggestPushType: pushType
					},
					ret => {
						console.log('收到了 token:', ret, pushType);
						var newTokenName = '';
						switch (pushType) {
							case '5':
								newTokenName = 'DEMO_MI_PUSH';
								console.log('推送为小米');
								break;
							case '6':
								newTokenName = 'DEMO_HW_PUSH';
								break;
							case '7':
								newTokenName = 'DEMO_MZ_PUSH';
								break;
							case '8':
								newTokenName = 'DEMO_FCM_PUSH';
								break;
							case '9':
								newTokenName = 'DEMO_VIVO_PUSH';
								break;
							case '10':
								newTokenName = 'DEMO_OPPO_PUSH';
								break;
							default:
								newTokenName = 'ENTERPRISE'; //ios 推送通道
								break;
						}

						console.log('注册好的 token 为: ' + ret);
						// 将注册好的 token 通知 IM 服务器
						nim.user.updatePushToken({
							tokenName: newTokenName,
							token: ret
						});
					}
				);
			} catch (ex) {
				console.log('获取token失败' + ex.toString());
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
