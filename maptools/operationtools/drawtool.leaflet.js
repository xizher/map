import { BaseTool } from '../basetool.leaflet'
import $L from 'leaflet'

export class DrawOperations {

  /**
   *
   * @param {DrawTool} draw
   */
  constructor (drawTool) {

    const _drawTool = drawTool

    this.setDrawType = drawtype => {
      this.clearDrawType()
      drawtype && DrawOperations[drawtype](_drawTool)
    }

    this.clearDrawType = () => {
      _drawTool.map.off('click')
      _drawTool.map.off('mousedown')
      _drawTool.map.off('mousemove')
      _drawTool.map.off('mouseup')
    }

  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static Point (drawTool) {
    drawTool.map.on('click', event => {
      if (drawTool.getActived()) {
        drawTool.fire('draw-actived', { originEvent: event })
        const path = new $L.CircleMarker(event.latlng)
        drawTool.drawer.add(path)
        drawTool.fire('draw-created', { path })
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static Line (drawTool) {
    const state = {
      drawing: false,
      startLatlng: null
    }
    drawTool.map.on('mousemove', event => {
      if (drawTool.getActived()) {
        if (state.drawing) {
          const endLatlng = event.latlng
          const path = new $L.Polyline([state.startLatlng, endLatlng])
          drawTool.drawer.setTempGraphic(path)
        }
      }
    })
    drawTool.map.on('click', event => {
      if (drawTool.getActived()) {
        const { latlng } = event
        state.drawing = !state.drawing
        if (state.drawing) {
          drawTool.fire('draw-actived', { originEvent: event })
          state.startLatlng = latlng
        } else {
          const endLatlng = latlng
          const path = new $L.Polyline([state.startLatlng, endLatlng])
          drawTool.drawer.add(path)
        }
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static Polyline (drawTool) {
    const state = {
      drawing: false,
      latlngs: []
    }

    drawTool.map.on('click', event => {
      if (drawTool.getActived()) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(event.latlng)
      }
    })
    drawTool.map.on('mousemove', event => {
      if (drawTool.getActived()) {
        if (state.drawing) {
          const path = new $L.Polyline([...state.latlngs, event.latlng])
          drawTool.drawer.setTempGraphic(path)
        }
      }
    })
    drawTool.map.on('dblclick', () => {
      if (drawTool.getActived()) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polyline(state.latlngs)
        drawTool.drawer.add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static Polygon (drawTool) {
    const state = {
      drawing: false,
      latlngs: []
    }

    drawTool.map.on('click', event => {
      if (drawTool.getActived()) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(event.latlng)
      }
    })
    drawTool.map.on('mousemove', event => {
      if (drawTool.getActived()) {
        if (state.drawing) {
          const path = new $L.Polygon([...state.latlngs, event.latlng])
          drawTool.drawer.setTempGraphic(path)
        }
      }
    })
    drawTool.map.on('dblclick', () => {
      if (drawTool.getActived()) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polygon(state.latlngs)
        drawTool.drawer.add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {DrawTool} draw
   */
  static Rectangle (draw) {
    const state = {
      drawing: false,
      startLatlng: null
    }

    draw.map.on('click', event => {
      if (draw.getActived()) {
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
      if (draw.getActived()) {
        if (state.drawing) {
          const endLatlng = event.latlng
          const path = new $L.Rectangle([state.startLatlng, endLatlng])
          draw.drawer.setTempGraphic(path)
        }
      }
    })
  }

}

export class DrawTool extends BaseTool {
  constructor (map, drawer) {
    super(map)

    this.drawer = drawer

    const _drawOperation = new DrawOperations(this)

    this.setDrawType = drawtype => _drawOperation.setDrawType(drawtype)
  }
}

/** 绘图控制器 */
export class Drawer {

  constructor (map) {

    /**
     * @type {import('../../mapinit/mapinit.leaflet').$Map}
     */
    const _map = map

    /**
     * @type {import('../../mapobjectdisplay/mapobjectdisplay.leaflet')}
     */
    const _mapObjectDisplay = _map.owner.mapObjectDisplay

    /** 图元绘制完成后的样式 */
    const _drawedstyle = {
      color: '#ff0000'
    }

    /** 图元绘制中的样式 */
    const _drawingStyle = {
      color: '#ff0000',
      opacity: 0.5
    }

    Object.assign(this, {
      add (path) {
        _mapObjectDisplay.clearTempGraphic(path)
        path = _mapObjectDisplay.parseGraphic(path, _drawedstyle)
        _mapObjectDisplay.addGraphic(path)
      },
      set (path) {
        _mapObjectDisplay.clearTempGraphic(path)
        _mapObjectDisplay.setGraphic(path)
      },
      setTempGraphic (path) {
        path = _mapObjectDisplay.parseGraphic(path, _drawingStyle)
        _mapObjectDisplay.setTempGraphic(path)
      },
      remove (path) {
        _mapObjectDisplay.removeGraphic(path)
      },
      clear () {
        _mapObjectDisplay.clear()
      },
      setDrawedStyle (style) {
        Object.assign(_drawedstyle, style)
      },
      setDrawingStyle (style) {
        Object.assign(_drawingStyle, style)
      },
    })

  }
}

