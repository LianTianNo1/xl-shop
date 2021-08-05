<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,index) in goodsList" :key="index">
			<image :src="item.img_url" mode="aspectFit"></image>
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
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		computed: {
			...mapState(['goodsList'])
		}

	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: $myhui2;

		.goods_item {
			margin: 15rpx 0 0;
			padding: 0 0 20rpx;
			background-color: $mybai;
			box-sizing: border-box;
			width: 354rpx;
			border-radius: 20rpx;
			overflow: hidden;

			image {
				margin: 20rpx 0;
				width: 100%;
				height: 350rpx;
				display: block;
				margin: 0 auto;
			}

			.price {
				margin: 20rpx 0 0;
				padding: 0 20rpx;
				text:nth-child(1) {
					color: #ff946a;
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
				padding: 0 20rpx;
				margin: 10rpx 0;
				font-size: 30rpx;
				font-family: '微软雅黑';
				line-height: 1.5;
				color: rgba(23, 34, 59, 1);
			}
		}
	}
</style>
