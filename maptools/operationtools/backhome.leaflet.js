import { BaseTool } from '../basetool.leaflet'

/** 拉框放大 */
export class BackHomeTool extends BaseTool {
  constructor (map) {
    super(map, true)
  }

  onToolActived () {
    this.getMap().owner.gotoHomeExtent()
  }
}
