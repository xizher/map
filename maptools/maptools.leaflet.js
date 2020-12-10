import { EventManager } from '../../ext/customevent'
import { BaseTool } from './basetool.leaflet'
import { BackHomeTool } from './operationtools/backhome.leaflet'
import { DrawTool, Drawer } from './operationtools/drawtool.leaflet'
import { ZoomInTool, ZoomInRect, ZoomOutTool } from './operationtools/zoomtool.leaflet'

export class MapTools extends EventManager {

  /** @type {import('../mapinit/mapinit.leaflet').$Map} */
  #map = null

  /** @type {Drawer} */
  #drawer = null // 绘图器

  /** @type {Object<string, import('./basetool.leaflet').BaseTool>} */
  #mapOperations = null // 地图操作工具集

  #preMapTool = '' // 上一个非一次性工具

  #options = {}

  constructor (map, options) {
    super()

    this.#map = map

    this.#options = options

    /**
     * 绘图器
     */
    this.#drawer = new Drawer(this.#map)


    this.#mapOperations = {
      '': new BaseTool(this.#map),
      'draw-point': new DrawTool(this.#map, this.#drawer),
      'draw-line': new DrawTool(this.#map, this.#drawer),
      'draw-polyline': new DrawTool(this.#map, this.#drawer),
      'draw-polygon': new DrawTool(this.#map, this.#drawer),
      'draw-rectangle': new DrawTool(this.#map, this.#drawer),
      'draw-rectangle-quickly': new DrawTool(this.#map, this.#drawer),
      'zoom-in-rect': new ZoomInRect(this.#map, this.#drawer),
      'zoom-in': new ZoomInTool(this.#map),
      'zoom-out': new ZoomOutTool(this.#map),
      'back-home': new BackHomeTool(this.#map),
    }

    this.#preMapTool = ''

    /** 初始化 */
    const init = () => {
      this.#map.off('dblclick')

      this.#mapOperations['zoom-in-rect'].getDrawer().setDrawingStyle({
        color: '#000', fillColor: '#000'
      })
    }
    init()
  }

  /**
   *
   * @param {string} mapTool
   */
  setMapTool (mapTool) {
    this.fire('tool-changed', { toolName: mapTool })
    this.#drawer.clear()
    for (const key in this.#mapOperations) {
      if (key === mapTool.toLowerCase()) {
        if (key.startsWith('draw')) {
          this.#mapOperations[key].active().setDrawType(key.split('draw')[1])
        } else {
          this.#mapOperations[key].active()
        }
        if (this.#mapOperations[key].isOnce()) {
          this.setMapTool(this.#preMapTool)
        } else {
          this.#preMapTool = key
        }
      } else {
        this.#mapOperations[key].deactive()
      }
    }
  }

  clearMapTool () {
    this.fire('tool-changed', { toolName: '' })
    for (const key in this.#mapOperations) {
      this.#drawer.clear()
      this.#mapOperations[key].deactive()
    }
  }

  getTools () {
    return this.#options.items.filter(item => item.visible)
  }

  getEnabled() {
    return this.#options.enabled
  }

}
