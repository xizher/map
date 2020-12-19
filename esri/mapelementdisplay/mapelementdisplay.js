import { deepExtent } from '../../../ext/js.utils'
import { esri } from '../loadmodules/loadmodules'

export class MapElementDisplay {
  //#region 私有属性
  // **********************************************************************

  /**
   * 地图对象
   * @type {import('../mapinit/mapinit').$Map}
   */
  #map = null

  /**
   * 图元对象
   * @type {import('esri/layers/GraphicsLayer')}
   */
  #graphicsLayer = new esri.layers.GraphicsLayer()

  /**
   * 视图对象
   * @type {import('../mapinit/mapinit').$View}
   */
  #view = null

  /**
   * 默认符号类型库
   */
  #defaultSymbols = {
    simpleMarker: new esri.symbols.SimpleMarkerSymbol({
      color: [255, 0, 0, .8],
      style: 'circle',
      size: '12px',
      outline: {
        color: [255, 0, 0],
        width: 1
      }
    }),
    simpleLine: new esri.symbols.SimpleLineSymbol({
      color: [255, 0, 0, .8],
      width: '2px',
      style: 'solid'
    }),
    simpleFill: new esri.symbols.SimpleFillSymbol({
      color: [255, 0, 0, .4],
      style: 'solid',
      outline: {
        color: [255, 0, 0],
        width: 1
      }
    })
  }

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
    this.#map.layers.add(this.#graphicsLayer)
  }
  // ______________________________________________________________________
  //#endregion

  //#region 公有方法
  // **********************************************************************

  /**
   * 添加图元（保留已有图元基础上）
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  addGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#graphicsLayer.addMany(graphics)
      : this.#graphicsLayer.add(graphics)
    return this
  }

  /**
   * 清理所有图元
   * @returns {MapElementDisplay}
   */
  clearGraphics () {
    this.#graphicsLayer.removeAll()
    return this
  }

  /**
   * 清理指定图元
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  removeGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#graphicsLayer.removeMany(graphics)
      : this.#graphicsLayer.remove(graphics)
    return this
  }

  /**
   * 设置图元（清空已有图元基础上）
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  setGraphics (graphics) {
    this
      .clearGraphics()
      .addGraphics(graphics)
    return this
  }

  /**
   * 添加过渡图元（保留已有过渡图元基础上）
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  addTempGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#view.graphics.addMany(graphics)
      : this.#view.graphics.add(graphics)
    return this
  }

  /**
   * 清理所有过渡图元
   * @returns {MapElementDisplay}
   */
  clearTempGraphics () {
    this.#view.graphics.removeAll()
    return this
  }

  /**
   * 清理指定过渡图元
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  removeTempGraphics (graphics) {
    Array.isArray(graphics)
      ? this.#view.graphics.removeMany(graphics)
      : this.#view.graphics.remove(graphics)
    return this
  }

  /**
   * 设置过渡图元（清空已有过渡图元基础上）
   * @param {import('esri/Graphic') | Array<import('esri/Graphic')>} graphics 图元
   * @returns {MapElementDisplay}
   */
  setTempGraphics (graphics) {
    this
      .clearTempGraphics()
      .addTempGraphics(graphics)
    return this
  }

  clear () {
    this
      .clearGraphics()
      .clearTempGraphics()
    return this
  }

  /**
   * 解析图元
   * @param {import('esri/geometry/Geometry') | Array<import('esri/geometry/Geometry')>} geometrys 图元
   * @param {import('esri/symbols/Symbol')} symbolOptions
   * @returns {import('esri/Graphic') | Array<import('esri/Graphic')>}
   */
  parseGraphics (geometrys, symbolOptions = {}) {
    let symbol = null
    let type = Array.isArray(geometrys) ? geometrys[0].type : geometrys.type
    if (type === 'point') {
      symbol = this.#defaultSymbols.simpleMarker.clone()
    } else if (type === 'polyline') {
      symbol = this.#defaultSymbols.simpleLine.clone()
    } else if (type === 'polygon' || type === 'extent') {
      symbol = this.#defaultSymbols.simpleFill.clone()
    }
    deepExtent(true, symbol, symbolOptions)
    if (Array.isArray(geometrys)) {
      return geometrys.map(geometry => ({ geometry, symbol }))
    } else {
      return { geometry: geometrys, symbol }
    }
  }

  // ______________________________________________________________________
  //#endregion
}
