<template>
	<div class="Main">
		<div class="main_top">
			<van-row class="main_logo" type="flex" justify="space-between">
				<van-col :span="4"></van-col>
				<van-col :span="10"><img src="../../public/main-top-bg.png" /></van-col>
				<van-col :span="4"><van-icon class="iconfont iconsousuo" @click="onSearch"></van-icon></van-col>
			</van-row>

			<van-row class="main_nav" type="flex" justify="space-around">
				<van-col class="nav_item" :span="6" v-for="(item,index) in navItems" :key="index" >
					<div @click="CheckItem(item)">{{item.title}}</div>
				</van-col>
			</van-row>
			
		</div>
		
		
		<router-view></router-view>
		<!--
			书架   书城   我的 
			
		-->
	</div>
</template>

<script>
	export default {
		name: 'Main',
		data() {
			return {
				navItems: [{
						title: '精品',path:{name:'Competitive'}
					},
					{
						title: 'VIP',path:{name:'Vip'}
					},
					{
						title: '分类',path:{name:'Classify'}
					},
					{
						title: '排行',path:{name:'Seqence'}
					}
				]
			}
		},
		methods:{
			CheckItem(item){
				this.$router.push(item.path)
			},
			onSearch(){
				var hash = location.hash

				this.$router.push({name:'Search',params:{hash:hash}})
				
				
			}
		},
		mounted() {
			this.axios
				.get('http://novel.juhe.im/categories')
				.then(r => {
					//console.log(r.data)
					var i = {
						female: r.data.female,
						male: r.data.male,
						picture: r.data.picture,
						press: r.data.press
					}
					localStorage.setItem('books',JSON.stringify(i))
				})
			
			this.$router.push({name:'Competitive'})
				
		},
		cerated() {
			
				
		}

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.Main {
		max-width: 640PX;
		margin: 0 auto;
		.main_top {
			/*background:red;*/
			font-size: 14PX;
			.main_logo {
				padding: 0.5rem 0;
				.iconfont {
					font-size: 30PX;
					color: #B93321;
				}
			}
			.main_nav {
				background: brown;
				padding: 0.1rem 0.5rem;
				text-align: center;
				color: #ddd;
				.nav_item {
					padding: 0.2rem 0;
				}
			}
		}
	}
</style>