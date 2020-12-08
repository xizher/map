import { CustomEvent } from '../../ext/customevent'

export class BaseTool extends CustomEvent {

  constructor (map) {
    super()

    /**
     * leaflet 地图对象
     * @type {import('../mapinit/mapinit.leaflet').$Map}
     */
    this.map = map
    // console.log(this)

    /**
     * 工具激活状态
     */
    let _actived = false

    Object.assign(this, {

      getActived () {
        return _actived
      },

      active () {
        if (_actived) { // 已处于激活状态
          return
        }
        _actived = true
        this.fire('tool-actived')
        return this
      },

      deactive () {
        if (!_actived) { // 已处于失活状态
          return
        }
        this.fire('tool-deactived')
      },

      onToolActived () {
        // ...
      },

      onToolDeactive () {
        // ...
      },

      onDrawActived (/* event */) {
        // ...
      },

      onDrawMoving (/* event */) {
        // ...
      },

      onDrawCreated (/* event */) {
        // ...
      },

      onToolClear () {
        // ...
      },
    })

    // 初始化
    const init = () => {
      this.on('tool-actived', () => {
        if (_actived) {
          this.onToolActived()
        }
      })
      this.on('tool-deactived', () => {
        if (_actived) {
          _actived = false
          this.onToolDeactive()
        }
      })
      this.on('draw-actived', event => {
        if (_actived) {
          this.onDrawActived(event)
        }
      })
      this.on('draw-moving', event => {
        if (_actived) {
          this.onDrawMoving(event)
        }
      })
      this.on('draw-created', event => {
        if (_actived) {
          this.onDrawCreated(event)
        }
      })
      this.on('tool-clear', () => {
        if (_actived) {
          this.onToolDeactive()
        }
      })
    }
    init()
  }

}
