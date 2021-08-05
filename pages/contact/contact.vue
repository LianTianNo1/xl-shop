<template>
	<view class="contact">
		<image src="https://gitee.com/lang-tian/image_upload/raw/master/img/4103C6B704CA3D8A98BA83CFC532EE87.jpg"
			mode="widthFix"></image>
		<view class="info">
			<text>这是小浪的一个测试 Demo 采用 uni-app 编写
				欢迎大家一起交流学习
				这是我的坐标
				------------------->
				有附近的小伙伴么
				QQ:1584731441
			</text>
			<view class="map_wrap">
				<map :latitude="latitude" :longitude="longitude" :max-scale="20" :markers="covers"></map>
			</view>
		</view>

	</view>
</template>

<script>
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
		methods: {

		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.contact {
		.info {
			display: flex;
			justify-content: space-between;
			
			text {
				display: block;
				text-align: center;
				font-size: 20rpx;
				line-height: 2;
				border: 1px solid $mybai;
				background-color: $myblue;
				border-radius: 20rpx;
				color: $mybai;
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

		image {
			width: 750rpx;
			height: 750rpx;

		}

	}
</style>
