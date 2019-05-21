<template>
	<div class="Vip">
		<!--<template>-->

		<div class="vip-bannar">	
			<van-swipe :autoplay="3000" indicator-color="white">
			  <van-swipe-item >
			  	<img src="http://statics.zhuishushenqi.com/recommendPage/155565262632677" />
			  </van-swipe-item>
			  <van-swipe-item >
			  	<img src="http://statics.zhuishushenqi.com/recommendPage/155565265597622" />
			  </van-swipe-item>
			</van-swipe>
		</div>
		<div class="vip_login">
			<div class="login clearfix">
				<div class="img fl"></div>
				<div class="txt fl">大侠先登录一个呗</div>
				<div class="tbn fr">
					<van-button type="danger">立即登录</van-button>
				</div>
			</div>
			<div class="login clearfix">
				<div class="txt_fl fl">
					<img class="fl" src="../../public/icon-vip-01.png" />
					<span class="text fr">VIP书库</span>
				</div>
				<div class="txt_fr fr">
					<img class="fl" src="../../public/icon-vip-02.png" />
					<span class="text fr">VIP特权</span>
				</div>
			</div>
		</div>

		<div class="vip_recom">
			<div class="recom_title">潜力佳作</div>
			<van-row class="recom_content">
				<van-col class="recom_item" :span="24">
					<van-col :span="4">
						<img src="http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F2679049%2F2679049_d617690635784db3a725aa9417e3ae91.jpg%2F?imageMogr2/thumbnail/125x160" />
					</van-col>
					<van-col :span="19" :offset="1">
						<div class="content_name">肥婆种田：山里相公太腹黑</div>
						<div class="content_desc">一朝穿越到古代，涂新月发现自己成了死肥婆。 不仅又胖又傻，还被表妹和未婚夫联手设计，嫁给了村里最穷的书生！ 没事，她可是21世纪的特种兵军医！还有灵泉在手！渣男背叛？一巴掌啪啪啪打脸！极品亲戚？一脚送她们上一天！说她丑的？她摇身一变美瞎对方的眼！ 只是，她本想安静的种种田，发家致富。那俊俏的小相公为何像打了鸡血，不仅夜里猛如狼，还一不小心权倾了朝野……
						</div>
						<div class="content_cate">
							<van-col :span="6">豪门总裁</van-col>
							<van-col :span="6">886人气</van-col>
							<van-col :span="6" :offset="6"><van-tag plain color="#ff8400" type="warning" size="mini" >现代言情</van-tag></van-col>
						</div>
					</van-col>
				</van-col>
				<van-col class="item" :span="24">
					<div>
						<van-tag plain color="#ff8400" type="warning" size="small" >古代言情</van-tag>
						<span class="item_name">冲喜娘子，相公有礼了</span>
						<span class="item_desc">夏千沐</span>
					</div>
					<van-col :span="24" class="item_desc">为了二叔的科举大业，谢元嫁入了郁家，成为了郁家的冲喜娘子。</van-col>
				</van-col>
				
				<van-col class="item" :span="24">
					<div>
						<van-tag plain color="#ff8400" type="warning" size="small">现代言情</van-tag>
						<span class="item_name">总裁撩妻：宝贝娶一送一</span>
						<span class="item_desc">华不羡</span>
					</div>
					<van-col :span="24" class="item_desc">“叔叔，我把我妈咪卖给你好不好？跳楼大甩卖，只要一百亿！买一送一，还附赠一</van-col>
				</van-col>
				
				<van-col class="item" :span="24">
					<div>
						<van-tag plain color="#ff8400" type="warning" size="small">现代言情</van-tag>
						<span class="item_name">重生七零：宠妻养成记</span>
						<span class="item_desc">奕风</span>
					</div>
					<van-col :span="24" class="item_desc">上辈子何诗言为渣男抛父母，弃真爱，结果被渣男害得惨死。重活一次</van-col>
				</van-col>
				
				<van-col class="recom_more" :span="24">查看更多</van-col>

			</van-row>
			
			

		</div>

	</div>
</template>

<script>
	import Vue from 'vue'
	import { Swipe, SwipeItem,Button,Tag} from 'vant';
	Vue.use(Swipe).use(SwipeItem);
	Vue.use(Tag);
	Vue.use(Button);
	export default {
		name: 'Vip'
	}
</script>

<style scoped lang="less">
	.Vip {
		.vip-bannar {
			/*background: lightblue;*/
			/*height: 120px;*/
		}
		.vip_login {
			.login {
				padding: 0.2rem 0.5rem;
				border-bottom: 1PX solid #ddd;
				div {}
				.txt {
					margin-top: 0.5rem;
					margin-left: 0.5rem;
				}
				.img {
					width: 1.333rem;
					height: 1.333rem;
					background: url(../../public/data_image_png.png)no-repeat;
					background-size: cover;
				}
				.txt_fl {
					margin-left: 1.7rem;
					display: inline-block;
					margin-right: 0.2rem;
					img {
						width: 1rem;
						height: 1rem;
						/*display: inline-block;*/
					}
					span {
						margin-top: 0.3rem;
						margin-left: 0.3rem;
					}
				}
				.txt_fr {
					margin-right: 1.7rem;
					margin-left: 0.2rem;
					img {
						width: 1rem;
						height: 1rem;
						/*display: inline-block;*/
					}
					span {
						margin-top: 0.3rem;
						margin-left: 0.3rem;
					}
				}
			}
		}
		.vip_recom {
			margin-top: 0.5rem;
			.recom_title {
				margin: 0.3rem 0;
				padding-left:0.3rem ;
				border-left: 2PX solid #b93321;
				font-size: 14PX;
				font-weight: 700;
			}
			.recom_content {
				margin: 0 0.5rem;
				
				.recom_item {
					padding-bottom:0.3rem ;
					border-bottom:1PX solid #ccc;
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
						margin: 0.2rem 0;
						color: #666;
					}
					
				}
				.item {
					padding:0.3rem 0;
					.item_name {
						color: #333;
						font-size: 14PX;
						margin-left: 0.2rem;
					}
					.item_desc {
						/*height: 0.8rem;*/
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #999;
						font-size: 12PX;
						margin: 0.1rem 0 0 0.3rem;
					}
					
				}
				.recom_more{
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