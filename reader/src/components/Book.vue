<template>
	<div class="Book" @click="popper">
		<div v-show="show" class="book_bar">
			<van-row class="nav" type="flex" justify="space-between">
				<van-col :span="4">
					<div @click="back">
						<van-icon class="icon" name="arrow-left" size="17px"></van-icon>返回</div>
				</van-col>
				<van-col :span="17">{{name}}</van-col>
				<van-col :span="3">
					<van-icon class="icon" name="wap-nav" size="17px"></van-icon>
				</van-col>
			</van-row>
			<van-row>
				<van-col class="nav ico" :span="6" offset="18">
					<div class="listico" @click="onHome"><i class="iconfont iconshouye"></i>首页</div>
					<div class="listico" @click="onShelf"><i class="iconfont iconshu"></i>书架</div>
					<div class="listico" @click="onInfo"><i class="iconfont iconxiangqing"></i>详情</div>
				</van-col>
			</van-row>
		</div>

		<div id="txt" class="book_content">
			<div class="content_title">{{book.title}}</div>
			<div class="txt">{{book.cpContent}}</div>

		</div>

		<div class="book_bottom" v-show="show">
			<van-row>
				<van-col :span="4">
					<div id="sub" @click="subFont">Aa-</div>
				</van-col>
				<van-col id="add" :span="16">
					<div>
						<van-slider class="progress" v-model="value" active-color="#f44">
							<div slot="button"></div>
						</van-slider>
					</div>
				</van-col>
				<van-col :span="4">
					<div @click="addFont">Aa+</div>
				</van-col>
			</van-row>

			<van-row class="btn" type="flex" justify="space-around">
				<van-col :span="6" v-for="(item,index) in modes" :key="index">
					<van-button class="bg_mol" size="small" :class="{'active' : item.isActive}" @click="mode(item)">{{item.title}}</van-button>
				</van-col>
			</van-row>

			<van-row type="flex" justify="space-around">
				<van-col :span="6">
					<div id="pre" @click="preChap">上一章</div>
				</van-col>
				<van-col :span="6">
					<div @click="showOpper">目录</div>
				</van-col>
				<van-col :span="6">
					<div @click="nextChap">下一章</div>
				</van-col>
			</van-row>

		</div>
		<div class="popper" v-show="showop">
			<van-row class="title">
				<van-col class="name" :span="24">{{name}}</van-col>
				<van-col :span="24">目录</van-col>
			</van-row>
			<div class="lists">
				<van-row class="list" v-for="(item,index) in chap" :key="index">
					<div @click="optChap(index)">
						<van-col :span="22">
							{{index+1}}-{{item.title}}
						</van-col>
						<van-col :span="2"></van-col>
					</div>
				</van-row>
			</div>

		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { Button, Progress } from 'vant';
	Vue.use(Button);
	Vue.use(Progress);
	import { Slider } from 'vant';
	Vue.use(Slider);
	
	
	export default {
		name: 'Book',
		data() {
			return {
				name: null,
				book: {},
				linkbook: {},
				chap: null,
				show: false,
				showop: false,
				classList: null,
				modes: [{
						title: '默认',
						isActive: true,
						bgcolor: '#eee6dd',
						fcolor: '#666'
					},
					{
						title: '夜间',
						isActive: false,
						bgcolor: '#0c0c0c',
						fcolor: '#999'
					},
					{
						title: '护眼',
						isActive: false,
						bgcolor: '#b8cd8c',
						fcolor: 'rgba(12,46,16,0.8)'
					}
				],
				value: 0
			}
		},
		methods: {
			back() {
				this.$router.push({
					name: 'Chapter'
				})
			},
			onHome(){
				this.$router.push({name:'Competitive'})
				event.stopPropagation()
			},
			onShelf() {
				this.$router.push({
					name: 'BookShelf'
				})
				event.stopPropagation()
			},
			onInfo(){
				this.$router.push({name:'BookInfo'})
				event.stopPropagation()
			},
			popper() {
				this.show = !this.show
				this.showop = false

			},
			showOpper() {
				this.showop = true

				var linkbook = JSON.parse(localStorage.getItem('link'))
				//				console.log(linkbook)
				this.chap.forEach((v, i) => {
					if(v.link == linkbook.link) {
						this.classList[i].style.color = '#B93321'
					}
					//				console.log("09")
				})

				event.stopPropagation()
			},
			optChap(i) {
				for(let i = 0; i < this.classList.length; i++) {
					this.classList[i].style.color = '#999'
				}
				this.classList[i].style.color = '#B93321'
				this.getInfo(this.chap[i])
				event.stopPropagation()
			},
			getInfo(item) {
				localStorage.setItem('link', JSON.stringify(item))
				var linkbook = JSON.parse(localStorage.getItem('link'))
				var str = linkbook.link.replace(/:\/\//g, '%3A%2F%2F').replace(/\//g, '%2F').replace(/\?/, '%3F').replace(/\=/, '%3D')
				this.axios
					.get('http://novel.juhe.im/chapters/' + str)
					.then(r => {
						
						this.book = r.data.chapter
					})

				var pre = document.getElementById('pre')
				if(this.i == 0) {
					pre.style.color = '#999'
				} else {
					pre.style.color = '#fff'
				}
			},
			//上一掌
			preChap() {
				var i = this.i

				i = i == 0 ? 0 : --i
				this.i = i
				this.optChap(this.i)
				this.getInfo(this.chap[this.i])
				event.stopPropagation()
			},
			nextChap() {
				var i = this.i
					//				this.i = i
					++i
				this.i = i
				this.optChap(this.i)
				this.getInfo(this.chap[this.i])
				event.stopPropagation()
			},
			//背景模式
			mode(item) {
				var txt = document.getElementById('txt')
				for(var i = 0; i < this.modes.length; i++) {
					this.modes[i].isActive = false
				}
				item.isActive = true
				txt.style.color = item.fcolor
				txt.style.backgroundColor = item.bgcolor
			},
			//减小字体
			subFont() {
				var sub = document.getElementById('sub')
				var min = 16
				var txt = document.getElementById('txt')
				var demo = window.getComputedStyle(txt, null)
				var fontsize = parseInt(demo.fontSize)

				this.FontVal(sub, fontsize, min, fontsize - 2)
				event.stopPropagation()
			},
			addFont() {
				var add = document.getElementById('add')
				var max = 24
				var txt = document.getElementById('txt')
				var demo = window.getComputedStyle(txt, null)
				var fontsize = parseInt(demo.fontSize)

				this.FontVal(add, fontsize, max, fontsize + 2)
				event.stopPropagation()

			},
			FontVal(id, fontsize, min, font) {
				fontsize = fontsize == min ? min : font
				txt.style.fontSize = fontsize + 'PX'
				this.value = (fontsize - 16) * (100 / (24 - 16))

			}

		},
		mounted() {

			this.name = JSON.parse(localStorage.getItem('bookname'))
			
			var linkbook = this.$route.params.Link
			if (linkbook != undefined) {
				localStorage.setItem('link',JSON.stringify(linkbook))
			} else{
				linkbook = JSON.parse(localStorage.getItem('link'))
			}
//			var linkbook = JSON.parse(localStorage.getItem('link'))
			this.getInfo(linkbook)
			this.chap = this.$route.params.chap
			if(this.chap != undefined) {
				localStorage.setItem('chap', JSON.stringify(this.chap))
			} else {
				this.chap = JSON.parse(localStorage.getItem('chap'))
			}
			this.classList = document.getElementsByClassName('list')

			//获取当前的index下标
			this.chap.forEach((v, i) => {
				if(v.link == linkbook.link) {
					this.i = i
				}
			})
			//当阅读到第一章上一章按钮变灰
			var pre = document.getElementById('pre')
			if(this.i == 0) {
				pre.style.color = '#999'
			} else {
				pre.style.color = '#fff'
			}

			//初始化value的值
			var max = 24,
				min = 16
			var txt = document.getElementById('txt')
			var demo = window.getComputedStyle(txt, null)
			var fontsize = parseInt(demo.fontSize)
			var sca = 100 / (max - min)
			this.value = (fontsize - min) * sca

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
	
	.Book {
		/*margin: 0 auto;
		max-width: 640PX;*/
		.book_bar,
		.book_bottom {
			text-align: center;
			font-size: 16PX;
			position: fixed;
			margin: 0 auto;
			max-width: 640PX;
			color: #fff;
			left: 0;
			right: 0;
			/*margin: 0 auto;
		max-width: 640PX;*/
		}
		.book_content {
			font-size: 18PX;
			line-height: 30PX;
			padding: 0.5rem;
			background-color: #eee6dd;
			/*background: red;*/
			.txt {
				text-indent: 36PX;
			}
		}
		.book_bar {
			top: 0;
			.nav{
				background: rgba(0, 0, 0, 0.9);
				padding: 0.3rem 0;
				.icon{
					vertical-align:middle;
				}
			}
			.ico{
				font-size: 12PX;
				background: rgba(0, 0, 0, 0.8);
				/*margin-top:0.1rem ;*/
				.listico{
					margin:0.2rem 0;
					.iconfont{
						margin: 0 0.3rem 0 0;
						color: #999;
					}
				}
				
			}
		}
		.book_bottom {
			padding: 0.5rem 0;
			
			padding: 0.3rem 0;
			left: 0;
			right: 0;
			bottom: 0;
			
			background: rgba(0, 0, 0, 0.9);
			.progress {
				/*height: 3PX;*/
				margin-top: 0.25rem;
				background: #b2b2b2;
			}
			.btn {
				margin: 0.5rem 0;
				.bg_mol {
					background: none;
					color: #fff;
					/*margin: 0.2rem 0;*/
					padding: 0rem 0.8rem;
				}
				.active {
					color: #B93321;
					border-color: #B93321;
				}
			}
		}
		.popper {
			position: fixed;
			overflow-y: auto;
			top: 0;
			left: 0;
			right: 30%;
			bottom: 0;
			background: #fff;
			.title {
				color: #999999;
				font-size: 16PX;
				padding: 0.3rem 0.5rem;
				border-bottom: 1PX solid #f2f2f2;
				.name {
					color: #333;
					padding-bottom: 0.3rem;
					font-size: 18PX;
				}
			}
			.lists {
				margin-left: 0.5rem;
				.nor;
				.list {
					padding: 0.5rem 0;
					border-bottom: 1PX solid #f8f8f8;
				}
			}
		}
	}
</style>