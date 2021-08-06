<template>
	<view class="pics">
		<scroll-view class="left" scroll-y="true">
			<view :key="index" :class="{'active' : active===index }" v-for="(item,index) in picsList"
				@click="leftClickHandle(index)">
				<text>{{item.cat_name}}</text>
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y="true">
			<view class="showItem" :key="index" v-for="(item,index) in showImg">
				<view v-if="item.goods_small_logo.length>1">
					<image @click="previewImg(item.goods_small_logo)" :src="item.goods_small_logo || '图片加载出错'" mode="widthFix"></image>
					<text>{{item.goods_name || ''}}</text>
				</view>
				
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 选中
				active: 1,
				picsList: [],
				// 展示图片
				showImg: []
			}
		},
		async onLoad() {
			await this.getCategorise();
			this.leftClickHandle(0)
		},
		methods: {
			// 预览图片
			previewImg(current){
				// 拼装新的列表
				let imgList = this.showImg.map(item=>{
					return item.goods_small_logo
				})
				// 实现预览图片
				uni.previewImage({
					current,
					urls:imgList
				})
				
			},
			// 选中操作
			async leftClickHandle(index) {
				this.active = index;
				// 分类
				let {
					cat_name,
					cat_id
				} = this.picsList[index];
				// 查询该分类图片
				let res = await this.$http({
					url: `/api/public/v1/goods/search?query=${cat_name}&cid=${cat_id}&pagenum=0&pagesize=40`
				})
				this.showImg = res.data.message.goods;
				// console.log(this.showImg);
			},
			// 获取图片列表
			async getCategorise() {
				let res = await this.$http({
					url: '/api/public/v1/categories'
				})
				// 处理假数据
				let newList = []
				let getimg = list => {
					list.forEach((item, index) => {
						if (index > 16) {
							item.children && item.children.forEach((item2, index) => {
								item2.children && item2.children.forEach((item3, index) => {
									if (newList.length < 100) {
										newList.push(item3);
									} else {
										return
									}
								})
							})
						}
					})
				}
				getimg(res.data.message)
				this.picsList = newList
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;

		.pics {
			display: flex;
			height: 100%;

			.left {
				width: 200rpx;
				height: 100%;
				border-right: 1px solid $myhui;

				view {
					border-radius:15rpx ;
					box-shadow: 0px 1px 1px $myhui2;
					border-bottom: 1px solid $myhui;
					height: 120rpx;
					line-height: 120rpx;
					text-align: center;
				}
			}

			.right {
				width: 550rpx;
				background-color: $myhui2;

				.showItem {
					margin: 0 0 40rpx;
					background-color: $mybai;
					border-radius: 20rpx;
					overflow: hidden;
					box-shadow: 0px 2px 2px $myhui2;

				}

				text:nth-child(2) {
					display: block;
					font-size: 30rpx;
					line-height: 1.4;
					text-indent: 2em;
					padding: 10rpx 25rpx;
					letter-spacing: 4rpx;
				}

				text:nth-child(3) {
					display: block;
					color: #ff5500;
					font-size: 40rpx;
					line-height: 1.6;
					padding: 0 40rpx;
					letter-spacing: 4rpx;
				}
			}

			.active {
				background: $myju;
				color: $mybai;
			}
		}

	}
</style>
