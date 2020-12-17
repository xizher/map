import { reactive, ref, watch } from 'vue'
import { Basemap } from '../basemap/basemap'
import { MapCursor } from '../mapcursor/mapcursor'
import { deepExtent } from '../../ext/js.utils'
import { esri } from '../loadmodules/loadmodules'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'

export class WebMap {

  //#region 私有属性

  /** 地图对象
   * @type {import('esri/Map')}
   */
  #map = null
  get map () { return this.#map }

  /** 视图对象
   * @type {import('esri/views/MapView')}
   */
  #view = null
  get view () { return this.#view }

  /** 地图容器Dom结点Id */
  #divId = ''

  /** 地图鼠标样式控制类
   * @type {MapCursor}
   */
  #mapCursor = null
  get mapCursor () { return this.#mapCursor }

  /** 底图控制类
   * @type {Basemap}
   */
  #basemap = null
  get basemap () { return this.#basemap }

  /** 图元控制类
   * @type {MapElementDisplay}
   */
  #mapElementDisplay = null
  get mapElementDisplay () { return this.#mapElementDisplay }

  /** 配置项 */
  #options = {
    viewOptions: {
      center: [0, 0],
      zoom: 1,
      ui: {
        components: [
          'zoom',
          'compass',
          'attribution',
        ]
      },
      constraints: {
        rotationEnabled: false
      }
    }
  }

  //#endregion

  //#region 私有方法

  #init () {
    const loaded = ref(false)
    const mouseLocation = reactive({
      lon: 0, lat: 0, x: 0, y: 0
    })
    const cursor = ref('')
    this.useHooks = () => {
      return {
        loaded,
        mouseLocation,
        cursor
      }
    }
  }

  #hooksInit() {
    const { cursor } = this.useHooks()
    watch(cursor, val => {
      this.#mapCursor.setCursor(val)
    })
    cursor.value = this.#mapCursor.cursor
  }

  //#endregion

  constructor (divId, options) {
    this.#divId = divId
    deepExtent(true, this.#options, options)
    this.#init()
  }


  //#region 公有方法

  /** 加载 */
  load () {
    const { loaded, mouseLocation } = this.useHooks()
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

    this.#view = new esri.views.MapView({
      container: this.#divId,
      map: this.#map,
      ...this.#options.viewOptions
    })
    this.#view.owner = this

    this.#view.when(() => {
      loaded.value = true

      this.#view.on('pointer-move', event => {
        const { longitude, latitude, x, y } = this.#view.toMap(event)
        mouseLocation.lon = longitude
        mouseLocation.lat = latitude
        mouseLocation.x = x
        mouseLocation.y = y
      })
    }, err => console.warn(err))

    this.#mapCursor = new MapCursor(this.#divId)
    this.#basemap = new Basemap(this.#map, this.#options.basemapOptions)
    this.#mapElementDisplay = new MapElementDisplay(this.#map, this.#view)
    const test = {
      type: 'polygon',
      rings: [[ // first ring
        [0, 30],
        [30, 30],
        [30, 0],
        [0, 30] // same as first vertex
      ]]
    }
    const g = this.#mapElementDisplay.parseGraphics(test)
    this.#mapElementDisplay.addTempGraphics(g)

    this.#hooksInit()
  }

  //#endregion

}
