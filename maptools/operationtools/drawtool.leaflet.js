import { BaseTool } from '../basetool.leaflet'
import $L from 'leaflet'

const _drawTool = Symbol('drawTool')
const _drawer = Symbol('drawer')
const _drawOperation = Symbol('drawOperation')
const _mapObjectDisplay = Symbol('mapObjectDisplay')
const _drawedStyle = Symbol('drawStyle')
const _drawingStyle = Symbol('drawingStyle')

export class DrawOperations {

  /**
   *
   * @param {DrawTool} drawTool
   */
  constructor (drawTool) {

    this[_drawTool] = drawTool

    /**
     *
     * @param {string} drawtype
     */
    this.setDrawType = drawtype => {
      this.clearDrawType()
      drawtype && DrawOperations[drawtype.toUpperCase()](this[_drawTool])
    }

    this.clearDrawType = () => {
      this[_drawTool].getMap().off('dblclick')
      this[_drawTool].getMap().off('click')
      this[_drawTool].getMap().off('mousedown')
      this[_drawTool].getMap().off('mousemove')
      this[_drawTool].getMap().off('mouseup')
    }

  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static POINT (drawTool) {
    drawTool.getMap().on('click', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        drawTool.fire('draw-actived', { originEvent: event })
        const path = new $L.CircleMarker(latlng)
        drawTool.getDrawer().add(path)
        drawTool.fire('draw-created', { path })
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static LINE (drawTool) {
    const state = {
      drawing: false,
      startLatlng: null
    }
    drawTool.getMap().on('mousemove', event => {
      if (drawTool.getActived() && state.drawing) {
        const endLatlng = event.latlng
        const path = new $L.Polyline([state.startLatlng, endLatlng])
        drawTool.getDrawer().setTempGraphic(path)
      }
    })
    drawTool.getMap().on('click', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        state.drawing = !state.drawing
        if (state.drawing) {
          drawTool.fire('draw-actived', { originEvent: event })
          state.startLatlng = latlng
        } else {
          const endLatlng = latlng
          const path = new $L.Polyline([state.startLatlng, endLatlng])
          drawTool.getDrawer().add(path)
        }
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static POLYLINE (drawTool) {
    const state = {
      drawing: false,
      latlngs: []
    }

    drawTool.getMap().on('click', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(latlng)
      }
    })
    drawTool.getMap().on('mousemove', event => {
      if (drawTool.getActived() && state.drawing) {
        const path = new $L.Polyline([...state.latlngs, event.latlng])
        drawTool.getDrawer().setTempGraphic(path)
      }
    })
    drawTool.getMap().on('dblclick', event => {
      const { originalEvent: { button } } = event
      if (drawTool.getActived() && button === 0) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polyline(state.latlngs)
        drawTool.getDrawer().add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static POLYGON (drawTool) {
    const state = {
      drawing: false,
      latlngs: []
    }

    drawTool.getMap().on('click', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        if (!state.drawing) {
          state.drawing = true
        }
        state.latlngs.push(latlng)
      }
    })
    drawTool.getMap().on('mousemove', event => {
      if (drawTool.getActived() && state.drawing) {
        const path = new $L.Polygon([...state.latlngs, event.latlng])
        drawTool.getDrawer().setTempGraphic(path)
      }
    })
    drawTool.getMap().on('dblclick', event => {
      const { originalEvent: { button } } = event
      if (drawTool.getActived() && button === 0) {
        state.drawing = false
        state.latlngs.pop()
        const path = new $L.Polygon(state.latlngs)
        drawTool.getDrawer().add(path)
        state.latlngs.$clear()
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static RECTANGLE (drawTool) {
    const state = {
      drawing: false,
      startLatlng: null
    }

    drawTool.getMap().on('click', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        state.drawing = !state.drawing
        if (state.drawing) {
          drawTool.fire('draw-actived', { originEvent: event })
          state.startLatlng = latlng
        } else {
          const endLatlng = latlng
          const path = new $L.Rectangle([state.startLatlng, endLatlng])
          drawTool.getDrawer().add(path)
          drawTool.fire('draw-created', { path })
        }
      }
    })
    drawTool.getMap().on('mousemove', event => {
      if (drawTool.getActived()) {
        if (state.drawing) {
          const endLatlng = event.latlng
          const path = new $L.Rectangle([state.startLatlng, endLatlng])
          drawTool.getDrawer().setTempGraphic(path)
        }
      }
    })
  }

  /**
   *
   * @param {DrawTool} drawTool
   */
  static RECTANGLEQUICKLY (drawTool) {
    const state = {
      drawing: false,
      latlng: null
    }
    drawTool.getMap().on('mousedown', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        drawTool.getMap().$setMapDraggable(false)
        state.drawing = true
        drawTool.fire('draw-actived', { originEvent: event })
        state.latlng = latlng
      }
    })
    drawTool.getMap().on('mousemove', event => {
      if (drawTool.getActived() && state.drawing) {
        const path = new $L.Rectangle([state.latlng, event.latlng])
        drawTool.getDrawer().setTempGraphic(path)
      }
    })
    drawTool.getMap().on('mouseup', event => {
      const { originalEvent: { button }, latlng } = event
      if (drawTool.getActived() && button === 0) {
        drawTool.getMap().$setMapDraggable(true)
        state.drawing = false
        const path = new $L.Rectangle([state.latlng, latlng])
        drawTool.getDrawer().add(path)
        drawTool.fire('draw-created', { path })
      }
    })
  }

}

export class DrawTool extends BaseTool {
  constructor (map, drawer) {
    super(map)

    /**
     * @type {Drawer}
     */
    this[_drawer] = drawer

    this[_drawOperation] = new DrawOperations(this)


  }

  getDrawer () {
    return this[_drawer]
  }

  setDrawType (drawtype) {
    this[_drawOperation].setDrawType(drawtype)
    return this
  }
}

/** 绘图控制器 */
export class Drawer {

  constructor (map) {

    /**
     * @type {import('../../mapobjectdisplay/mapobjectdisplay.leaflet').MapObjectDisplay}
     */
    this[_mapObjectDisplay] = map.owner.mapObjectDisplay

    /** 图元绘制完成后的样式 */
    this[_drawedStyle] = {
      color: '#ff0000',
    }

    /** 图元绘制中的样式 */
    this[_drawingStyle] = {
      color: '#ff0000',
      opacity: 0.5,
    }
  }


  add (path) {
    this[_mapObjectDisplay].clearTempGraphic(path)
    path = this[_mapObjectDisplay].parseGraphic(path, this[_drawedStyle])
    this[_mapObjectDisplay].addGraphic(path)
  }

  set (path) {
    this[_mapObjectDisplay].clearTempGraphic(path)
    this[_mapObjectDisplay].setGraphic(path)
  }

  setTempGraphic (path) {
    path = this[_mapObjectDisplay].parseGraphic(path, this[_drawingStyle])
    this[_mapObjectDisplay].setTempGraphic(path)
  }

  remove (path) {
    this[_mapObjectDisplay].removeGraphic(path)
  }

  clear () {
    this[_mapObjectDisplay].clearGraphics()
  }

  setDrawedStyle (style) {
    Object.assign(this[_drawedStyle], style)
  }

  setDrawingStyle (style) {
    Object.assign(this[_drawingStyle], style)
  }

}

