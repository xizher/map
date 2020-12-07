import { DrawByCircle, DrawByLine, DrawByPoint, DrawByPolygon, DrawByPolyline, DrawByRectangle } from './operationtools/Draw'


export class MapTools {

  constructor (map) {

    /**
     * leaflet 地图对象
     * @type {import('leaflet').Map}
     */
    const _map = map

    /**
     * 地图操作工具集
     */
    const _mapOpreation = {
      DrawByPoint: new DrawByPoint(_map),
      DrawByLine: new DrawByLine(_map),
      DrawByPolyline: new DrawByPolyline(_map),
      DrawByPolygon: new DrawByPolygon(_map),
      DrawByRectangle: new DrawByRectangle(_map),
      DrawByCircle: new DrawByCircle(_map),
    }
    this.mapOpreation = _mapOpreation

    /**
     * 初始化
     */
    const init = () => {
      _map.off('dblclick') // 取消leaflet默认双击放大事件
      _mapOpreation.DrawByPoint.active()
      // _map.off('click')
      // _map.off('mousedown')
      // _map.off('mousemove')
      // _map.off('mouseup')
    }
    init()
  }

}
