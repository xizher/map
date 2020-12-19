import { EventManager } from '../../ext/customevent'

export class BaseTool extends EventManager {

  /**
   * leaflet 地图对象
   * @type {import('../mapinit/mapinit.leaflet').$Map}
   */
  #map = null
  #actived = false // 工具激活状态
  #once = false

  constructor (map, once = false) {
    super()

    this.#map = map

    this.#actived = false

    this.#once = once

    // 初始化
    const init = () => {
      this.on('tool-actived', () => {
        if (this.#actived) {
          this.onToolActived()
          if (this.#once) { // 取消一次性工具激活状态
            this.deactive()
          }
        }
      })
      this.on('tool-deactived', () => {
        if (this.#actived) {
          this.#actived = false
          this.onToolDeactive()
        }
      })
      this.on('draw-actived', event => {
        if (this.#actived) {
          this.onDrawActived(event)
        }
      })
      this.on('draw-moving', event => {
        if (this.#actived) {
          this.onDrawMoving(event)
        }
      })
      this.on('draw-created', event => {
        if (this.#actived) {
          this.onDrawCreated(event)
        }
      })
      this.on('tool-clear', () => {
        if (this.#actived) {
          this.onToolDeactive()
        }
      })
    }
    init()
  }

  getActived () {
    return this.#actived
  }

  getMap () {
    return this.#map
  }

  isOnce () {
    return this.#once
  }

  active () {
    if (this.#actived) { // 已处于激活状态
      return
    }
    this.#actived = true
    this.fire('tool-actived')
    return this
  }

  deactive () {
    if (!this.#actived) { // 已处于失活状态
      return
    }
    this.fire('tool-deactived')
  }

  onToolActived () {
    // ...
  }

  onToolDeactive () {
    // ...
  }

  onDrawActived (/* event */) {
    // ...
  }

  onDrawMoving (/* event */) {
    // ...
  }

  onDrawCreated (/* event */) {
    // ...
  }

  onToolClear () {
    // ...
  }

}
