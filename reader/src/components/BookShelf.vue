<template>
	<div class="BookShelf">
		<top-nav-bar title="书架"></top-nav-bar>

		<div class="search">
			<van-search v-model="keyword" show-action>
				<div slot="action" @click="onSearch">搜索</div>
			</van-search>
		</div>
		<van-tabs class="item_list" v-model="active" title-active-color="#b93321" color="#b93321" :line-width="40">
			<van-tab title="我的书架" class="book_list">
				<div class="list" v-for="(item,index) in books" :key="index">
					<van-row>
						<van-col :span="4">
							<img :src="Cover(index)" />
						</van-col>
						<van-col :span="16" offset="1">
							<h4>{{item.title}}</h4>
							<p class="uptime">
								{{upTime(item)}}更新：{{item.lastChapter}}
							</p>
							<p>阅读到第1章</p>
						</van-col>
						<van-col :span="3" class="icon">
							<van-icon @click="Delete(index)" class="iconfont iconshanchu-copy" size="20px"></van-icon>
						</van-col>
					</van-row>
				</div>
				<div class="none">没有再多了</div>
			</van-tab>
			<van-tab title="我的记录">
				<div class="none">
					无读书记录
				</div>

			</van-tab>
		</van-tabs>

	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	import { Button, Search } from 'vant';
	import { Tab, Tabs } from 'vant';
	export default {
		name: 'BookShelf',
		data() {
			return {
				keyword: null,
				active: 0,
				books: []
			}
		},
		components: {
			[Search.name]: Search,
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			'top-nav-bar': TopNavBar

		},
		methods: {
			onHome() {
				this.$router.push({
					name: 'Competitive'
				})
			},
			onSearch() {

			},
			Cover(index) {
				return this.img = decodeURIComponent(this.books[index].cover).replace(/\/agent\//, "")
			},
			upTime(item) {

				let uptime = new Date(item.updated)
				var strtime = uptime.getFullYear() + "年" + uptime.getMonth() + '月' + uptime.getDate() + '日'
				return strtime

			},
			Delete(index) {
				var i = index
				this.books.splice(i, 1)
				var login = JSON.parse(sessionStorage.getItem('loginUser'))
				var usersData = JSON.parse(localStorage.getItem('usersInfo'))
				usersData[login].books = this.books
				localStorage.setItem('usersInfo', JSON.stringify(usersData))
			}
		},
		mounted() {
			var login = JSON.parse(sessionStorage.getItem('loginUser'))
			var usersData = JSON.parse(localStorage.getItem('usersInfo'))
			this.books = usersData[login].books
			console.log(this.books)

		},
		created() {

		}
	}
</script>

<style scoped lang="less">
	.none {
		text-align: center;
		padding: 0.5rem;
		/*background: #f4f4f4;*/
	}
	
	.BookShelf {
		height: 100vh;
		background: #f4f4f4;
	}
	
	.shelf_bar {
		text-align: center;
		font-size: 16PX;
		padding: 0.3rem 0;
		background-color: #b93321;
		color: #fff;
		.bar_icon {
			font-size: 18PX;
		}
		/*.icon {
				vertical-align: middle;
			}*/
	}
	
	.search {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	
	.item_list {
		.book_list {
			background-color: #fff;
			padding-left: 0.5rem;
			/*padding-top: 0.5rem;*/
			font-size: 12PX;
			color: #999;
			.list {
				padding: 0.4rem 0;
				border-bottom: 0.5PX solid #ddd;
				vertical-align: middle;
				h4 {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 14PX;
					color: #333;
				}
				p {
					margin: 0.2rem 0;
				}
				.icon {
					margin-top: 0.8rem;
				}
			}
			.list:nth-last-of-type(2){
				border-bottom:none;
			}
		}
	}
</style>