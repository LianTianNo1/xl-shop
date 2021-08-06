<template>
	<view class="goods">
		<view class="top">
			<view :key="index" @click="addActive(index)" :class="{ 'active': active === index }"
				v-for="(item,index) in goods_nav">{{item.title}}</view>
		</view>
		<view class="bottom">
			<rich-text class="goodsinfo" v-if="active === 1" :nodes="convert"></rich-text>
			<view v-else class="bottom-info">
				<image :src="goodsInfo.goods_big_logo" mode="widthFix"></image>
				<text class="title">{{goodsInfo.goods_name}}</text>
				<view class="price_box">
					<text class="price" v-text="'￥' + goodsInfo.goods_price"></text>
					<text class="fukuan">{{NumbeOfPeople}} +已付款 </text>
				</view>
			</view>
			<view class="goods-nav">
				<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
					@buttonClick="buttonClick" />
			</view>
		</view>


	</view>
</template>

<script>
	// 把HTMLString转化为 Array
	import parseHtml from '../../modules/html-parser.js'
	import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	// 导入 mapXXX
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	// 导入商品列表组件
	export default {
		data() {
			return {
				// 商品信息
				goodsInfo: {},
				// 商品导航
				goods_nav: [{
						title: '商品页面'
					},
					{
						title: '商品页面'
					}
				],
				// 多少人购买 这里模拟数据
				NumbeOfPeople: this.rd(100, 9999),
				// 选中
				active: 0,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				],
				// 转化后的 富文本
				convert : []
			}
		},
		computed: {
			...mapState(['cartList']),
		},
		onLoad(options) {
			// 获取商品列表
			this.getGoodsInf(options);
			this.options[2].info = this.cartList && this.cartList.length || 0
		},

		methods: {
			...mapMutations(['addCartList']),
			// 获取随机数
			rd(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min
			},
			onClick(e) {
				uni.showToast({
					title: '该功能还没实现',
					icon: 'none'
				})
			},
			buttonClick(e) {
				// console.log(e)
				if (e.index === 1) {
					uni.showToast({
						title: '该功能还没实现',
						icon: 'none'
					})
				} else if (e.index === 0) {
					let tempShop = {};
					Object.assign(tempShop,this.goodsInfo)
					// console.log(tempShop);
					this.addCartList(tempShop);
					this.options[2].info++
				}
			},
			// 点击选中的商品
			addActive(index) {
				this.active = index;
			},
			// 获取商品详情
			async getGoodsInf(idobj) {
				const {
					id
				} = idobj;
				const res = await this.$http({
					url: `/api/public/v1/goods/detail?goods_id=${id}`
				});
				this.goodsInfo = res.data.message;
				this.goodsInfo .selected = false;
				this.convert = parseHtml(this.goodsInfo.goods_introduce)
			}
		},
		components: {
			uniGoodsNav
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;

		.goods {
			height: 100%;

			.top {
				position: fixed;
				/* #ifdef H5 */
				top: 88rpx;
				/*  #endif */
				/*  #ifdef APP-PLUS */
				top: 0rpx;
				/*  #endif */
				z-index: 99999;
				box-sizing: border-box;
				width: 750rpx;
				box-shadow: 0 4rpx 2rpx $myhui2, 0 -4rpx 2rpx $myhui2;
				display: flex;
				justify-content: space-around;

				view {
					background-color: $mybai;
					border-radius: 10rpx;
					text-align: center;
					height: 80rpx;
					line-height: 80rpx;
					width: 375px;
					box-sizing: border-box;
					border-left: 1px solid $myhui;
					border-right: 1px solid $myhui;
				}

				.active {
					background: $myju;
					color: $mybai;
				}
			}

			.bottom {
				margin: 100rpx 0 0;

				.goods-nav {
					position: fixed;
					bottom: 0;
					width: 750rpx;
				}

				.goodsinfo {
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}

				.bottom-info {
					background-color: $mybai;

					image {
						width: 750rpx;
					}

					.title {
						display: block;
						letter-spacing: 4rpx;
						line-height: 1.3;
						margin: 40rpx 0;
						padding: 0 20rpx;
					}

					.price_box {
						background-color: rgb(254, 95, 85);
						line-height: 80rpx;
						padding: 0 40rpx;
						height: 80rpx;
						border-radius: 12px;
						display: flex;
						box-shadow: 4px 4px 5px $myhui2,-4px -4px 5px $mybai;
						justify-content: space-between;
					}

					.price {
						display: block;
						font-size: 38rpx;
						color: $mybai;

					}

					.fukuan {
						font-size: 20rpx;
						color: $myhui;
					}
				}
			}
		}

	}
</style>
