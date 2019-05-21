<template>
	<div class="Search">
		<div>
			<top-nav-bar title="搜索"></top-nav-bar>
			<div class="search-wrapper">
				<div class="search_input">
					<van-icon class="iconfont iconsousuo" size="17px"></van-icon>
					<input type="text" v-model="keyword" ref="inp" placeholder="请输入搜索内容" @input="focusFn" />
				</div>
				<span class="search_sub" @click="clickSub(keyword)">确定</span>
			</div>

			<div class="search_fouse" v-show="isShow">
				<div class="search_hotword">
					<div class="search_hottitle clearfix">
						<div class="hot_title fl">搜索热词</div>
						<div class="hot_refu fr">换一批
							<van-icon name="replay"></van-icon>
							</i>
						</div>
					</div>
					<div class="hot_words">
						<div class="words_cart" v-for="(item,index) in hotwords" :key="index" @click="clickSub(item.word)">{{item.word}}</div>
					</div>
				</div>

				<div class="search_hotword">
					<div class="search_hottitle clearfix">
						<div class="hot_title fl">热门推荐</div>
						<div class="hot_refu fr">换一批
							<van-icon name="replay"></van-icon>
						</div>
					</div>
					<div class="hot_words">
						<div class="words_cart" v-for="(item,index) in hotbooks" :key="index" @click="clickSub(item.word)">{{item.word}}</div>
					</div>
				</div>

				<div class="search_hotword">
					<div class="search_hottitle clearfix">
						<div class="hot_title fl">搜索历史</div>
						<div class="hot_refu fr" @click="delehist">删除历史
							<van-icon name="replay"></van-icon>
						</div>
					</div>
					<div class="search_history">
						<div class="words_cart" v-for="(item,index) in History" :key="index" @click="clickSub(item)">{{item}}</div>
					</div>
				</div>

			</div>

			<div class="search_lists" v-show="!isShow">
				<div class="list" v-for="(item,index) in searchList" :key="index">
					<i class="iconfont iconicon_shuben"></i>
					<div class="list_name">{{item}}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	export default {
		name: 'Search',
		data() {
			return {
				//搜索热词
				hotwords: null,
				//热门推荐
				hotbooks: null,
				//搜索关键字
				keyword: null,

				isShow: true,
				//搜索自动补全
				searchList: null,
				navItems: [{
						name: 'Competitive',
						flag: '/competitive'
					},
					{
						name: 'Vip',
						flag: '/vip'
					},
					{
						name: 'Classify',
						flag: '/classify'
					},
					{
						name: 'Seqence',
						flag: '/seqence'
					}
				],
				History:[]

			}
		},
		components: {

			'top-nav-bar': TopNavBar
		},
		methods: {
			onHome() {
				this.$router.push({
					name: 'Competitive'
				})
			},
			focusFn() {

				if(this.keyword != "") {
					this.isShow = false
					this.axios
						.get('https://novel.juhe.im/auto-complete?query=' + this.keyword)
						.then(r => {
							this.searchList = r.data.keywords
						})

				} else {
					this.isShow = true

				}

			},
			clickSub(word) {
				this.keyword = word

				var login = JSON.parse(sessionStorage.getItem('loginUser'))
				var usersData = JSON.parse(localStorage.getItem('usersInfo'))
				if(!login) {

				} else if(login && !usersData[login].History) {
					usersData[login].History = []
					usersData[login].History.push(this.keyword)
					localStorage.setItem('usersInfo', JSON.stringify(usersData))

				} else {
					for(var i = 0; i < usersData[login].History.length; i++) {
						if(this.keyword == usersData[login].History[i]) {
							localStorage.setItem('keyword', JSON.stringify(this.keyword))
							this.$router.push({
								name: 'GetBooks'
							})
							return
						}
					}
					usersData[login].History.push(this.keyword)
					localStorage.setItem('usersInfo', JSON.stringify(usersData))
				}
				if(this.keyword == null || this.keyword == "") {
					return
				} else {
					localStorage.setItem('keyword', JSON.stringify(this.keyword))
					this.$router.push({
						name: 'GetBooks'
					})
				}

			},
			delehist(){
				var login = JSON.parse(sessionStorage.getItem('loginUser'))
				var usersData = JSON.parse(localStorage.getItem('usersInfo'))
				this.History = []
				usersData[login].History = this.History
				localStorage.setItem('usersInfo', JSON.stringify(usersData))
				
			},
			back() {
				var hash = this.$route.params.hash
				if(hash == undefined) {
					this.$router.push({
						name: 'Competitive'
					})
				} else {
					this.navItems.forEach((v) => {
						if(hash.indexOf(v.flag) > -1) {
							this.$router.push({
								name: v.name
							})
						}
					})
				}

			}
		},
		mounted() {

			this.axios
				.get('https://novel.juhe.im/search-hotwords')
				.then(r => {
					var data = r.data.searchHotWords
					data.length = 15
					this.hotwords = data

				})

			this.axios
				.get('https://novel.juhe.im/hot-books')
				.then(r => {
					var data = r.data.newHotWords
					data.length = 6
					this.hotbooks = data

				})
			var login = JSON.parse(sessionStorage.getItem('loginUser'))
			var usersData = JSON.parse(localStorage.getItem('usersInfo'))
			
			if (!login) {
				this.History = []
			} else{
				this.History = usersData[login].History
			}
			
		},
		created() {
			
		}
	}
</script>

<style scoped lang="less">
	.Search {
		.search_bar {
			text-align: center;
			font-size: 16PX;
			padding: 0.3rem 0;
			background-color: #b93321;
			/*line-height: 16px;*/
			color: #fff;
			.icon {
				vertical-align: middle;
				/*margin-top: 0.1rem;*/
			}
		}
		.search-wrapper {
			/*text-align: center;*/
			margin: 0.5rem;
			font-size: 14PX;
			.search_input {
				display: inline-block;
				background: #ddd;
				padding: 0.2rem;
				border-radius: 0.4rem;
				.el-icon-search {
					margin: 0rem 0.2rem 0 0.1rem;
				}
				input {
					width: 6.5rem;
					/*padding: 0.2rem 0;*/
				}
			}
			.search_sub {
				margin-left: 0.5rem;
				font-size: 16PX;
				color: #666;
			}
		}
		.search_hotword {
			margin: 0.5rem;
			color: #666;
			.search_hottitle {
				.hot_title {
					font-size: 18PX;
				}
			}
			.words_cart {
				background-color: #E5E5E5;
				display: inline-block;
				padding: 0.2rem;
				border-radius: 0.4rem;
				margin: 0.2rem;
			}
		}
		.search_lists {
			margin: 0.5rem;
			.lists_title {
				font-size: 18PX;
				color: #666;
			}
			.list {
				margin: 0.3rem 0;
				font-size: 16PX;
				.list_name {
					margin-left: 0.2rem;
					display: inline-block;
				}
			}
		}
	}
</style>