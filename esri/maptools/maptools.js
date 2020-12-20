import { Basetool } from './basetool'
import { ClearTool } from './operationtools/drawtool/cleartool'
import { DrawTool } from './operationtools/drawtool/drawtool'
import { ZoomHome, ZoomIn, ZoomInRect, ZoomOut, ZoomOutRect } from './operationtools/zoomtool/zoomtool'

export class MapTools {
  //#region 私有属性
  // **********************************************************************

  /**
   * 地图对象
   * @type {import('../mapinit/mapinit').$Map}
   */
  #map = null

  /**
   * 视图对象
   * @type {import('../mapinit/mapinit').$View}
   */
  #view = null

  /**
   * 地图操作工具集
   * @type {Object<string, import('./basetool').Basetool>}
   */
  #toolOperations = null

  /**
   * 上一个非一次性工具标识
   */
  #preMapToolKey = ''

  /**
   * 当前激活状态的地图工具
   */
  #activedMapToolKey = ''

  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************
  get activedMapToolKey () { return this.#activedMapToolKey }
  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (map, view) {
    this.#map = map
    this.#view = view
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    this.#toolOperations = {
      '': new Basetool(this.#map, this.#view),
      'draw-point': new DrawTool(this.#map, this.#view, 'point'),
      'draw-line': new DrawTool(this.#map, this.#view, 'line'),
      'draw-line-faster': new DrawTool(this.#map, this.#view, 'line-faster'),
      'draw-polyline': new DrawTool(this.#map, this.#view, 'polyline'),
      'draw-polygon': new DrawTool(this.#map, this.#view, 'polygon'),
      'draw-rectangle': new DrawTool(this.#map, this.#view, 'rectangle'),
      'draw-rectangle-faster': new DrawTool(this.#map, this.#view, 'rectangle-faster'),
      'draw-circle': new DrawTool(this.#map, this.#view, 'circle'),
      'draw-circle-faster': new DrawTool(this.#map, this.#view, 'circle-faster'),
      'zoom-in-rect': new ZoomInRect(this.#map, this.#view),
      'zoom-out-rect': new ZoomOutRect(this.#map, this.#view),
      'zoom-in': new ZoomIn(this.#map, this.#view),
      'zoom-out': new ZoomOut(this.#map, this.#view),
      'zoom-home': new ZoomHome(this.#map, this.#view),
      'clear': new ClearTool(this.#map, this.#view),
    }
    // this.setMapTool('draw-polygon')
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************
  setMapTool (mapTool) {
    // this.#view.owner.mapElementDisplay.clear()
    let targetTool = null
    for (const key in this.#toolOperations) {
      if (key === mapTool.toLowerCase()) {
        targetTool = this.#toolOperations[key]
      } else {
        this.#toolOperations[key].deactive()
      }
    }
    if (targetTool) {
      targetTool.active()
      this.#activedMapToolKey = mapTool
      if (targetTool.once) {
        return this.setMapTool(this.#preMapToolKey)
      } else {
        this.#preMapToolKey = mapTool
        return this.#activedMapToolKey
      }
    } else {
      return this.setMapTool('')
    }
  }
  // ______________________________________________________________________
  //#endregion
}
