<template>
	<view>
		<good-list></good-list>
		<view class="isOver" v-if="flag">
			-----------到底了-----------
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
	export default {
		data() {
			return {
				flag: false
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

<style>

</style>
