import { BaseTool } from '../basetool.leaflet'
import { DrawTool } from './drawtool.leaflet'

/** 拉框放大 */
export class ZoomInRect extends DrawTool {
  constructor (map, drawer) {
    super(map, drawer)
  }
  onToolActived () {
    this.setDrawType('RectangleQuickly')
  }

  onDrawCreated (event) { // 重写
    this.getDrawer().clear()
    this.getMap().$setExtent(event.path)
  }

}


/** 拉框放大 */
export class ZoomInTool extends BaseTool {
  constructor (map) {
    super(map, true)
  }

  onToolActived () {
    this.getMap().zoomIn(1)
  }

  onDrawCreated (event) { // 重写
    this.getDrawer().clear()
    this.getMap().$setExtent(event.path)
  }

}

/** 拉框放大 */
export class ZoomOutTool extends BaseTool {
  constructor (map) {
    super(map, true)
  }

  onToolActived () {
    this.getMap().zoomOut(1)
  }

  onDrawCreated (event) { // 重写
    this.getDrawer().clear()
    this.getMap().$setExtent(event.path)
  }
}
