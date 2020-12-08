import { Draw } from './operationtools/draw'


export class MapTools {

  constructor (map) {

    /**
     * leaflet 地图对象
     * @type {import('leaflet').Map}
     */
    const _map = map

    /**
     * @type {import('../mapobjectdisplay/mapobjectdisplay.leaflet').MapObjectDisplay}
     */
    const _mapObjectDisplay = _map.owner.mapObjectDisplay

    /**
     * 绘图器
     */
    const _drawer = {
      options: {
        color: '#ff0000'
      },
      tempOptions: {
        color: '#ff0000',
        opacity: 0.5
      },
      add (path) {
        _mapObjectDisplay.clearTemp(path)
        path = _mapObjectDisplay.parseGraphic(path, _drawer.options)
        _mapObjectDisplay.addGraphic(path)
      },
      set (path) {
        _mapObjectDisplay.clearTemp(path)
        _mapObjectDisplay.setGraphic(path)
      },
      setTemp (path) {
        path = _mapObjectDisplay.parseGraphic(path, _drawer.tempOptions)
        _mapObjectDisplay.setTemp(path)
      },
      remove (path) {
        _mapObjectDisplay.removeGraphic(path)
      },
      clear () {
        _mapObjectDisplay.clear()
      }
    }

    // _map.off('dblclick') // 取消leaflet默认双击放大事件
    /**
     * 地图操作工具集
     */
    const _mapOpreation = {
      Draw: new Draw(_map, _drawer)
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
      _mapOpreation.Draw.active().setDrawType('Rectangle')
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
