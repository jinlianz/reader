<template>
	<div class="BookInfo">
		<top-nav-bar title="书籍详情"></top-nav-bar>

		<van-row class="info_title">
			<van-col class="title_item" :span="24">
				<van-col :span="4">
					<img :src="img" />
				</van-col>
				<van-col :span="19" :offset="1">
					<div class="content_name">{{book.title}}</div>

					<div class="content_desc">
						<div class="content_info">
							<span class="author col">{{book.author}}</span>
							<span class="l">|</span>
							<span>{{book.minorCate}}</span>
							<span class="l">|</span>
							<span>{{wordcount(book.wordCount)}}字</span>
						</div>
						{{upTime()}}更新
					</div>
				</van-col>

			</van-col>
		</van-row>

		<van-row class="button" type="flex" justify="space-around">
			<van-col :span="10">
				<div class="btn add" @click="addBookShelf">
					加入书架
				</div>
			</van-col>
			<van-col :span="10">
				<div class="btn start" @click="startReader">
					开始阅读
				</div>
			</van-col>
		</van-row>

		<van-row class="lately" type="flex" justify="space-around">
			<van-col :span="8">
				<div class="lately_title">追人气</div>
				<div>{{wordcount(book.latelyFollower)}}</div>
			</van-col>
			<van-col :span="8">
				<div class="lately_title">读者留存率</div>
				<div>{{book.retentionRatio}}%</div>
			</van-col>
			<van-col :span="8">
				<div class="lately_title">日更字数/天</div>
				<div>{{book.serializeWordCount}}</div>
			</van-col>
		</van-row>

		<div class="longintro">
			<div class="intro">
				{{book.longIntro}}
			</div>
			<div class="chapter clearfix">
				<div class="fl">
					目录
				</div>
				<div class="fr" @click="chapter">
					{{book.lastChapter}}<i class="van-icon-arrow-right"></i>
				</div>

			</div>
		</div>

		<div class="reviews">
			<div class="rev_title clearfix">
				<div class="fl">热门评论</div>
				<div class="fr">更多评论</div>
			</div>
			<div class="rev_items">
				<div class="rev_item" v-for="(item,index) in reviews" :key="index">
					<van-row>
						<van-col class="img" :span="3">
							<img :src="'http://statics.zhuishushenqi.com'+item.author.avatar" />
						</van-col>
						<van-col class="content" :span="20" :offset="1">
							<div class="item_name">{{item.author.nickname}}</div>
							<div class="item_title">{{item.title}}</div>
							<div class="item_score">热度：{{item.rating}}</div>
							<div class="item_content">{{item.content}}</div>
							<div class="item_love">
								<van-row type="flex" justify="space-around">
									<van-col :span="8"></van-col>
									<van-col :span="8">{{item.likeCount}}人觉得有用</van-col>
								</van-row>
							</div>
						</van-col>

					</van-row>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	import { Dialog, Toast } from 'vant';
	export default {
		name: 'BookInfo',
		data() {
			return {
				book: {},
				img: null,
				reviews: []
				//				wordnum:null
			}
		},
		components: {
			[Dialog.name]: Dialog,
			[Toast.name]: Toast,
			'top-nav-bar': TopNavBar

		},
		methods: {
			wordcount(num) {
				let wordnum
				if(this.book.wordCount > 10000) {
					let wordCount = num / 10000
					return wordnum = wordCount.toFixed(1) + "万"
				} else {
					return wordnum = num
				}

			},
			upTime() {

				let uptime = new Date(this.book.updated)
				var strtime = uptime.getFullYear() + "年" + uptime.getMonth() + '月' + uptime.getDate() + '日'
				return strtime 

			},
			chapter() {
				//				var id = JSON.parse(localStorage.getItem('bookid'))
				this.$router.push({
					name: 'Chapter',
					params: {
						item: this.item
					}
				})

			},
			//开始阅读
			startReader() {
				this.axios
					.get('http://novel.juhe.im/book-chapters/' + this.item._id)
					.then(r => {
						var list = r.data.chapters[0]
						this.$router.push({
							name: 'Book',
							params: {
								Link: list
							}
						})
					})
			},
			//加入书架
			addBookShelf() {
				var login = JSON.parse(sessionStorage.getItem('loginUser'))
				var usersData = JSON.parse(localStorage.getItem('usersInfo'))
				if(!login) {
					Dialog.confirm({
						message: '还没登录，是否登录'
					}).then(() => {
						this.$router.push({
							name: 'Login'
						})
					}).catch(() => {

					});
				} else if(!usersData[login].books) {
					usersData[login].books = []
					usersData[login].books.push(this.book)
					Toast.success('加入书架成功');
					localStorage.setItem('usersInfo', JSON.stringify(usersData))

				} else{
					for (var i = 0; i < usersData[login].books.length; i++) {
						if (this.book._id ==usersData[login].books[i]._id ) {
							Toast.fail('小说已加入书架')
							return
							
						}
						
						
					}
					Toast.success('加入书架成功')
					usersData[login].books.push(this.book)
					localStorage.setItem('usersInfo', JSON.stringify(usersData))
					
				}
				

			}

		},
		mounted() {
			var id = JSON.parse(localStorage.getItem('bookid'))
			this.axios
				.get('http://novel.juhe.im/book-info/' + id)
				.then(r => {
					this.book = r.data
					this.img = decodeURIComponent(this.book.cover).replace(/\/agent\//, "")
					//					console.log('this.book ==>',this.book.title)
					localStorage.setItem('bookname', JSON.stringify(this.book.title))
				})

			this.axios
				.get('https://novel.juhe.im/book/reviews?&limit=2&book=' + id)
				.then(r => {
					this.reviews = r.data.reviews
				})
			this.axios
				.get('http://novel.juhe.im/book-sources?view=summary&book=' + id)
				.then(r => {
					this.item = r.data[0]
				})
		},
		created() {

		}

	}
</script>

<style scoped lang="less">
	.nor {
		font-size: 12PX;
		color: #999;
	}
	
	.col {
		color: #B93321;
	}
	
	.BookInfo {
		/*.bookinfo_bar {
			text-align: center;
			font-size: 16PX;
			padding: 0.3rem 0;
			background-color: #b93321;
			color: #fff;
			.icon{
				top: 0.05rem;
			}
			.fr_icon{
				>.icon{
					margin: 0 0.15rem;
				}
			}
		}*/
		.info_title {
			margin-left: 0.5rem;
			.title_item {
				padding-bottom: 0.5rem;
				margin: 0.5rem 0 0;
				/*border-bottom: 1PX solid #ddd;*/
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
				}
			}
		}
		/*按钮*/
		.button {
			margin-bottom: 0.5rem;
			.btn {
				text-align: center;
				padding: 0.3rem 0.5rem;
				font-size: 16PX;
			}
			.add {
				color: #B93321;
				border: 1PX solid #B93321;
			}
			.start {
				color: #fff;
				background-color: #B93321;
			}
		}
		.lately {
			border-bottom: 1PX solid #ddd;
			text-align: center;
			border-top: 1PX solid #ddd;
			padding: 0.5rem 0;
			font-size: 16PX;
			color: #333;
			.lately_title {
				margin-bottom: 0.1rem;
				.nor;
			}
		}
		/*文案*/
		.longintro {
			padding-left: 0.5rem;
			padding-top: 0.5rem;
			font-size: 14px;
			color: #333;
			border-bottom: 1PX solid #ddd;
			.intro {
				line-height: 0.8rem;
				border-bottom: 1PX solid #ececec;
			}
			.chapter {
				padding: 0.5rem 0.3rem;
				.nor;
			}
		}
		.reviews {
			padding: 0.3rem 0 0 0.5rem;
			.rev_title {
				.fr {
					.nor;
					padding-right: 0.5rem;
				}
			}
			.rev_items {
				.rev_item {
					margin-top: 0.3rem;
					border-bottom: 1PX solid #ddd;
					.img {
						border-radius: 50%;
						overflow: hidden;
					}
					.content {
						div {
							margin: 0.1rem 0;
							color: #999;
							font-size: 12PX;
						}
						.item_name {
							color: #a58d5e;
							font-size: 12px;
						}
						.item_score {}
						.item_content {
							max-height: 0.8rem;
							overflow: hidden;
						}
						.item_title {
							font-weight: 700;
							color: #000;
						}
					}
				}
				.rev_item:nth-last-child(1) {
					/*background: red;*/
					border: none;
				}
			}
		}
	}
</style>