<template>
	<div class="My">
		<top-nav-bar :title="name"></top-nav-bar>

		<div class="my_content">
			<div class="my_btn">
				<van-button class="btn login" type="info" @click="Login">登录</van-button>
				<van-button class="btn register" type="danger" @click="Register">注册</van-button>
			</div>

			<div class="search" v-show="!isReg">
				<van-search v-model="keyword" show-action>
					<div slot="action" @click="onSearch">搜索</div>
				</van-search>
			</div>

			<div class="reg" v-show="isReg">
				<van-cell-group class="reg_bg">
					<div class="clearfix reg_bg">
						<div class="fl">性别</div>
						<van-radio-group class="fl" v-model="user.sex">
							<van-radio class="radio" name="male">男</van-radio>
							<van-radio class="radio" name="female">女</van-radio>
						</van-radio-group>
					</div>
					<van-field class="reg_bg" label="用户名" v-model="user.name" placeholder="请输入用户名" />
					<van-field class="reg_bg" label="手机号" required v-model="user.phone" placeholder="请输入用户名" />
					<van-field class="reg_bg" type="password" required v-model="user.pwd" right-icon="question-o" @click-right-icon="$toast('输入8-10的字母或者数字')" label="密码" placeholder="请输入密码" />
					<van-field class="reg_bg" type="password" required v-model="user.repwd" label="确认密码" placeholder="请输入密码" />
					<van-field class="reg_bg" center clearable required v-model="user.validcode" label="短信验证码" placeholder="请输入短信验证码">
						<van-button slot="button" size="small" type="primary" @click="sendValid" :disabled="isDisabled">发送验证码</van-button>
					</van-field>
				</van-cell-group>
				<van-button slot="button" size="large" type="info" @click="sucReg">确认注册</van-button>
			</div>

			<div class="reg" v-show="isLog">
				<van-cell-group class="reg_bg">
					<van-field class="reg_bg" label="手机号" required v-model="Loguser.phone" placeholder="请输入用户名" />
					<van-field class="reg_bg" type="password" required v-model="Loguser.pwd" right-icon="question-o" @click-right-icon="$toast('输入8-10的字母或者数字')" label="密码" placeholder="请输入密码" />
				</van-cell-group>
				<van-button slot="button" size="large" type="info" @click="sucLog">确认登录</van-button>
			</div>

		</div>

		<!--<div v-show="!isLogin" class="my_content">
			<div class="log_btn">
				<van-button class="btn" type="info">登录</van-button>
				<van-button class="btn" type="danger" @click="Register">注册</van-button>
			</div>

		</div>-->

	</div>
</template>

<script>
	
	import TopNavBar from '../components/TopNavBar'
	
	import { Button, Search } from 'vant';
	import { CellGroup, Field } from 'vant'
	import { RadioGroup, Radio } from 'vant';
	import { Dialog } from 'vant';
	import { Toast } from 'vant';
	
	import validDate from '../utils/validDate.js'
	import Time from '../utils/time.js'
	
	export default {
		name: 'Login',
		data() {
			return {
				name: '登录',
				keyword: '总裁',
				isReg: false,
				isDisabled: false,
				//注册
				user: {
					sex: 'male',
					name: null,
					phone: null,
					pwd: null,
					repwd: null,
					validcode: null
				},
				validCode: null,
				//所有用户的资料
				users: null,
				isLog: false,
				//登录
				Loguser: {
					phone: null,
					pwd: null
				}
			}
		},
		components: {
			[Button.name]: Button,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[RadioGroup.name]: RadioGroup,
			[Radio.name]: Radio,
			[Dialog.name]: Dialog,
			[Toast.name]: Toast,
			'top-nav-bar': TopNavBar,
			[Search.name]: Search

		},
		methods: {
			back() {
				this.$router.go(-1)
			},
			onHome() {
				this.$router.push({
					name: 'Competitive'
				})
			},
			onSearch() {

			},
			Register() {
				this.name = '注册'
				var reg = document.getElementsByClassName('my_btn')[0]
				reg.style.marginTop = '20%'
				this.isReg = true
				this.isLog = false
			},
			//登录界面
			Login() {
				this.name = '登录'
				
				if(this.isReg) {
					Dialog.confirm({
						message: '正在注册，是否离开'
					}).then(() => {
						this.isReg = false
						this.isLog = true
						var reg = document.getElementsByClassName('my_btn')[0]
						reg.style.marginTop = '50%'
					}).catch(() => {
						this.isLog = false
					});
				}else{
					this.isLog = true
				}
				
			},
			//注册成功
			sucReg() {
				if(!Object.is(this.user.validcode, this.validCode)) {
					Dialog.alert({
						message: '短信验证码输入不正确，请重新输入'
					}).then(() => {});
				} else if(!this.user.pwd) {
					Dialog.alert({
						message: '密码不能为空，请输入密码'
					}).then(() => {

					});
				} else if(!validDate.validPwd(this.user.pwd)) {
					Dialog.alert({
						message: '密码输入不正确，请重新输入'
					}).then(() => {
						this.user.pwd = ''
					});

				} else if(!Object.is(this.user.pwd, this.user.repwd)) {
					Dialog.alert({
						message: '两次密码输入不正确，请重新输入'
					}).then(() => {
						this.user.repwd = ''
					});
				} else {
					for(var i = 0; i < this.users.length; i++) {
						if(this.users[i].phone == this.userInfo.phone) {
							Dialog.alert({
								message: '该手机号已被注册'
							}).then(() => {

							});
							return;
						}

					}
					var time = new Date();
					var id = 'vue' + time.getTime();
					var registerTime = Time.format(time, 'yyyy-MM-dd hh:mm:ss');
					var user = {
						id,
						phone: this.user.phone,
						name: this.user.name,
						sex: this.user.sex,
						pwd: this.user.pwd,
						registerTime,
						books: null

					}
					this.users[this.user.phone] = user
					var usersData = JSON.stringify(this.users);

					Dialog.confirm({
						message: '确认注册，点击确定'
					}).then(() => {
						localStorage.setItem('usersInfo', usersData);
						this.name = '登录'
						var reg = document.getElementsByClassName('my_btn')[0]
						reg.style.marginTop = '50%'
						this.isReg = false
						this.isLog = true
//						console.log(this.users)
					}).catch(() => {
						this.isReg = true
					});

				}

			},
			//发送验证码
			sendValid() {
				if(!this.user.phone) {
					Dialog.alert({
						message: '手机号码不能为空，请输入手机号码'
					}).then(() => {

					});
				} else if(!validDate.validPhone(this.user.phone)) {
					Dialog.alert({
						message: '手机号码格式不正确'
					}).then(() => {

					});
				} else {
					this.isDisabled = true;

					//60秒后自动恢复
					var time = 30;
					var timer = setInterval(() => {

						if(time <= 0) {

							this.isDisabled = false;

							clearInterval(timer);
							time = null;

						}

					}, 1000)

					//获取时间戳
					var time = new Date().getTime().toString().substr(-3, 3);

					//获取随机数
					var random = Math.random().toString().substr(-3, 3);
					this.validCode = time.concat(random);
					console.log(this.validCode)
				}
			},
			//登录成功
			sucLog(){
//				console.log(this.users[this.Loguser.phone])
				if(!this.users[this.Loguser.phone]){
					Dialog.alert({
						message: '手机号码没有注册'
					}).then(() => {
						this.Loguser.phone = ''
					});
				}else if(!Object.is(this.Loguser.pwd,this.users[this.Loguser.phone].pwd)){
					Dialog.alert({
						message: '密码不正确，请重新输入'
					}).then(() => {
						this.Loguser.pwd = ''
					});
				}else{
					Toast.success('登录成功');
					sessionStorage.setItem('loginUser',JSON.stringify(this.Loguser.phone))
					this.$router.push({name:'Mini'})
				}
			}

		},
		mounted() {
			var time = new Date().getTime().toString().substr(-3, 3)
			var ss = parseInt(Math.random() * (0x9fa5 - 0x4e00 + 1) + 0x4e00)
			this.user.name = String.fromCharCode(ss) + time
			
			
		},
		created() {
			var usersData = localStorage.getItem('usersInfo')
			this.users = usersData == undefined ? {} : JSON.parse(usersData)
			
			var login = JSON.parse(sessionStorage.getItem('loginUser'))
			if (login) {
				this.$router.push({name:'Mini'})
			}
			
			
		}
	}
</script>

<style scoped lang="less">
	.My {
		/*position: relative;*/
		height: 100vh;
		background: #f4f4f4;
		.my_bar {
			text-align: center;
			font-size: 16PX;
			padding: 0.3rem 0;
			background-color: #b93321;
			color: #fff;
			.icon {
				vertical-align: middle;
			}
		}
		.my_content {
			position: absolute;
			/*background: red;*/
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			padding-top: 1.2rem;
			.my_btn {
				/*vertical-align: middle;*/
				margin-top: 50%;
				transition: all 0.3s;
				text-align: center;
				.btn {
					padding: 0rem 0.8rem;
					margin: 0 1rem;
				}
			}
			.search {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
			}
			.log_btn {
				text-align: center;
				margin-top: 30%;
				.btn {
					padding: 0rem 0.8rem;
					margin: 0 1rem;
				}
			}
			.reg {
				margin-top: 1rem;
				.clearfix {
					font-size: 14PX;
					color: #323232;
					margin-left: 0.3rem;
					padding: 0.2rem 0;
					border-bottom: 1px solid #ebedf0;
					.fl:nth-of-type(1) {
						margin-right: 1rem;
					}
					.fl:nth-of-type(2) {
						margin-left: 0.3rem;
						.radio {
							display: inline-block;
							margin: 0 0.3rem;
						}
					}
				}
				.reg_bg {
					background-color: transparent;
				}
			}
		}
	}
</style>