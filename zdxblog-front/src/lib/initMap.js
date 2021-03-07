function initMap () {
  return new Promise((resolve, reject) => {
    // 如果已加载直接返回
    if (typeof window.BMap !== 'undefined') {
      resolve(window.BMap)
      return true
    }
    // 百度地图异步加载回调处理
    window.onBMapCallback = function () {
      resolve(window.BMap)
    }
  })
}

export default initMap
