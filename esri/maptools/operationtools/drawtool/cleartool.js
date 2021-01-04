import { Basetool } from '../../basetool'

export class ClearTool extends Basetool {

  //#region 私有属性
  // **********************************************************************

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
  constructor (map, view) {
    super(map, view, true)

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
  onToolActived(event) {
    if (super.onToolActived(event)) {
      this.view.owner.mapElementDisplay.clear()
      return true
    } else {
      return false
    }
  }
  // ______________________________________________________________________
  //#endregion

}