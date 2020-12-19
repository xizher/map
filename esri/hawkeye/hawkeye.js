import { esri } from '../loadmodules/loadmodules'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'

export class Hawkeye {

  //#region 私有属性
  // **********************************************************************

  /**
   * 关联的目标视图对象
   * @type {import('../mapinit/mapinit').$View}
   */
  #targetView = null

  /**
   * 视图对象
   * @type {import('esri/views/MapView')}
   */
  #view = null

  /**
   * 地图对象
   * @type {import('esri/Map')}
   */
  #map = null

  /**
   * 配置项
   */
  #options = {}

  // ______________________________________________________________________
  //#endregion

  //#region noly getter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (targetView, options) {
    this.#targetView = targetView
    this.#options = options
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************

  load () {
    const { divId, basemapUrl } = this.#options
    const layer = new esri.layers.WebTileLayer({
      urlTemplate: basemapUrl,
      opacity: .8
    })
    this.#map = new esri.Map({
      basemap: {
        baseLayers: [layer]
      }
    })
    this.#view = new esri.views.MapView({
      container: divId,
      map: this.#map,
      ui: { components: [] },
      center: [0, 15],
      constraints: {
        maxZoom: 0,
        rotationEnabled: false,
      }
    })

    this.#view.on('drag', event => {
      event.stopPropagation()
    })

    const mapElementDisplay = new MapElementDisplay(this.#map, this.#view)

    this.#targetView.watch('extent', drawExtent)
    drawExtent (this.#targetView.extent)

    function drawExtent (extent) {
      const graphic = mapElementDisplay.parseGraphics(extent, {
        color: [255, 255, 0, .5]
      })
      mapElementDisplay.setGraphics(graphic)
    }

    return this

  }

  // ______________________________________________________________________
  //#endregion

}
