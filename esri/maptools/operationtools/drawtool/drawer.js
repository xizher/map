import { deepExtent } from '../../../../../ext/js.utils'

export class Drawer {
  //#region 私有属性
  // **********************************************************************

  /**
   * 图元控制类
   * @type {import('../../../mapelementdisplay/mapelementdisplay').MapElementDisplay}
   */
  #mapElementDisplay = null

  /**
   * 绘制的图形样式
   */
  #drawedStyle = {
    color: [255, 0, 0, .5]
  }

  /**
   * 绘制时的图形样式
   */
  #drawingStyle = {
    color: [255, 0, 0, .3],
    outline: {
      color: [255, 0, 0, .5],
    }
  }

  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (mapElementDisplay) {
    this.#mapElementDisplay = mapElementDisplay
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    // ...
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  /**
   *  添加图形
   * @param {import('esri/geometry/Geometry') | Array<import('esri/geometry/Geometry')>} geometrys 图形
   * @returns {DrawTool}
   */
  add (geometrys) {
    const graphics = this.#mapElementDisplay.parseGraphics(geometrys, this.#drawedStyle)
    this.#mapElementDisplay
      .clearTempGraphics()
      .addGraphics(graphics)
    return this
  }

  /**
   * 清空图形
   * @returns {DrawTool}
   */
  clear () {
    this.#mapElementDisplay.clear()
    return this
  }

  /**
   * 设置图形
   * @param {import('esri/geometry/Geometry') | Array<import('esri/geometry/Geometry')>} geometrys 图形
   * @returns {DrawTool}
   */
  set (geometrys) {
    this.clear().add(geometrys)
    return this
  }

  /**
   * 移除指定图形
   * @param {import('esri/geometry/Geometry') | Array<import('esri/geometry/Geometry')>} geometrys 图形
   * @returns {DrawTool}
   */
  remove (geometrys) {
    const graphics = this.#mapElementDisplay.parseGraphics(geometrys, this.#drawedStyle)
    this.#mapElementDisplay.removeGraphics(graphics)
    return this
  }

  /**
   * 设置绘制中的图形
   * @param {import('esri/geometry/Geometry') | Array<import('esri/geometry/Geometry')>} geometrys 图形
   * @returns {DrawTool}
   */
  setTemp (geometrys) {
    const graphics = this.#mapElementDisplay.parseGraphics(geometrys, this.#drawingStyle)
    this.#mapElementDisplay.setTempGraphics(graphics)
    return this
  }

  /**
   * 设置绘制图形样式
   * @param {import('esri/symbols/Symbol')} style 样式
   * @returns {DrawTool}
   */
  setDrawedStyle (style) {
    deepExtent(true, this.#drawedStyle, style)
    return this
  }

  /**
   * 设置绘制中的图形样式
   * @param {import('esri/symbols/Symbol')} style 样式
   * @returns {DrawTool}
   */
  setDrawingStyle (style) {
    deepExtent(true, this.#drawingStyle, style)
    return this
  }

  // ______________________________________________________________________
  //#endregion
}
