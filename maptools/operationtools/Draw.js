import { BaseTool } from '../basetools.leaflet'

export class DrawByPoint extends BaseTool {
  constructor (map) {
    super(map)
    this.map.off('mouseup')
  }
  onDrawCreated (event) {
    console.log(event)
  }
}

export class DrawByLine extends BaseTool {
  constructor (map) {
    super(map)
  }
}

export class DrawByPolyline extends BaseTool {
  constructor (map) {
    super(map)
  }
}

export class DrawByPolygon extends BaseTool {
  constructor (map) {
    super(map)
  }
}

export class DrawByRectangle extends BaseTool {
  constructor (map) {
    super(map)
  }
}

export class DrawByCircle extends BaseTool {
  constructor (map) {
    super(map)
  }
}
