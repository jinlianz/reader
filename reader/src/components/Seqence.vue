<template>
	<div class="Seqence">
		<div class="sepen_cart" v-for="(item,index) in cart" :key="index">
			<div class="cart_title">{{item.title}}</div>
			<van-row class="cart_items">
				<van-col class="item" :span="24" v-for="(list,i) in item.list" :key="i">
					<div>
						<van-col :span="2">
							<img :src="list.bg"/>
						</van-col>
						<van-col class="item_title" :span="21" :offset="1">
							<div>{{list.txt}}</div>
						</van-col>
					</div>
				</van-col>
			</van-row>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'Seqence',
		data() {
			return {
				cart: [{
						title: '男生',
						list: [{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '追书最热榜 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '好评榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '热搜榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319166399949',
								txt: '本周潜力榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/144738093413066',
								txt: '读者留存率 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/144799960841612',
								txt: '追书完结榜 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/14750532964058',
								txt: 'VIP排行榜'
							},
							{
								bg: require('../../public/sepan_icon_01.png'),
								txt: '别人家的排行榜'
							}
						]
					},
					{
						title: '女生',
						list: [{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '追书最热榜 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '好评榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319144267827',
								txt: '热搜榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/142319166399949',
								txt: '本周潜力榜'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/144738093413066',
								txt: '读者留存率 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/144799960841612',
								txt: '追书完结榜 Top100'
							},
							{
								bg: 'http://statics.zhuishushenqi.com/ranking-cover/14750532964058',
								txt: 'VIP排行榜'
							},
							{
								bg: require('../../public/sepan_icon_01.png'),
								txt: '别人家的排行榜'
							}
						]
					}
				]
			}

		},
		mounted() {
/*			var dd = this.$refs.bg
			var n = 0
			for(var i = 0; i < this.cart.length; i++) {
				for(var j = 0; j < this.cart[i].list.length; j++) {
					//						v.style.background =this.cart[i].list[j].bg
					n++
					var item = dd[n]
					item.style.background =this.cart[i].list[j].bg

				}
			}*/
		}
		

	}
</script>

<style scoped lang="less">
	.Seqence {
		.sepen_cart {
			.cart_title {
				background-color: #CCCCCC;
				padding: 0.5rem;
				color: #666;
			}
			.cart_items {
				margin-left: 0.5rem;
				.item {
					padding: 0.5rem 0;
					.item_bg {
						width: 0.8rem;
						height: 0.8rem;
						/*background: url(http://statics.zhuishushenqi.com/ranking-cover/144738093413066) no-repeat;*/
						background-repeat: no-repeat;
						background-size: cover;
					}
					.item_title {
						font-size: 14PX;
						color: #333;
						border-bottom: 1PX solid #ccc;
						div {
							padding-bottom: 0.3rem;
						}
					}
				}
			}
		}
	}
</style>