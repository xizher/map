import { CustomEvent } from '../../ext/customevent'

export class BaseTool extends CustomEvent {
  constructor (map) {
    super()

    /**
     * leaflet 地图对象
     * @type {import('leaflet').Map}
     */
    this.map = map

    /**
     * 工具激活状态
     */
    this.actived = false

    // 初始化
    const init = () => {
      this.on('tool-actived', () => {
        if (this.actived) {
          this.onToolActived()
        }
      })
      this.on('tool-deactived', () => {
        if (this.actived) {
          this.actived = false
          this.onToolDeactive()
        }
      })
      this.on('draw-actived', event => {
        if (this.actived) {
          this.onDrawActived(event)
        }
      })
      this.on('draw-moving', event => {
        if (this.actived) {
          this.onDrawMoving(event)
        }
      })
      this.on('draw-created', result => {
        if (this.actived) {
          this.onDrawCreated(result)
        }
      })
      this.on('tool-clear', () => {
        if (this.actived) {
          this.onToolDeactive()
        }
      })
      this.map.on('mousedown', event => {
        this.fire('draw-actived', { originEvent: event })
      })
      this.map.on('mousemove', event => {
        this.fire('draw-moving', { originEvent: event })
      })
      this.map.on('mouseup', event => {
        this.fire('draw-created', { originEvent: event })
      })
      this.map.on('click', event => {
        this.fire('draw-created', { originEvent: event })
      })
    }
    init()
  }

  active () {
    if (this.actived) { // 已处于激活状态
      return
    }
    this.actived = true
    this.fire('tool-actived')
  }

  deactive () {
    if (!this.actived.value) { // 已处于失活状态
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

  onDrawActived (event) {
    // ...
  }

  onDrawMoving (event) {
    // ...
  }

  onDrawCreated (event) {
    // ...
  }

  onToolClear () {
    // ...
  }

}
