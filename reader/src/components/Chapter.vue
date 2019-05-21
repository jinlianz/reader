<template>
	<div class="Chapter">

		<top-nav-bar title="目录"></top-nav-bar>
		<div class="chap_list">
			<div class="list_title clearfix">
				<span>目录</span>
				<span>共{{item.chaptersCount}}章</span>
				<span class="fr">倒序</span>
			</div>
			<div class="lists">
				<van-row class="list" v-for="(item,index) in list" :key="index" >
					<div @click="Link(item)">
						<van-col :span="22">
						{{index+1}} {{item.title}}
						</van-col>
						<van-col :span="2"></van-col>
					</div>
					
				</van-row>
			</div>
		</div>
		
	</div>
</template>

<script>
	import TopNavBar from '../components/TopNavBar'
	export default {
		name: 'Chapter',
		data() {
			return {
				item:{},
				list:null
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
					name: 'BookInfo'
				})
			},
			onShelf(){
				this.$router.push({
					name: 'BookShelf'
				})
			},
			Link(item){
//				localStorage.setItem('link',JSON.stringify(item))
//				var book = this.list
				this.$router.push({name:'Book',params:{chap:this.list,Link:item}})
			}
		},
		mounted(){
			this.item = this.$route.params.item
//			console.log('this.item',this.item)
			if (this.item !=undefined) {
				localStorage.setItem('item',JSON.stringify(this.item))
			}else{
				this.item = JSON.parse(localStorage.getItem('item'))

			}
			this.axios
				.get('http://novel.juhe.im/book-chapters/' + this.item._id)
				.then(r => {
					r.data.chapters.leng = 50
					this.list = r.data.chapters
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
	.chapter_bar {
		text-align: center;
		font-size: 16PX;
		padding: 0.3rem 0;
		background-color: #b93321;
		color: #fff;
		.icon{
				vertical-align:middle;
			}
	}
	.chap_list{
		.list_title{
			padding: 0.3rem 0.5rem;
			border-bottom: 1PX solid #f8f8f8;
			font-size: 14PX;
			
			span:nth-of-type(1){
				font-weight: 700;
				/*color: red;*/
			}
			span:nth-of-type(2){
				.nor;
				margin-left: 0.1rem;
			}
			
		}
		.lists{
			margin-left:0.5rem ;
			.nor;
			.list{
				padding: 0.5rem 0;
				border-bottom: 1PX solid #f8f8f8;
			}
		}
	}
	
</style>