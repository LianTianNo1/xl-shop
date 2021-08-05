<template>
	<view class="banner">
		<swiper :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList1" :key="item.id">
				<image :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<swiper :indicator-dots="true" :vertical="true" :circular="true" :autoplay="true" :interval="3000"
			:duration="1000">
			<swiper-item v-for="(item,index) in swiperList2" :key="item.id">
				<image :src="item.pics_big" mode="widthFix"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 导入 mapXXX
	import {
		mapState
	} from 'vuex'
	export default {
		name: "banner",
		data() {
			return {

			};
		},
		computed: {
			...mapState(['swiperList1', 'swiperList2'])
		}
	}
</script>

<style lang="scss">
	.banner {
		display: flex;
		padding: 10rpx 15rpx;
		justify-content: space-between;

		// 轮播
		swiper {
			height: 350rpx;
			width: 355rpx;
			border-radius: 20rpx;
			overflow: hidden;

			swiper-item,
			swiper-item>image {
				width: 100%;
			}
		}
	}
</style>
