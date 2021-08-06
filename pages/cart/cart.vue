<template>
	<view class="cart">
		<view v-if="cartList.length>0" class="cart-list">
			<view @click="clickActive(index,item)" :class="{'cart-item': true, 'active': item.selected  }" :key="index"
				v-for="(item,index) in cartList">

				<image :src="item.goods_big_logo" mode="widthFix"></image>
				<view class="right">
					<text>{{item.goods_name}}</text>
					<!-- <text>{{item.selected}}</text> -->
					<text>{{"￥" + item.goods_price}}</text>
				</view>
			</view>
		</view>
		<view v-else class="none-data">
			购物车空空
		</view>
		<view v-if="active" class="cartHandle">
			<view class="info">
				总价:￥ {{totalValue}}
			</view>
			<view class="paybox">
				<view class="pay" @click="payHandle">
					立即结算
				</view>
				<view class="delete" @click="removeCart">
					移除选中
				</view>
			</view>
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
	export default {
		data() {
			return {
				// 选中
				active: this.activeState,
				// 选中列表
				activeList: [],
			}
		},
		computed: {
			...mapState(['cartList','activeState']),
			// 总价
			totalValue() {
				let valueList = this.cartList.map(item => {
					return item.goods_price
				})
				if (valueList.length > 0) {
					return valueList.reduce((item1, item2) => {
						return item1 + item2
					})
				} else {
					return 0
				}
			}
		},
		methods: {
			...mapMutations(['changState', 'getCartList', 'removeCart']),
			// 选中需要删除的项
			clickActive(index, item) {
				/* uni.removeStorage({
				    key: 'cartList',
				    success: function (res) {
				        console.log('success');
				    }
				}); */
				// console.log(this.cartList[index].selected);
				if (this.cartList[index].selected) {
					this.changState([index, false]);
				} else {
					this.changState([index, true]);
				}
				let result = this.cartList.some((item) => {
					return item.selected === true
				})

				// 出现删除栏
				this.active = result ? true : false
			},
			// 判断数组中是否存在该项
			isExist(index) {
				let res = this.activeList.findIndex((item) => {
					return item === index
				})
				res = res === -1 ? false : true;
				return res;
			},
			// 支付操作
			payHandle() {
				uni.showToast({
					title: '该功能未实现'
				});
			}
		},

		onLoad() {
			// 获取购物车内容
			if (this.cartList.length === 0) {
				this.getCartList();
			}
			this.active = (this.cartList.length > 0) ? true : false;
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: $myhui2;

		.cart {
			height: 100%;

			.cartHandle {
				position: fixed;
				/* #ifdef H5 */
				bottom: 100rpx;
				/*  #endif */
				/*  #ifdef APP-PLUS */
				bottom: 0rpx;
				/*  #endif */
				width: 750rpx;
				height: 330rpx;
				background-color: $mybai;
				border-radius: 30% 30% 0 0;
				box-shadow: 0px -4px 5px 5px $myhui2;
				box-sizing: border-box;
				padding: 0 40rpx;

				.info {
					margin: 60rpx auto 10rpx;
					display: flex;
					width: 675rpx;
					height: 100rpx;
					background-color: $myhui;
					justify-content: center;
					align-items: center;
					border-radius: 56rpx 56rpx 0 0;
					font-weight: bold;
					letter-spacing: 4px;
					color: $mybai;
					background-color: #9cdcfe;
					box-shadow: 0px -4px 5px 5px $myhui2;

				}

				.paybox {
					display: flex;
					justify-content: space-between;
					align-items: center;

					view {
						display: flex;
						width: 330rpx;
						height: 150rpx;
						justify-content: center;
						align-items: center;
						border-radius: 16rpx;
						font-weight: bold;
						letter-spacing: 4px;
						box-shadow: 0px -4px 5px 5px $myhui2;
					}

					.pay {
						color: $mybai;
						background-color: $mytheme;
					}

					.delete {
						color: $mybai;
						background-color: rgb(255, 170, 0);
					}
				}
			}

			.none-data {
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 100rpx;
				font-weight: bold;
				color: $myhui;
				text-shadow: 1rpx 1rpx 1rpx rgba($color: $myju2, $alpha: 0.5) ;
			}

			.cart-list {
				width: 750rpx;

				.active {
					position: relative;
					color: red !important;
					// background-color: #aa0000 !important;
					background-color: rgba($color: #007AFF, $alpha: 1.0)  !important;
					box-shadow: 4px 4px 5px $mybai, -4px -4px 5px $myhui2 !important;
					transform: scale(0.98);

					.right {
						text:nth-child(2) {
							color: $mybai !important;
						}
					}
				}

				.active:after {
					content: "";
					display: block;
					position: absolute;
					top: 0%;
					left: 0%;
					right: 0%;
					bottom: 0%;
					// background-color: rgba($color: #aa0000, $alpha: 0.2);
				}

				.cart-item:last-child {
					margin-bottom: 500rpx !important;
				}

				.cart-item {
					display: flex;
					justify-content: space-between;
					padding: 0 20rpx 0 0;
					background-color: #ffaa00;
					overflow: hidden;
					box-shadow: 4px 4px 5px $myhui2, -4px -4px 5px $mybai;
					margin: 40rpx 20rpx;
					border-radius: 20px;

					image {
						width: 200rpx;
						height: 90%;
					}

					.right {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						width: 60%;

						text:nth-child(1) {
							display: block;
							font-size: 28rpx;
							line-height: 1.2;
							color: $mybai;
							letter-spacing: 3px;
						}

						text:nth-child(2) {
							display: block;
							font-size: 40rpx;
							line-height: 1.2;
							color: #ff0000;
							font-weight: bold;
							letter-spacing: 3px;
						}
					}
				}
			}
		}
	}
</style>
