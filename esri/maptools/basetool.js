import { EventManager } from '../../../ext/customevent'

export class Basetool extends EventManager {
  //#region 私有属性
  // **********************************************************************

  /**
   * 视图对象
   * @type {import('../mapinit/mapinit').$View}
   */
  #view = null

  /**
   * 地图对象
   * @type {import('../mapinit/mapinit').$Map}
   */
  #map = null

  /**
   * 工具激活状态
   * @type {boolean}
   */
  #actived = false

  /**
   * 是否为一次性工具
   * @type {boolean}
   */
  #once = false
  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************
  get view () { return this.#view }
  get map () { return this.#map }
  get actived () { return this.#actived }
  get once () { return this.#once }
  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (map, view, once = false) {
    super()
    this.#map = map
    this.#view = view
    this.#once = once
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    this.on('tool-actived', event => this.onToolActived(event))
    this.on('tool-deactived', event => this.onToolDeactive(event))
    this.on('tool-clear', event => this.onToolClear(event))
    this.on('draw-start', event => this.onDrawStart(event))
    this.on('draw-moving', event => this.onDrawMoving(event))
    this.on('draw-end', event => this.onDrawEnd(event))
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  /**
   * 激活工具
   */
  active () {
    if (this.#actived) {
      return this
    }
    this.#actived = true
    this.fire('tool-actived')
    if (this.#once) {
      this.deactive()
    }
    return this
  }

  /**
   * 解除激活
   */
  deactive () {
    if (!this.#actived) {
      return this
    }
    this.fire('tool-deactived')
    return this
  }

  onToolActived (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onToolDeactive (event) { // eslint-disable-line
    if (this.#actived) {
      this.#actived = false
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawStart (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawMoving (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onDrawEnd (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  onToolClear (event) { // eslint-disable-line
    if (this.#actived) {
      // ...
      return true
    } else {
      return false
    }
  }

  // ______________________________________________________________________
  //#endregion
}
