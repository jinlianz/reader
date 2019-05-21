<template>
	<div class="Classify">
		<div class="items" v-for="(item,index) in booksArr" :key="index">
			<div class="title">{{title[index]}}</div>
			<van-row>
				<van-col class="items" :span="8" v-for="(item,i) in books[booksArr[index]]" :key="i">
					<div class="items_cart">
						<div class="cart_name">{{item.name}}</div>
						<div class="cart_num">{{item.bookCount}}</div>
					</div>
				</van-col>
			</van-row>

		</div>

	</div>
</template>

<script>
	export default {
		name: 'Classify',
		data() {
			return {
				books: null,
				booksArr: [],
				title: []
			}
		},
		methods: {
			getBooksArr() {

			}

		},
		created() {

		},
		mounted() {
			var data = localStorage.getItem('books')
			this.books = JSON.parse(data)
			//获取this.books所有的键
			this.booksArr = Object.keys(this.books)

			for(var i = 0; i < this.booksArr.length; i++) {
				switch(this.booksArr[i]) {
					case 'female':
						this.title.push('女生')
						break;
					case 'male':
						this.title.push('男生')
						break;
					case 'picture':
						this.title.push('漫画')
						break;
					case 'press':
						this.title.push('出版')
						break;
				}
			}
			
			console.log(this.books)

		}
	}
</script>

<style scoped lang="less">
	@itemborder: 1PX solid #ececec;
	.Classify {
		.items {
			color: #999;
			.title {
				padding: 0.5rem 0.3rem;
				border-bottom: 1PX solid #ececec;
			}
			.items:nth-child(3n),
			.items:nth-child(3n+1) {
				border-right: none;
				border-left: none;
				border-bottom: @itemborder;
			}
			.items:nth-child(3n+2) {
				border-right: @itemborder;
				border-left: @itemborder;
				border-bottom: @itemborder;
			}
			.items_cart {
				padding: 0.3rem;
				text-align: center;
				.cart_name {
					font-size: 15PX;
					font-weight: 700;
					color: #333;
					/*border-right:1PX solid #ececec ;*/
				}
			}
		}
	}
</style>