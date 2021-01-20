import { pointsToPolygon, pointsToPolyline, screenToMapPoint } from '../../../esri.utils/esri.utils'
import { esri } from '../../../loadmodules/loadmodules'

export class DrawOperations {
  //#region 私有属性
  // **********************************************************************

  static #removed = {
    'double-click': null,
    'click': null,
    'pointer-down': null,
    'pointer-move': null,
    'pointer-up': null,
    'drag': null
  }

  /**
   * 绘图工具对象
   * @type {import('./drawtool').DrawTool}
   */
  #drawTool = null

  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  /**
   * 绘图类型控制类构造函数
   * @param {import('./drawtool').DrawTool} drawTool 绘图工具
   */
  constructor (drawTool) {
    this.#drawTool = drawTool
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    // ...
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  /**
   * 设置绘制类型
   * @param {string} drawType 绘制类型
   */
  setDrawType (drawType) {
    DrawOperations.clearDrawType()
    drawType && DrawOperations[drawType.toLowerCase()]?.(this.#drawTool)
  }

  /**
   * 清除绘制响应事件
   */
  static clearDrawType () {
    Object.keys(DrawOperations.#removed).forEach(item => {
      DrawOperations.#removed[item]?.remove?.()
      DrawOperations.#removed[item] = null
    })
  }

  /**
   * 绘制点
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static point (drawTool) {
    DrawOperations.#removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawTool.fire('draw-end', { geometry: event.mapPoint })
    })
  }

  /**
   * 绘制直线
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static line (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-end', { geometry: polyline })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
      }
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制直线（以较快的方式）
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static 'line-faster' (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperations.#removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = screenToMapPoint(event)
    })
    DrawOperations.#removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = screenToMapPoint(event)
      const polyline = pointsToPolyline([startPoint, endPoint])
      drawTool.fire('draw-end', { geometry: polyline })
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制线段
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static polyline (drawTool) {
    let drawing = false
    const points = []
    DrawOperations.#removed['double-click'] = drawTool.view.on('double-click', event => {
      if (event.button !== 0) {
        return
      }
      event.stopPropagation()
      drawing = false
      const polyline = pointsToPolyline([...points, event.mapPoint])
      points.$clear()
      drawTool.fire('draw-end', { geometry: polyline })
    })
    DrawOperations.#removed['click'] = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      points.push(event.mapPoint)
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polyline = pointsToPolyline([...points, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline })
      }
    })
  }

  /**
   * 绘制多边形
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static polygon (drawTool) {
    let drawing = false
    const points = []
    DrawOperations.#removed['double-click'] = drawTool.view.on('double-click', event => {
      if (event.button !== 0) {
        return
      }
      event.stopPropagation()
      drawing = false
      const polygon = pointsToPolygon([...points, event.mapPoint])
      points.$clear()
      drawTool.fire('draw-end', { geometry: polygon })
    })
    DrawOperations.#removed['click'] = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      points.push(event.mapPoint)
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polygon = pointsToPolygon([...points, endPoint])
        drawTool.fire('draw-moving', { geometry: polygon })
      }
    })
  }

  /**
   * 绘制矩形
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static rectangle (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-end', { geometry: polyline.extent })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
      }
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline.extent })
      }
    })
  }


  /**
   * 绘制矩形（以较快的方式）
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static 'rectangle-faster' (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperations.#removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = screenToMapPoint(event)
    })
    DrawOperations.#removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = screenToMapPoint(event)
      const polyline = pointsToPolyline([startPoint, endPoint])
      drawTool.fire('draw-end', { geometry: polyline.extent })
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const polyline = pointsToPolyline([startPoint, endPoint])
        drawTool.fire('draw-moving', { geometry: polyline.extent })
      }
    })
  }

  /**
   * 绘制圆
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static circle (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.click = drawTool.view.on('click', event => {
      if (event.button !== 0) {
        return
      }
      if (drawing) { // 绘制完成
        drawing = false
        const endPoint = event.mapPoint
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-end', { geometry: circle })
      } else { // 绘制第一个起始端点
        drawing = true
        startPoint = event.mapPoint
      }
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-moving', { geometry: circle })
      }
    })
  }

  /**
   * 绘制圆（以较快的方式）
   * @param {import('./drawtool').DrawTool} drawTool 绘制工具对象
   */
  static 'circle-faster' (drawTool) {
    let drawing = false
    let startPoint = null
    DrawOperations.#removed.drag = drawTool.view.on('drag', event => {
      event.stopPropagation()
    })
    DrawOperations.#removed['pointer-down'] = drawTool.view.on('pointer-down', event => {
      if (event.button !== 0) {
        return
      }
      drawing = true
      startPoint = screenToMapPoint(event)
    })
    DrawOperations.#removed['pointer-up'] = drawTool.view.on('pointer-up', event => {
      if (event.button !== 0) {
        return
      }
      drawing = false
      const endPoint = screenToMapPoint(event)
      const radius = endPoint.distance(startPoint)
      const circle = new esri.geometry.Circle({
        center: startPoint, radius
      })
      drawTool.fire('draw-end', { geometry: circle })
    })
    DrawOperations.#removed['pointer-move'] = drawTool.view.on('pointer-move', event => {
      if (drawing) {
        const endPoint = screenToMapPoint(event)
        const radius = endPoint.distance(startPoint)
        const circle = new esri.geometry.Circle({
          center: startPoint, radius
        })
        drawTool.fire('draw-moving', { geometry: circle })
      }
    })
  }

  // ______________________________________________________________________
  //#endregion
}
