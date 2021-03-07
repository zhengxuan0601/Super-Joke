let map = {}
const mapCenterPoint = new window.BMap.Point(120.20000, 30.26667) // 设置地图中心点坐标

/**
 * 初始化地图
 * @param { String } mapId 地图id及容器id
 */
export function initMap (mapId) {
  return new Promise(resolve => {
    map[mapId] = new window.BMap.Map(mapId)
    map[mapId].centerAndZoom(mapCenterPoint, 12)
    resolve()
  })
}

/**
 * 创建地图标记点
 * @param { String } mapId 地图id
 * @param { Object } 打点位置经纬度
 * @param { Object } options 打点属性(img, width, height)
 */
export function addMapMarker (mapId, { lon, lat }, options) {
  const icon = options.icon
  const [w, h] = [options.w || 24, options.h || 24]
  const markerIcon = new window.BMap.Icon(icon, new window.BMap.Size(w, h), {
    anchor: new window.BMap.Size(w / 2, h / 2)
  })
  // 创建Marker标注
  const pt = new window.BMap.Point(lon, lat)
  const marker = new window.BMap.Marker(pt, {
    icon: markerIcon
  })
  // 将标注添加到地图
  map[mapId].addOverlay(marker)
}
