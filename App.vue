<script>
const eventList = [
	// 登陆完成事件
	'logined',

	// 收到多端登陆通知触发事件
	'multiPortLogin',

	// 被踢
	'kicked',

	// 即将开始重连
	'willReconnect',

	// 断开连接
	'disconnect',

	// 收到消息
	'msg',

	// 同步完成
	'syncdone',
	"relations",

	'proxyMsg',
	'syncRoamingMsgs',
	'syncOfflineMsgs',
	'syncMyNameCard',
	'syncdone',
	'sessions',
	'onUpdateMyNameCard',
	'updateBlackList',
	'updateMuteList',
	'sysMsg',
	'syncOfflineSysMsgs',
	'syncFriend',
	'friends',
	'users',
	'updateSystemMessages',
	'sysMsgUnread',
	'pushEvents',
	'teamMsgReceipts',
	'updateSession',

	'teams',
	'createTeam',
	'updateTeamMember',
	'updateTeam',
	'addTeamMembers',
	'updateTeamManagers',
	'transferTeam',
	'removeTeamMembers',
	'dismissTeam',
	'updateTeamMembersMute'
];

const nim = {};

const accid = '123';

export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		eventList,
		nim,
		accid
	}
};
</script>

<style>
/*每个页面公共css */
</style>
