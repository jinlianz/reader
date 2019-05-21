<template>
	<div class="NavBar">
		<van-row class="NavBar_bar" type="flex" justify="space-between">
			<van-col :span="4">
				<div @click="back" v-if="isHasBack">
					<van-icon class="icon" name="arrow-left" size="18px"></van-icon>
					<span>返回</span>
				</div>
			</van-col>
			<van-col :span="16">{{title}}</van-col>
			<van-col :span="4" class="fr_icon">
				<van-icon class="icon iconfont iconshujia" size="17px" @click="onShelf"></van-icon>
				<van-icon class="icon iconfont iconzhuye" size="17px" @click="onHome"></van-icon>

			</van-col>
		</van-row>
	</div>
</template>

<script>
	export default {
		name: 'TopNavBar',
		props: {
			title: {
				type: String
			},
			isHasBack: {
				type: Boolean,
				default: true
			}

		},
		methods: {
			onHome() {
				this.$router.push({
					name: 'Competitive'
				})
			},
			back() {
				this.$router.go(-1);
			},
			onShelf() {
				this.$router.push({
					name: 'BookShelf'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.NavBar_bar {
		text-align: center;
		font-size: 16PX;
		padding: 0.3rem 0;
		background-color: #b93321;
		color: #fff;
		.icon {
			/*margin-top: 0.1rem;*/
			top: 0.05rem;
		}
		.fr_icon {
			>.icon {
				margin: 0 0.15rem;
			}
		}
	}
</style>