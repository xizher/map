import { DrawTool, Drawer } from './operationtools/drawtool.leaflet'
import { ZoomTool } from './operationtools/zoomtool.leaflet'


export class MapTools {

  constructor (map) {

    /**
     * leaflet 地图对象
     * @type {import('leaflet').Map}
     */
    const _map = map

    /**
     * 绘图器
     */
    const _drawer = new Drawer(_map)

    // _map.off('dblclick') // 取消leaflet默认双击放大事件
    /**
     * 地图操作工具集
     */
    const _mapOpreation = {
      Draw: new DrawTool(_map, _drawer),
      Zoom: new ZoomTool(_map, _drawer),
      // DrawByPoint: new DrawByPoint(_map, _drawer),
      // DrawByLine: new DrawByLine(_map, _drawer),
      // DrawByPolyline: new DrawByPolyline(_map, _drawer),
      // DrawByPolygon: new DrawByPolygon(_map, _drawer),
      // DrawByRectangle: new DrawByRectangle(_map, _drawer),
      // DrawByCircle: new DrawByCircle(_map, _drawer),
    }
    this.mapOpreation = _mapOpreation

    /**
     * 初始化
     */
    const init = () => {
      _map.off('dblclick') // 取消leaflet默认双击放大事件
      _mapOpreation.Zoom.active()
      // _mapOpreation.DrawByPoint.active()
      // _mapOpreation.DrawByLine.active()
      // _mapOpreation.DrawByPolyline.active()
      // _mapOpreation.DrawByPolygon.active()
      // _mapOpreation.DrawByRectangle.active()
      // _map.off('click')
      // _map.off('mousedown')
      // _map.off('mousemove')
      // _map.off('mouseup')
    }
    init()
  }

}
