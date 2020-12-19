import $L from 'leaflet'

/**
 * 设置地图范围
 * @param {$L.Polyline | $L.Polygon | $L.Rectangle} path leaflet Path 对象
 */
$L.Map.prototype.$setExtent = function (path) {
  const bounds = path.getBounds()
  this.fitBounds(bounds)
  return this
}

$L.Map.prototype.$setMapDraggable = function (draggable) {
  draggable
    ? this.dragging.enable()
    : this.dragging.disable()
}
