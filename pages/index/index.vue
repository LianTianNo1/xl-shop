<template>
	<view class="home">

		<!-- <view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItem(item.path)">
				<view hover-class="nav_hover" :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view> -->
		<good-banner></good-banner>
		<view class="hot_goods">
			<view class="head_title iconfont">&#xe65b;热门商品</view>
			<good-list @clickGoodsItem="navItem($event)"></good-list>

		</view>
	</view>
</template>

<script>
	// 导入 mapXXX 
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	// 导入商品列表组件
	import good_list from '../../components/good_list.vue'
	import banner from '../../components/banner.vue'
	export default {
		data() {
			return {
				// 导航
			}
		},
		onLoad() {
			// 获取商品列表
			this.getGoodsList()
			// 获取购物车内容
			if(this.cartList.length === 0){
				this.getCartList();
			}
			
		},
		computed: {
			...mapState(['goodsList','cartList'])
		},
		onReachBottom() {
			// 到底了继续获取商品列表
			this.getGoodsList()
		},
		// 上拉刷新
		onPullDownRefresh() {
			// 清空商品列表
			this.clearGoodsList()
			// 获取商品列表
			this.getGoodsList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		components: {
			'good-list': good_list,
			'good-banner': banner
		},
		methods: {
			...mapMutations(['updateGoodList','getCartList', 'clearGoodsList']),
			...mapActions(['getGoodsList']),
			// 跳转导航
			navItem(id) {
				uni.navigateTo({
					url:`../goods/goods?id=${id}`
				})
			},
		}
	}
</script>

<style lang="scss">
	.home {
		overflow: hidden;
		background-color: $myhui2;

		// 热门商品
		.hot_goods {
			margin: 12rpx auto;

			.head_title {
				margin: 12rpx auto 0;
				background-color: $mybai;
				letter-spacing: 6rpx;
				color: $myhui;
				text-align: center;
				height: 80rpx;
				line-height: 80rpx;
				width: 100%;
				color: red;
			}

		}



		.nav_hover {
			background-color: $mytheme_text !important;
			color: $mytheme !important;
		}

		// 导航
		.nav {
			display: flex;
			background: $mybai;
			height: 240rpx;

			.nav_item {
				width: 25%;
				text-align: center;

				view {
					margin: 10px auto;
					width: 120rpx;
					height: 120rpx;
					line-height: 120rpx;
					border-radius: 8px;
					background: $mytheme;
					font-size: 60rpx;
					color: $mytheme_text;
					box-shadow: 2px 2px 2px $myhui;
				}

				text {
					font-size: 30rpx;
					color: $mytheme;
				}
			}
		}
	}
</style>
