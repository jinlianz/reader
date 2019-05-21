import 'lib-flexible/flexible.js'
//import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


import {Row,Col,Icon} from 'vant'
import './iconfont/iconfont.css'

//import { Row, Col,Icon } from 'element-ui';
Vue.use(Row).use(Col).use(Icon)




import router from './router/index.js'

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
