import { DrawTool, Drawer } from './operationtools/drawtool.leaflet'
import { ZoomInWithFrameTool } from './operationtools/zoomtool.leaflet'

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
    const _mapOperation = {
      DrawPoint: new DrawTool(_map, _drawer),
      DrawLine: new DrawTool(_map, _drawer),
      DrawPolyline: new DrawTool(_map, _drawer),
      DrawPolygon: new DrawTool(_map, _drawer),
      DrawRectangle: new DrawTool(_map, _drawer),
      DrawRectangleQuickly: new DrawTool(_map, _drawer),
      ZoomInWithFrame: new ZoomInWithFrameTool(_map, _drawer),
    }
    this.mapOperation = _mapOperation

    Object.assign (this, {
      setMapTool (mapTool) {
        for (const key in _mapOperation) {
          if (key === mapTool) {
            if (key.startsWith('Draw')) {
              _mapOperation[key].active().setDrawType(key.split('Draw')[1])
            } else {
              _mapOperation[key].active()
            }
          } else {
            _drawer.clear()
            _mapOperation[key].deactive()
          }
        }
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
