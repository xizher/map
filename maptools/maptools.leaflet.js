import { DrawTool, Drawer } from './operationtools/drawtool.leaflet'
import { ZoomInTool, ZoomInWithFrameTool, ZoomOutTool } from './operationtools/zoomtool.leaflet'

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

    const _toolState = ['', '']

    // _map.off('dblclick') // 取消leaflet默认双击放大事件
    /**
     * 地图操作工具集
     */
    const _mapOperation = {
      DrawPoint: new DrawTool(_map, _drawer),
      DrawLine: new DrawTool(_map, _drawer),
      DrawPolyline: new DrawTool(_map, _drawer),
      DrawPolygon: new DrawTool(_map, _drawer),
      DrawRectangle: new DrawTool(_map, _drawer),
      DrawRectangleQuickly: new DrawTool(_map, _drawer),
      ZoomInWithFrame: new ZoomInWithFrameTool(_map, _drawer),
      ZoomIn: new ZoomInTool(_map),
      ZoomOut: new ZoomOutTool(_map),
    }
    this.mapOperation = _mapOperation

    Object.assign (this, {
      setMapTool (mapTool) {
        _drawer.clear()
        for (const key in _mapOperation) {
          if (key === mapTool) {
            _toolState.unshift(mapTool)
            _toolState.pop()
            if (key.startsWith('Draw')) {
              _mapOperation[key].active().setDrawType(key.split('Draw')[1])
            } else {
              _mapOperation[key].active()
            }
          } else {
            _mapOperation[key].deactive()
          }
        }
      },
      clearMapTool () {
        for (const key in _mapOperation) {
          _drawer.clear()
          _mapOperation[key].deactive()
        }
      },
      usePreTool () {
        this.setMapTool(_toolState[1])
      },
    })

    /**
     * 初始化
     */
    const init = () => {
      _map.off('dblclick')
    }
    init()
  }

}
