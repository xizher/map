import { DrawTool, Drawer } from './operationtools/drawtool.leaflet'
import { ZoomInTool, ZoomInRect, ZoomOutTool } from './operationtools/zoomtool.leaflet'

const _map = Symbol('map')
const _drawer = Symbol('drawer')
const _mapOperations = Symbol('mapOperations')
const _preMapTool = Symbol('preMapTool')

export class MapTools {

  constructor (map) {

    /**
     * leaflet 地图对象
     * @type {import('leaflet').Map}
     */
    this[_map] = map

    /**
     * 绘图器
     */
    this[_drawer] = new Drawer(this[_map])


    // _map.off('dblclick') // 取消leaflet默认双击放大事件
    /**
     * 地图操作工具集
     * @type {Array<import('../maptools/basetool.leaflet').BaseTool>}
     */
    this[_mapOperations] = {
      drawpoint: new DrawTool(this[_map], this[_drawer]),
      drawline: new DrawTool(this[_map], this[_drawer]),
      drawpolyline: new DrawTool(this[_map], this[_drawer]),
      drawpolygon: new DrawTool(this[_map], this[_drawer]),
      drawrectangle: new DrawTool(this[_map], this[_drawer]),
      drawrectanglequickly: new DrawTool(this[_map], this[_drawer]),
      zoominrect: new ZoomInRect(this[_map], this[_drawer]),
      zoomin: new ZoomInTool(this[_map]),
      zoomout: new ZoomOutTool(this[_map]),
    }

    this[_preMapTool] = ''

    /** 初始化 */
    const init = () => {
      this[_map].off('dblclick')
    }
    init()
  }

  /**
   *
   * @param {string} mapTool
   */
  setMapTool (mapTool) {
    this[_drawer].clear()
    for (const key in this[_mapOperations]) {
      if (key === mapTool.toLowerCase()) {
        if (key.startsWith('draw')) {
          this[_mapOperations][key].active().setDrawType(key.split('draw')[1])
        } else {
          this[_mapOperations][key].active()
        }
        if (this[_mapOperations][key].isOnce()) {
          this.setMapTool(this[_preMapTool])
        } else {
          this[_preMapTool] = key
        }
      } else {
        this[_mapOperations][key].deactive()
      }
    }
  }

  clearMapTool () {
    for (const key in this[_mapOperations]) {
      this[_drawer].clear()
      this[_mapOperations][key].deactive()
    }
  }

}
