<template>
	<view class="contact">
		<image class="topImg" src="https://gitee.com/lang-tian/image_upload/raw/master/img/4103C6B704CA3D8A98BA83CFC532EE87.jpg"
			mode="widthFix"></image>
		<view class="info">
			<text>这是小浪的一个测试 Demo 采用 uni-app 编写
				欢迎大家一起交流学习
				<!-- 这是我的坐标
				有附近的小伙伴么 -->
				QQ:1584731441
			</text>
			<!-- <view class="map_wrap">
				<map :latitude="latitude" :longitude="longitude" :max-scale="20" :markers="covers"></map>
			</view> -->
		</view>
		<!-- <view class="goods">
			<good-list></good-list>
		</view> -->
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
	export default {
		data() {
			return {

				longitude: 110.051623,
				latitude: 27.585228,
				covers: [{
					longitude: 110.051623,
					latitude: 27.585228,

					iconPath: '../../static/icon/icon-dibiao.png',
				}]
			}
		},
		// 到底了
		onReachBottom() {
			// 到底了继续获取商品列表
			this.getGoodsList();
		},
		onLoad() {
			// 获取商品列表
			this.getGoodsList()
		}, // 上拉刷新
		onPullDownRefresh() {
			// 清空商品列表
			this.clearGoodsList()
			// 获取商品列表
			this.getGoodsList()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			...mapActions(['getGoodsList']),
			...mapMutations(['clearGoodsList'])
		},
		computed: {
			...mapState(['goodsList'])
		},
		components: {
			'good-list': good_list
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.contact {
		.info {
			display: flex;
			justify-content: space-between;
			box-shadow: 2px 2px 2px 2px $myhui2,-2px -2px 2px 2px $myhui2;
			text {
				display: block;
				text-align: center;
				padding: 20rpx 20rpx;
				font-size: 20rpx;
				line-height: 2;
				border: 1px solid $mybai;
				background-color: $myju2;
				border-radius: 20rpx;
				color: $mybai;
				width: 750rpx;
				box-sizing: border-box;
			}

			.map_wrap {
				border-radius: 5%;
				overflow: hidden;

				map {
					width: 750rpx;
					height: 450rpx;
				}
			}
		}

		image.topImg {
			width: 750rpx;
			height: 750rpx;
			border-radius: 25rpx;
			margin: 20rpx 0rpx;
			box-shadow: 2px 2px 2px 2px $myhui2,-2px -2px 2px 2px $myhui2;
		}

	}
</style>
