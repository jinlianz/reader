<template>
	<div class="Competitive">
		
		<div class="competi_banan">		
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item v-for="(item,index) in bannarImg" :key="index">
			  	<img :src="item"/>
			  </van-swipe-item>
			</van-swipe>
		</div>
		<van-row class="competi_nav" type="flex" justify="space-around">
			<van-col :span="4" v-for="(item,index) in navImg" :key="index">
				<div @click="Click(item)">
					<img :src="item.Url"/>
					<span>{{item.title}}</span>
				</div>
			</van-col>
		</van-row>
		
		<div class="compe_recom">
			<div class="compe_title">潜力佳作</div>
			<van-row class="compe_content">
				<van-col class="compe_item" :span="24" v-for="(item,index) in books" :key="index">
					<van-col :span="4">
						<img :src="Cover(index)" />
					</van-col>
					<van-col :span="19" :offset="1">
						<div class="content_name">{{item.title}}</div>
						<div class="content_desc">{{item.shortIntro}}
						</div>
						<div class="content_cate clearfix">
							<van-col :span="6">{{item.majorCate}}</van-col>
							<van-col :span="6">{{item.latvanyFollower}}人气</van-col>
							<van-col :span="6" :offset="6"><van-tag size="mini" plain color="#ff8400" >{{item.minorCate}}</van-tag></van-col>
						</div>
					</van-col>
				</van-col>
				<van-col class="compe_more" :span="24">查看更多</van-col>
				
				
			</van-row>
			
			

		</div>
		
		
	</div>
</template>

<script>

	import Vue from 'vue'
	import { Swipe, SwipeItem,Tag } from 'vant';
	Vue.use(Swipe).use(SwipeItem);
	Vue.use(Tag);

	export default {
		name: 'Competitive',
		data(){
			return{
				bannarImg:[
					'http://statics.zhuishushenqi.com/recommendPage/155660588781147',
					'http://statics.zhuishushenqi.com/recommendPage/155660592562552',
					'http://statics.zhuishushenqi.com/recommendPage/155660596069151',
					'http://statics.zhuishushenqi.com/recommendPage/155660599369520'
				],
				navImg:[
					{Url:require('../../public/com_bookshelf.png'),title:'书架',path:{name:'BookShelf'}},
					{Url:require('../../public/com_bookslist.png'),title:'书单',path:{name:'Login'}},
					{Url:require('../../public/com_cari.png'),title:'漫画',path:{name:'Login'}},
					{Url:require('../../public/com_my.png'),title:'我的',path:{name:'Login'}}
				],
				books:[],
				img:null
				
			}
		},
		methods:{
			
			Cover(index){
				return this.img = decodeURIComponent(this.books[index].cover).replace(/\/agent\//,"")
			},
			Click(item){
				this.$router.push(item.path)
			}
			
			
		},
		mounted(){
			this.axios
				.get('http://novel.juhe.im/rank/5a684551fc84c2b8efaab179')
				.then(r => {
					var book = r.data.ranking.books
					book.length = 6
					this.books = book
//					console.log(this.books)
				})
		},
		created(){
			
			
			
		}
	}
</script>

<style scoped lang="less">
img{
	width: 100%;
}
	.Competitive {
		.competi_banan {

		}
		.competi_nav{
			padding: 0.5rem 0.8rem;
			text-align: center;
			border-bottom: 10PX solid #ddd;
			img{
				margin-bottom: 0.1rem;
			}
			
		}
		.compe_recom {
			margin-top: 0.5rem;
			.compe_title {
				margin: 0.3rem 0;
				padding-left:0.3rem ;
				border-left: 2PX solid #b93321;
				font-size: 14PX;
				font-weight: 700;
			}
			.compe_content {
				margin: 0 0.4rem;
				
				.compe_item {
					padding-bottom:0.3rem ;
					margin:0.1rem 0;
					.content_name {
						color: #333;
						font-size: 14PX;
					}
					.content_desc {
						height: 0.8rem;
						overflow: hidden;
						color: #999;
						font-size: 12PX;
						margin: 0.1rem 0 0 0.3rem;
					}
					.content_cate{
						/*margin: 0.3rem 0;*/
						padding:0.1rem 0;
						color: #666;
						border-bottom:1PX solid #ccc;
					}
					
				}
				.compe_item:nth-last-child(2) .content_cate{
						border-bottom:none;
						/*background: red;*/
					}
				
				.compe_more{
					text-align: center;
					border-top: 1PX solid #ccc;
					font-size: 14PX;
					color: #b93321;
					padding: 0.5rem;
				}


			}
			
			
		}
	}
</style>