import { CustomEvent } from '../../ext/customevent'

const _map = Symbol('map')
const _actived = Symbol('actived')
const _once = Symbol('once')

export class BaseTool extends CustomEvent {

  constructor (map, once = false) {
    super()

    /**
     * leaflet 地图对象
     * @type {import('../mapinit/mapinit.leaflet').$Map}
     */
    this[_map] = map
    // console.log(this)

    /**
     * 工具激活状态
     */
    this[_actived] = false

    this[_once] = once

    // 初始化
    const init = () => {
      this.on('tool-actived', () => {
        if (this[_actived]) {
          this.onToolActived()
          if (this[_once]) { // 取消一次性工具激活状态
            this.deactive()
          }
        }
      })
      this.on('tool-deactived', () => {
        if (this[_actived]) {
          this[_actived] = false
          this.onToolDeactive()
        }
      })
      this.on('draw-actived', event => {
        if (this[_actived]) {
          this.onDrawActived(event)
        }
      })
      this.on('draw-moving', event => {
        if (this[_actived]) {
          this.onDrawMoving(event)
        }
      })
      this.on('draw-created', event => {
        if (this[_actived]) {
          this.onDrawCreated(event)
        }
      })
      this.on('tool-clear', () => {
        if (this[_actived]) {
          this.onToolDeactive()
        }
      })
    }
    init()
  }

  getActived () {
    return this[_actived]
  }

  getMap () {
    return this[_map]
  }

  isOnce () {
    return this[_once]
  }

  active () {
    if (this[_actived]) { // 已处于激活状态
      return
    }
    this[_actived] = true
    this.fire('tool-actived')
    return this
  }

  deactive () {
    if (!_actived) { // 已处于失活状态
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
