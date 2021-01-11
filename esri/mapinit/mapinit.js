import { computed, reactive, ref, watch } from 'vue'
import { Basemap } from '../basemap/basemap'
import { MapCursor } from '../mapcursor/mapcursor'
import { deepExtent } from '../../../ext/js.utils'
import { esri } from '../loadmodules/loadmodules'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'
import { Hawkeye } from '../hawkeye/hawkeye'
import { MapTools } from '../maptools/maptools'
import { initUtils } from '../esri.utils/esri.utils'
import { LayerOperation } from '../layeroperation/layeroperation'

export class WebMap {

  //#region 私有属性
  // **********************************************************************

  /** 地图对象
   * @type {import('./mapinit').$Map}
   */
  #map = null

  /** 视图对象
   * @type {import('./mapinit').$View}
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

  /**
   * 地图工具集
   * @type {MapTools}
   */
  #mapTools = null

  /**
   * 图层容器
   * @type {LayerOperation}
   */
  #layerOperation = null

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
   *  activedMapToolKey: import('vue').Ref<string>
   *  pointerLocation: import('vue').ReactiveEffect<{
   *    lon: number
   *    lat: number
   *    x: number
   *    y: number
   *    lonInfo: string
   *    latInfo: string
   *    xInfo: string
   *    yInfo: string
   *  }>
   *  selectedThemeUid: import('vue').Ref<number>
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
  get mapTools () { return this.#mapTools }
  get layerOperation () { return this.#layerOperation }
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
  }

  #loadMapView () {
    this.#view = new esri.views.MapView({
      container: this.#divId,
      map: this.#map,
      ...this.#options.viewOptions
    })
    this.#view.owner = this
    const pointerLocation = reactive({
      lon: 0, lat: 0, x: 0, y: 0,
      lonInfo: computed(() => pointerLocation.lon.toFixed(9)),
      latInfo: computed(() => pointerLocation.lat.toFixed(9)),
      xInfo: computed(() => pointerLocation.x.toFixed(3)),
      yInfo: computed(() => pointerLocation.y.toFixed(3)),
    })
    Object.assign(this.#hooks, {
      pointerLocation,
    })
    this.#view.on('pointer-move', event => {
      const point = this.#view.toMap(event)
      const { x, y, longitude, latitude } = point
      this.#hooks.pointerLocation.x = x
      this.#hooks.pointerLocation.y = y
      this.#hooks.pointerLocation.lon = longitude
      this.#hooks.pointerLocation.lat = latitude
    })
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

  #loadMapTools () {
    this.#mapTools = new MapTools(this.#map, this.#view)
    Object.assign(this.#hooks, {
      activedMapToolKey: ref(this.#mapTools.activedMapToolKey)
    })
    watch(this.#hooks.activedMapToolKey, val => {
      this.#hooks.activedMapToolKey.value = this.#mapTools.setMapTool(val)
    })
  }

  #loadLayerOperation () {
    this.#layerOperation = new LayerOperation(this.#map, this.#view, this.#options.layerOperationOptions)
    Object.assign(this.#hooks, {
      selectedThemeUid: ref(-1)
    })
    watch(this.#hooks.selectedThemeUid, val => {
      /** @type {import('esri/geometry/Extent')} */
      let extent = null
      this.#layerOperation.layers.forEach(lyr => {
        if (val === lyr.fromThemeUid) {
          if (extent) {
            extent.union(lyr.targetLayer.fullExtent)
          } else {
            extent = lyr.targetLayer.fullExtent
          }
          this.#layerOperation.findLayerByName(lyr.name).visible = true
        } else {
          this.#layerOperation.findLayerByName(lyr.name).visible = false
        }
      })
      extent && (this.#view.homeExtent = extent)
      this.#hooks.activedMapToolKey.value = 'zoom-home'
    })
  }

  // ______________________________________________________________________
  //#endregion



  //#region 公有方法
  // **********************************************************************

  /** 加载 */
  load () {
    this.#loadMap()
    this.#loadMapView()
    initUtils(this.#map, this.#view)
    this.#loadMapCursor()
    this.#loadBasemap()
    this.#loadLayerOperation()
    this.#mapElementDisplay = new MapElementDisplay(this.#map, this.#view)
    this.#hawkeye = new Hawkeye(this.#view, this.#options.hawkeyeOptions)
    this.#loadMapTools()

    // this.#view.constraints.geometry = this.#map.basemap.baseLayers.getItemAt(0).fullExtent

    this.#view.when(() => {
      this.#view.homeExtent = this.#view.extent
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
