import { esri } from '../../../loadmodules/loadmodules'
import { Basetool } from '../../basetool'
import { DrawTool } from '../drawtool/drawtool'

export class ZoomInRect extends DrawTool {

  //#region 私有属性
  // **********************************************************************

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
  constructor (map, view) {
    super(map, view, 'rectangle-faster')

    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    this.drawer.setDrawingStyle({
      color: [0, 0, 0, .2],
      outline: { color: [0, 0, 0, .5] }
    })
  }

  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  onDrawEnd(event) {
    if (super.onDrawEnd(event)) {
      this.drawer.clear()
      this.view.goTo(event.geometry)
      return true
    } else {
      return false
    }
  }

  // ______________________________________________________________________
  //#endregion

}

export class ZoomOutRect extends DrawTool {

  //#region 私有属性
  // **********************************************************************

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
  constructor (map, view) {
    super(map, view, 'rectangle-faster')

    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    this.drawer.setDrawingStyle({
      color: [0, 0, 0, .2],
      outline: { color: [0, 0, 0, .5] }
    })
  }

  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  // IEnvelope pEnvelope = m_pMapC4.TrackRectangle();
  // double dWidth = m_pMapC4.Extent.Width * m_pMapC4.Extent.Width / pEnvelope.Width;
  // double dHeight = m_pMapC4.Extent.Height * m_pMapC4.Extent.Height / pEnvelope.Height;
  // double dXmin = m_pMapC4.Extent.XMin - ((pEnvelope.XMin - m_pMapC4.Extent.XMin) * m_pMapC4.Extent.Width / pEnvelope.Width);
  // double dYmin = m_pMapC4.Extent.YMin - ((pEnvelope.YMin - m_pMapC4.Extent.YMin) * m_pMapC4.Extent.Height / pEnvelope.Height);
  // double dXmax = dXmin + dWidth;
  // double dYmax = dYmin + dHeight;
  // pEnvelope.PutCoords(dXmin, dYmin, dXmax, dYmax);
  // m_pMapC4.Extent = pEnvelope;

  onDrawEnd(event) {
    if (super.onDrawEnd(event)) {
      this.drawer.clear()
      if (this.view.zoom > this.view.constraints.minZoom) {
        const width = this.view.extent.width * this.view.extent.width / event.geometry.width
        const hegiht = this.view.extent.height * this.view.extent.height / event.geometry.height
        const xmin = this.view.extent.xmin - ((event.geometry.xmin - this.view.extent.xmin) * this.view.extent.width / event.geometry.width)
        const ymin = this.view.extent.ymin - ((event.geometry.ymin - this.view.extent.ymin) * this.view.extent.height / event.geometry.height)
        const xmax = xmin + width.$abs()
        const ymax = ymin + hegiht.$abs()
        const extent = new esri.geometry.Extent({
          xmin, ymin, xmax, ymax,
          spatialReference: event.geometry.spatialReference
        })
        this.view.goTo(extent)
      } else {
        console.warn('已到达最小缩放等级')
      }
      return true
    } else {
      return false
    }
  }

  // ______________________________________________________________________
  //#endregion

}

export class ZoomIn extends Basetool {

  //#region 私有属性
  // **********************************************************************

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
  constructor (map, view) {
    super(map, view, true)

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
  onToolActived(event) {
    if (super.onToolActived(event)) {
      this.view.plusZoom(1)
      return true
    } else {
      return false
    }
  }
  // ______________________________________________________________________
  //#endregion

}

export class ZoomOut extends Basetool {

  //#region 私有属性
  // **********************************************************************

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
  constructor (map, view) {
    super(map, view, true)

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
  onToolActived(event) {
    if (super.onToolActived(event)) {
      this.view.plusZoom(-1)
      return true
    } else {
      return false
    }
  }
  // ______________________________________________________________________
  //#endregion

}
