<template>
	<div class="Mini">
		<top-nav-bar title="个人中心"></top-nav-bar>

		<div class="mini_content">
			<div class="content_top">
				<img src="http://statics.zhuishushenqi.com/avatar/b1/9c/b19c0ebc5c4fe255d52ffcfda448c4f4" />
				<div class="top_masking"></div>
				<van-row class="account">
					<van-col :span="4">
						<div class="acc_img">
							<img src="http://statics.zhuishushenqi.com/avatar/b1/9c/b19c0ebc5c4fe255d52ffcfda448c4f4" />
						</div>
					</van-col>
					<van-col :span="16" offset="1">
						<div class="acc_name">{{user.name}}</div>
						<div class="acc_id">{{user.id}}</div>
					</van-col>
				</van-row>
				<van-row class="monry" type="flex" justify="center">
					<van-col :span="12">
						<div>追书卷</div>
						<div class="num">0</div>
						<div>
							<van-tag plain round color="#b93321">兑换</van-tag>
						</div>
					</van-col>
					<van-col :span="12">
						<div>追书币</div>
						<div class="num">0</div>
						<div>
							<van-tag round color="#b93321">充值</van-tag>
						</div>
					</van-col>
				</van-row>

			</div>

			<div class="setting_lists">
				<div class="item" @click="onShelf">
					<van-row  type="flex" justify="space-between">
						<van-col :span="2">
							<img src="../../public/mini_01.png" />
						</van-col>
						<van-col :span="20">我的书架</van-col>
						<van-col :span="1">
							<!--<i class=""></i>-->
							<van-icon name="arrow"></van-icon>
						</van-col>
					</van-row>
				</div>
				
				<div v-for="(item,index) in items" :key="index" class="item">
					<van-row  type="flex" justify="space-between">
						<van-col :span="2">
							<img :src="item.img" />
						</van-col>
						<van-col :span="20">{{item.title}}</van-col>
						<van-col :span="1">
							<!--<i class=""></i>-->
							<van-icon name="arrow"></van-icon>
						</van-col>
					</van-row>
				</div>
				
			</div>
			
		</div>
			<van-col class="btn" :span="18" offset="3">
				<van-button type="danger" size="large" @click="LogOff">退出登录</van-button>
			</van-col>
	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	import { Tag,Button,Dialog } from 'vant';
	//	import { Collapse, CollapseItem } from 'vant';
	export default {
		name: 'Mini',
		data() {
			return {
				items:[
				{img:require('../../public/mini_02.png'),title:'历史记录'},
				{img:require('../../public/mini_03.png'),title:'VIP会员'},
				{img:require('../../public/mini_04.png'),title:'每日签到'},
				{img:require('../../public/mini_05.png'),title:'自动购买'},
				{img:require('../../public/mini_06.png'),title:'充值记录'},
				{img:require('../../public/mini_07.png'),title:'消费记录'},
				{img:require('../../public/mini_08.png'),title:'用户协议'},
				{img:require('../../public/mini_09.png'),title:'用户隐私保护协议'},
				{img:require('../../public/mini_10.png'),title:'侵权申述指引'}
				],
				user:{}
			}
		},
		components: {
			[Tag.name]: Tag,
			'top-nav-bar': TopNavBar,
			[Button.name]: Button,
			[Dialog.name]: Dialog
		},
		methods: {
			onShelf() {
				this.$router.push({
					name: 'BookShelf'
				})
			},
			LogOff(){
				Dialog.confirm({
						message: '是否退出登录'
					}).then(() => {
						sessionStorage.removeItem('loginUser')
						this.$router.push({name:'Login'})
					}).catch(() => {
						
					});
			}
		},
		mounted() {
			
		},
		created() {
			var user = JSON.parse(sessionStorage.getItem('loginUser'))
			if (!user) {
				this.$router.push({name:'Login'})
			}else{
				var usersdata = JSON.parse(localStorage.getItem('usersInfo'))
				this.user = usersdata[user]
			}
		}
	}
</script>

<style scoped lang="less">
	.my_bar {
		text-align: center;
		font-size: 16PX;
		padding: 0.3rem 0;
		background-color: #b93321;
		color: #fff;
		.bar_icon{
			font-size: 18PX;
		}
		.icon {
			vertical-align: middle;
		}
	}
	
	.content_top {
		position: relative;
		height: 5.1rem;
		>img {
			filter: blur(.66667rem);
			position: absolute;
			top: 0;
			z-index: -1;
		}
		.top_masking {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: url(../../public/masking.png) no-repeat;
			background-size: cover;
		}
		.account {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			margin: 0.8rem 0.5rem;
			.acc_img {
				border: 0.5PX solid #fff;
				border-radius: 50%;
				overflow: hidden;
			}
			.acc_name {
				/*font-weight: 500;*/
				font-size: 16PX;
				color: #333;
			}
			.acc_id {
				font-size: 12PX;
				color: #666;
			}
		}
		.monry {
			position: absolute;
			left: 0;
			right: 0;
			top: 2.93333rem;
			background: #FFF;
			margin: 0 0.5rem;
			text-align: center;
			z-index: 10;
			box-shadow: -0.04rem 0.05333rem 0.24rem 0 hsla(0, 0%, 78%, .5);
			border-radius: .05333rem;
			padding: 0.5rem 0;
			.num {
				font-size: 18PX;
				color: #666;
				margin: 0.3rem 0;
			}
			.num:nth-of-type(1) {
				border-right: 1PX solid #666;
			}
		}
	}
	
	.setting_lists {
		background: #fff;
		padding:1.5rem 0 0 0;
		font-size: 14PX;
		
		.item {
			/*padding-top: 2rem;*/
			/*background: #fff;*/
			
			vertical-align: middle;
			line-height: 28PX;
			padding: 0.3rem 0.5rem;
		}
		.item:nth-of-type(2),
		.item:nth-of-type(3),
		.item:nth-of-type(4),
		.item:nth-of-type(5),
		.item:nth-of-type(7){
			border-bottom: 5PX solid #f3f3f3;
		}
		/*padding:1rem 0 0 0 ;*/
	}
	.btn{
		margin-top: 0.5rem ;
		margin-bottom: 0.5rem;
	}
</style>