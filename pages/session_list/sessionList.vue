<template>
	<view>
		<el-row v-for="(item,index) in sessionList" :key="index"
			style="border: solid blue;padding:12rpx;margin-bottom: 12rpx;">
			<view :id="item.id" @click="redirect">
				<el-descriptions>
					<el-descriptions-item label="会话id">{{item.id}}</el-descriptions-item>
					<el-descriptions-item label="最新消息">{{item.lastMsg.body}}</el-descriptions-item>
					<el-descriptions-item label="未读数">{{item.unread}}</el-descriptions-item>
				</el-descriptions>
			</view>
		</el-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sessionList: [],
				currentSessionId: ''
			}
		},
		async created() {
			if (Object.keys(getApp().globalData.nim).length === 0) {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			} else {
				getApp().globalData.nim.on('sessions', res => {
					getApp().globalData.addSessions(res);
					this.sessionList = getApp().globalData.sessionList;
				});
			}
		},
		mounted() {},
		methods: {
			redirect(event) {
				this.currentSessionId = event.currentTarget.id;
				getApp().globalData.nim.session.resetSessionUnreadCount({
					id: this.currentSessionId
				})
				console.log(getApp().globalData.nim)
				uni.navigateTo({
					url: `/pages/sessions/sessions?id=${event.currentTarget.id}`
				});
			}
		}
	}
</script>

<style>

</style>
