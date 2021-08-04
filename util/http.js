// api 基础地址
const BASE_URL = 'https://api-hmugo-web.itheima.net'
// 导出封装的 request
export default function http(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res) => {
				if (res.data.meta.status !== 200) {
					return uni.showToast({
						title: res.data.meta.msg
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title: res.data.meta.msg
				})
				reject(err)
			}
		})
	})
}
