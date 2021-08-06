import Vue from "vue"
import Vuex from "vuex"
import http from 'util/http.js'
Vue.use(Vuex)
export default new Vuex.Store({
	// 全局属性变量
	state: { // state的作用是定义属性变量。定义一个参数
		// 商品列表
		goodsList: [],
		// 轮播
		swiperList1: [],
		swiperList2: [],
		// 购物车列表
		cartList: [],
		// 购物车状态
		activeState: false

	},
	mutations: {
		// 改变购物车选中状态
		changState(state, params) {
			state.cartList[params[0]].selected = params[1];
		},
		// 删除购物车
		removeCart(state) {
			state.cartList = state.cartList.filter(item => {
				return item.selected === false
			});
			// 更新缓存数据
			uni.setStorage({
				key: 'cartList',
				data: JSON.stringify(state.cartList),
				success: function() {
					console.log('更新缓存');
				}
			});
			state.activeState = (state.cartList.lenght > 0) ? true : false
			console.log(state.activeState);
		},
		// 添加购物车
		addCartList(state, shop) {
			uni.setStorage({
				key: 'cartList',
				data: JSON.stringify(state.cartList),
				success: function() {
					state.cartList.push(shop);
				}
			});
		},
		// 获取购物车内容
		getCartList(state) {
			uni.getStorage({
				key: 'cartList',
				success: function(res) {
					// console.log(res);
					state.cartList = JSON.parse(res.data)
				}
			});
		},
		// 清空商品列表
		clearGoodsList(state) {
			state.goodsList = []
		},
		// 更新商品列表
		updateGoodList(state, item) {
			state.goodsList.push(item)
		},
		// 轮播图
		upateSwiperList(state, item) {
			if (state.swiperList1.length < 5) {
				state.swiperList1.push(item)
			} else if (state.swiperList2.length < 5) {
				state.swiperList2.push(item)
			}
		}
	},
	actions: {
		// 获取商品列表假的接口
		async getFakeData(context) {
			// 获取随机数
			let rd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
			let id = rd(100, 8888)
			let res = await http({
				url: `/api/public/v1/goods/detail?goods_id=${id}`
			});
			return res;
		},
		// 处理商品接口
		async getGoodsList(context) {
			let rd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
			let determineId = (newId, list) => {
				let flag = false
				list.forEach(item => {
					flag = item.id === newId ? true : false
				})
				return flag
			}
			for (let i = 0; i < 20; i++) {
				let temp = {};
				let res = await context.dispatch('getFakeData');
				while (res.data.message.pics.length < 1 || determineId(res.data.message.goods_id, this.state
						.goodsList)) {
					res = await context.dispatch('getFakeData');
				}

				// 伪装数据
				temp.id = res.data.message.goods_id || rd(100, 8888);
				temp.title = res.data.message.goods_name || '';
				temp.add_time = res.data.message.add_time || new Date;
				temp.zhaiyao = res.data.message.goods_introduce || '';
				temp.click = res.data.message.hot_mumber || rd(100, 8888);
				temp.img_url = res.data.message.pics[0].pics_mid || '';
				temp.pics_big = res.data.message.pics[0].pics_big || '';
				temp.sell_price = res.data.message.goods_price || rd(100, 2000);
				temp.market_price = temp.sell_price + rd(100, 200);
				temp.stock_quantity = rd(100, 8888);
				this.commit('updateGoodList', temp)
				this.commit('upateSwiperList', temp)
			}
		}
	}
})
