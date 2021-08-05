import Vue from 'vue'
import App from './App'
// 导入我们封装的 request
import http from 'util/http.js'
import store from "./store/index.js"
// 导入公共样式
// import './static/font/iconfont.css'

// 注册到 Vue 上
Vue.prototype.$store = store;
Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
