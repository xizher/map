import { BaseTool } from '../basetool.leaflet'
import $L from 'leaflet'

class DrawOperations {

  /**
   *
   * @param {Draw} draw
   */
  constructor (draw) {

    const _draw = draw

    this.setDrawType = drawtype => {
      this.clearDrawType()
      drawtype && DrawOperations[drawtype](_draw)
    }

    this.clearDrawType = () => {
      _draw.map.off('click')
      _draw.map.off('mousedown')
      _draw.map.off('mousemove')
      _draw.map.off('mouseup')
    }

  }

  /**
   *
   * @param {Draw} draw
   */
  static Point (draw) {
    draw.map.on('click', event => {
      if (draw.actived) {
        draw.fire('draw-actived', { originEvent: event })
        const path = new $L.CircleMarker(event.latlng)
        draw.drawer.add(path)
        draw.fire('draw-created', { path })
      }
    })
  }

  /**
   *
   * @param {Draw} draw
   */
  static Line (draw) {
    const state = {
      drawing: false,
      startLatlng: null
    }
    draw.map.on('mousemove', event => {
      if (draw.actived) {
        if (state.drawing) {
          const endLatlng = event.latlng
          const path = new $L.Polyline([state.startLatlng, endLatlng])
          draw.drawer.setTemp(path)
        }
      }
    })
    draw.map.on('click', event => {
      if (draw.actived) {
        const { latlng } = event
        state.drawing = !state.drawing
        if (state.drawing) {
          draw.fire('draw-actived', { originEvent: event })
          state.startLatlng = latlng
        } else {
          const endLatlng = latlng
          const path = new $L.Polyline([state.startLatlng, endLatlng])
          draw.drawer.add(path)
        }
      }
    })
  }

  /**
   *
   * @param {Draw} draw
   */
  static Polyline (draw) {
    const state = {
      drawing: false,
      latlngs: []
    }

    draw.map.on('click', event => {
      if (draw.actived) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(event.latlng)
      }
    })
    draw.map.on('mousemove', event => {
      if (draw.actived) {
        if (state.drawing) {
          const path = new $L.Polyline([...state.latlngs, event.latlng])
          draw.drawer.setTemp(path)
        }
      }
    })
    draw.map.on('dblclick', () => {
      if (draw.actived) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polyline(state.latlngs)
        draw.drawer.add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {Draw} draw
   */
  static Polygon (draw) {
    const state = {
      drawing: false,
      latlngs: []
    }

    draw.map.on('click', event => {
      if (draw.actived) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(event.latlng)
      }
    })
    draw.map.on('mousemove', event => {
      if (draw.actived) {
        if (state.drawing) {
          const path = new $L.Polygon([...state.latlngs, event.latlng])
          draw.drawer.setTemp(path)
        }
      }
    })
    draw.map.on('dblclick', () => {
      if (draw.actived) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polygon(state.latlngs)
        draw.drawer.add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {Draw} draw
   */
  static Rectangle (draw) {
    const state = {
      drawing: false,
      startLatlng: null
    }

    draw.map.on('click', event => {
      if (draw.actived) {
        const { latlng } = event
        state.drawing = !state.drawing
        if (state.drawing) {
          draw.fire('draw-actived', { originEvent: event })
          state.startLatlng = latlng
        } else {
          const endLatlng = latlng
          const path = new $L.Rectangle([state.startLatlng, endLatlng])
          draw.drawer.add(path)
        }
      }
    })
    draw.map.on('mousemove', event => {
      if (draw.actived) {
        if (state.drawing) {
          const endLatlng = event.latlng
          const path = new $L.Rectangle([state.startLatlng, endLatlng])
          draw.drawer.setTemp(path)
        }
      }
    })
  }

}

export class Draw extends BaseTool {
  constructor (map, drawer) {
    super(map)

    this.drawer = drawer

    const _drawOperation = new DrawOperations(this)

    this.setDrawType = drawtype => _drawOperation.setDrawType(drawtype)
  }
}
