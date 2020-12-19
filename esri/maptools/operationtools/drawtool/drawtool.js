import { Basetool } from '../../basetool'
import { Drawer } from './drawer'
import { DrawOperations } from './drawoperations'

export class DrawTool extends Basetool {
  //#region 私有属性
  // **********************************************************************

  /**
   * 图形绘制对象
   * @type {Drawer}
   */
  #drawer = null

  /**
   * 图形绘制类型控制对象
   * @type {DrawOperations}
   */
  #drawerOperation = null

  /**
   * 绘制图形类型
   * @type {string}
   */
  #drawType = ''

  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************
  get drawer () { return this.#drawer }
  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  /**
   * 绘图工具构造函数
   * @param {import('../../../mapinit/mapinit').$Map} map 地图对象
   * @param {import('../../../mapinit/mapinit').$View} view 视图对象
   * @param {string} drawType 绘制图形类型
   */
  constructor (map, view, drawType) {
    super(map, view)
    this.#drawer = new Drawer(view.owner.mapElementDisplay)
    this.#drawerOperation = new DrawOperations(this)
    this.#drawType = drawType
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
  /**
   * 设置绘制图形类型
   * @param {string} drawType 绘制图形类型
   */
  #setDrawType (drawType) { // eslint-disable-line
    this.#drawerOperation.setDrawType(drawType)
    return this
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  onToolActived (event) {
    if (super.onToolActived(event)) {
      this.#setDrawType(this.#drawType)
      return true
    } else {
      return false
    }
  }

  onDrawEnd (event) {
    if (super.onDrawEnd(event)) {
      this.#drawer.add(event.geometry)
      return true
    } else {
      return false
    }
  }

  onDrawMoving (event) {
    if (super.onDrawEnd(event)) {
      this.#drawer.setTemp(event.geometry)
      return true
    } else {
      return false
    }
  }

  onToolDeactive (event) {
    if (super.onToolDeactive(event)) {
      DrawOperations.clearDrawType()
      return true
    } else {
      return false
    }
  }

  // ______________________________________________________________________
  //#endregion
}
