<template>
	<div class="seacrch_data">
		<top-nav-bar :title="Txt()"></top-nav-bar>
		<van-row class="data_lists">
			<van-col class="list_item" :span="24" v-for="(item,index) in books" :key="index">
				<div @click="getBookInfo(item)">
					<van-col :span="4">
						<img :src="Cover(index)" />
					</van-col>
					<van-col :span="19" offset="1">
						<div class="content_name">{{item.title}}</div>

						<div class="content_desc">
							<div class="content_info">
								<span class="author">{{item.author}}</span>
								<span class="l">|</span>
								<span>{{item.cat}}</span>
							</div>
							{{item.shortIntro}}
						</div>
						<div class="content_cate clearfix">
							<van-col :span="8"><span class="col">{{Follower(index)}}</span>人气</van-col>
							<van-col :span="8"><span class="col">{{item.retentionRatio}}%</span>读者留存</van-col>
						</div>
					</van-col>
				</div>
			</van-col>
		</van-row>
		<!--<!--<router-view></router-view>-->
	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	
	export default {
		name: 'GetBooks',
		data() {
			return {
				keyword: null,
				books: null,
				follower: null
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
			back() {
				this.$router.push({
					name: 'Search'
				})
			},
			Cover(index) {
				return this.img = decodeURIComponent(this.books[index].cover).replace(/\/agent\//, "")
			},
			Follower(index) {
				if(this.books[index].latelyFollower > 10000) {
					var follower = this.books[index].latelyFollower / 10000
					return this.follower = follower.toFixed(1) + "万"
				} else {
					return this.follower = this.books[index].latelyFollower
				}

			},
			getBookInfo(item) {
				//				item._id
				localStorage.setItem('bookid', JSON.stringify(item._id))
				this.$router.push({name: 'BookInfo'})
			},
			Txt(){
				var str = ''
				return str = '搜索与'+this.keyword+'有关的书籍'
			}
		},
		mounted(){
			var keyword = JSON.parse(localStorage.getItem('keyword'))
			this.keyword = keyword
			this.axios
				.get('http://novel.juhe.im/search?keyword=' + this.keyword)
				.then(r => {
					
					 r.data.books.length = 15
					 var data = r.data.books
					this.books = data
//					console.log(this.books)
				})
		},
		created() {

//			console.log('0000')

		}
	}
</script>

<style scoped lang="less">
	.seacrch_data {
		.search_bar {
			text-align: center;
			font-size: 16PX;
			padding: 0.3rem 0;
			background-color: #b93321;
			color: #fff;
			.icon{
				vertical-align:middle;
			}
		}
		.data_lists {
			margin-left: 0.5rem;
			/*margin-top: 0.5rem;*/
			/*.list{*/
			.list_item {
				padding-bottom: 0.5rem;
				margin: 0.5rem 0 0;
				border-bottom: 1PX solid #ccc;
				.content_name {
					color: #333;
					font-size: 14PX;
				}
				.content_desc {
					.content_info {
						margin: 0.1rem 0;
						.author {
							/*margin-left: ;*/
						}
						.l {
							margin: 0 0.3rem;
						}
					}
					height: 1rem;
					overflow: hidden;
					color: #999;
					font-size: 12PX;
					margin: 0.1rem 0 0 0.3rem;
				}
				.content_cate {
					margin: 0.2rem 0 0;
					padding-bottom: 0.1rem;
					color: #666;
					.col {
						color: #B93321;
					}
				}
			}
			/*}*/
		}
	}
</style>