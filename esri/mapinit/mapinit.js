import { ref, watch } from 'vue'
import { Basemap } from '../basemap/basemap'
import { MapCursor } from '../mapcursor/mapcursor'
import { deepExtent } from '../../../ext/js.utils'
import { esri } from '../loadmodules/loadmodules'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'
import { Hawkeye } from '../hawkeye/hawkeye'

export class WebMap {

  //#region 私有属性
  // **********************************************************************

  /** 地图对象
   * @type {import('esri/Map')}
   */
  #map = null

  /** 视图对象
   * @type {import('esri/views/MapView')}
   */
  #view = null

  /** 地图容器Dom结点Id */
  #divId = ''

  /** 地图鼠标样式控制类
   * @type {MapCursor}
   */
  #mapCursor = null

  /** 底图控制类
   * @type {Basemap}
   */
  #basemap = null

  /** 图元控制类
   * @type {MapElementDisplay}
   */
  #mapElementDisplay = null

  /** 鹰眼
   * @type {Hawkeye}
   */
  #hawkeye = null

  /** 配置项 */
  #options = {
    viewOptions: {
      center: [0, 0],
      zoom: 1,
      ui: {
        components: [
          /* 'zoom', 'compass', 'attribution' */
        ]
      },
      constraints: {
        rotationEnabled: false
      }
    }
  }

  /**
   * 钩子
   * @type {{
   *  loaded: import('vue').Ref<boolean>
   *  cursor: import('vue').Ref<string>
   *  basemapSelectedKey: import('vue').Ref<number>
   * }}
   */
  #hooks = {}

  // ______________________________________________________________________
  //#endregion

  //#region noly getter
  // **********************************************************************
  get map () { return this.#map }
  get view () { return this.#view }
  get mapCursor () { return this.#mapCursor }
  get basemap () { return this.#basemap }
  get mapElementDisplay () { return this.#mapElementDisplay }
  get hawkeye () { return this.#hawkeye }
  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (divId, options) {
    this.#divId = divId
    deepExtent(true, this.#options, options)
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  #init () {
    Object.assign(this.#hooks, {
      loaded: ref(false)
    })
  }

  #loadMap () {
    this.#map = new esri.Map()
    this.#map.owner = this
    const layer = new esri.layers.ImageryLayer(this.#options.layersServer['经度地带性分异规律演示图层'])
    layer.renderer = {
      type: 'unique-value',
      field: 'Value',
      defaultSymbol: { type: 'simple-fill' },
      uniqueValueInfos: this.#options.globeLand30Colormap.map(item => ({
        value: item.value,
        symbol: {
          type: 'simple-fill',
          color: item.color
        }
      }))
    }
    this.#map.add(layer)
  }

  #loadMapView () {
    this.#view = new esri.views.MapView({
      container: this.#divId,
      map: this.#map,
      ...this.#options.viewOptions
    })
    this.#view.owner = this
  }

  #loadMapCursor () {
    this.#mapCursor = new MapCursor(this.#divId)
    Object.assign(this.#hooks, {
      cursor: ref(this.#mapCursor.cursor)
    })
    watch(this.#hooks.cursor, val => this.#mapCursor.cursor = val)
  }

  #loadBasemap () {
    this.#basemap = new Basemap(this.#map, this.#options.basemapOptions)
    Object.assign(this.#hooks, {
      basemapSelectedKey: ref(this.#basemap.selectedKey)
    })
    watch(this.#hooks.basemapSelectedKey, val => this.#basemap.selectedKey = val)
  }

  // ______________________________________________________________________
  //#endregion



  //#region 公有方法
  // **********************************************************************

  /** 加载 */
  load () {
    this.#loadMap()
    this.#loadMapView()

    this.#loadMapCursor()
    this.#loadBasemap()
    this.#mapElementDisplay = new MapElementDisplay(this.#map, this.#view)
    this.#hawkeye = new Hawkeye(this.#view, this.#options.hawkeyeOptions)

    this.#view.when(() => {
      const { loaded } = this.#hooks
      loaded.value = true
    }, err => console.warn(err))
  }

  useHooks () {
    return this.#hooks
  }

  // ______________________________________________________________________
  //#endregion

}
