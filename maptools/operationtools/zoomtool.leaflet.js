import { DrawTool } from './drawtool.leaflet'

export class ZoomTool extends DrawTool {
  constructor (map, drawer) {
    super(map, drawer)
    this.setDrawType('Rectangle')

    Object.assign(this, {
      onDrawCreated (event) {
        this.drawer.clear()
        this.map.$setExtent(event.path)
      }
    })

  }
  // // 无法重写 ？？？
  // onDrawCreated (event) {
  //   console.log(event)
  //   this.drawer.clear()
  //   // this.map.$setExtent()
  // }

}
