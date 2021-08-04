<template>
	<view class="home">
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index" @click="navItem(item.path)">
				<view hover-class="nav_hover" :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view class="hot_goods">
			<view class="head_title iconfont">&#xe65b;热门商品</view>
			<view class="goods_list">

				<view class="goods_item" v-for="(item,index) in goodsList" :key="item.id">
					<image :src="item.img_url" mode=""></image>
					<view class="info">
						<view class="price">
							<text>￥{{item.sell_price}}</text>
							<text>￥{{item.market_price}}</text>
						</view>
						<view class="name">
							{{item.title}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图
				swiperList: [],
				// 商品列表
				goodsList: [],
				// 导航
				navs: [{
						icon: 'iconfont icon-shangcheng',
						title: '商城',
						path: '/pages/goods/goods'
					},
					{
						icon: 'iconfont icon-lianxi',
						title: '联系',
						path: '/pages/contact/contact'
					},
					{
						icon: 'iconfont icon-tupian',
						title: '图片',
						path: '/pages/pics/pics'
					},
					{
						icon: 'iconfont icon-shipin',
						title: '视频',
						path: '/pages/videos/videos'
					}
				]
			}
		},
		onLoad() {
			// 获取轮播数据
			this.getSwiper()
			// 获取商品列表
			this.getGoodsList()
		},
		methods: {
			// 跳转导航
			navItem(url){
				uni.navigateTo({
					url
				})
			},
			// 获取随机数
			rd(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min
			},
			// 获取轮播
			async getSwiper() {
				const res = await this.$http({
					url: '/api/public/v1/home/swiperdata',
				})
				this.swiperList = res.data.message
			},
			// 获取商品列表假的接口
			async getFakeData() {
				let res = await this.$http({
					url: `/api/public/v1/goods/detail?goods_id=${this.rd(100,8888)}`
				});
				return res;
			},
			// 处理接口
			async getGoodsList() {
				for (let i = 0; i < 10; i++) {
					let temp = {};
					let res = await this.getFakeData()
					while (res.data.message.pics.length < 1) {
						res = await this.getFakeData()
					}
					// 伪装数据
					temp.id = res.data.message.goods_id || this.rd(100, 8888);
					temp.title = res.data.message.goods_name || '';
					temp.add_time = res.data.message.add_time || new Date;
					temp.zhaiyao = res.data.message.goods_introduce || '';
					temp.click = res.data.message.hot_mumber || this.rd(100, 8888);
					temp.img_url = res.data.message.pics[0].pics_mid || '';
					temp.sell_price = res.data.message.goods_price || this.rd(1000, 2000);
					temp.market_price = temp.sell_price + this.rd(100, 200);
					temp.stock_quantity = this.rd(100, 8888);
					this.goodsList.push(temp)
				}

			}

		}
	}
</script>

<style lang="scss">
	.home {
		background-color: $myhui2;
		overflow: hidden;

		// 热门商品
		.hot_goods {
			margin: 12rpx auto;
			background-color: $myhui2;

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

			.goods_list {
				padding: 0 15rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.goods_item {
					margin: 10rpx 0 0;
					padding: 30rpx 20rpx 0;
					background-color: $mybai;
					box-sizing: border-box;
					width: 354rpx;
					border-radius: 10rpx;

					image {
						border-radius: 8px;
						margin: 20rpx 0;
						width: 80%;
						height: 350rpx;
						display: block;
						margin: 0 auto;
					}

					.price {
						margin: 20rpx 0 0;

						text:nth-child(1) {
							color: #cb0000;
							font-size: 38rpx;
						}

						text:nth-child(2) {
							color: $myhui;
							text-decoration: line-through;
							font-size: 26rpx;
							margin-left: 18rpx;
						}
					}

					.name {
						margin: 10rpx 0;
						font-size: 30rpx;
						font-family: '微软雅黑';
						line-height: 1.5;
						color: rgba(23, 34, 59, 1);
					}
				}
			}
		}

		// 轮播
		swiper {
			width: 100%;
			box-shadow: 0px 2px 2px #ccc, 0px 2px 2px rgba(0, 0, 0, 0.8) inset;

			swiper-item,
			swiper-item>image {
				width: 750rpx;
				border-radius: 0 0 16rpx 16rpx;
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
