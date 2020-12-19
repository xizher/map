import $L from 'leaflet'
import { EventManager } from '../../../ext/customevent'
import { Layer } from '../../layer/layer.leaflet'

/** leaflet 地图控制类 */
export class Basemap extends EventManager {

  //#region 私有变量

  /** @type {import('../../mapinit/mapinit.leaflet').$Map} */
  #map = null

  #selectedKey = -1 // 当前记过的底图项

  #visible = true // 当前底图图层组是否可见

  /** @type {Array<{ layer: Layer, name: string, type: string, alias: string, key: string }>} */
  #basemapItems = [] // 底图图层

  #options = {} // 配置信息

  /** @type {Layer} */
  #layerGroup = null // 底图图层组
  //#endregion

  /**
   * @param {import('../../mapinit/mapinit.leaflet').$Map} map leaflet地图对象
   * @param {Object} options 配置项
   * @param {boolean} options.visible 底图可见性
   * @param {number} options.activedKey 当前激活的底图项的Key值
   * @param {Array} options.layers 可选的底图项
   */
  constructor (map, options) {
    super()

    this.#map = map
    this.#options = options
    this.#layerGroup = new Layer(new $L.LayerGroup()).addTo(this.#map)
    this.#basemapItems = []

    ;(async () => {

      // 初始化底图服务
      const { layers } = this.#options
      for (let i = 0; i < layers.length ?? 0; i++) {
        const lyr = layers[i]
        if (lyr.type === 'tileLayer') {
          this.#basemapItems.push({
            layer: new Layer(await $L.tileLayer(lyr.url, lyr.options || {})).addTo(this.#layerGroup),
            ...lyr,
          })
        }
      }
      this.clearBasemap()
      this.#selectedKey = this.#options.activedKey
      const index = this.#basemapItems.findIndex(item => item.key === this.#selectedKey)
      this.fire('loaded', { basemapItems: this.#basemapItems, selectedIndex: index })
    })()
  }

  //#region 白盒测试
  _test () {
    this._map = this.#map
    this._basemapItems = this.#basemapItems
    this._layerGroup = this.#layerGroup
    this._options = this.#options
    this._selectedKey = this.#selectedKey
    this._visible = this.#visible
  }
  //#endregion

  setBasemap (key) {
    this.#selectedKey = key
    this.#basemapItems.forEach(item => {
      if (item.key === key) {
        item.layer.setVisible(true)
      } else {
        item.layer.setVisible(false)
      }
    })
  }

  setBasemapByIndex (index) {
    this.#basemapItems.forEach((item, i) => {
      if (i === index) {
        item.layer.setVisible(true)
      } else {
        item.layer.setVisible(false)
      }
    })
  }

  clearBasemap () {
    this.#basemapItems.forEach(item => {
      item.layer.setVisible(false)
    })
  }

  setVisible (visible) {
    this.#visible = visible
    this.#layerGroup.setVisible(visible)
  }

  getBasemapItems () {
    return this.#basemapItems.map(item => ({
      name: item.name,
      key: item.key,
      alias: item.alias
    }))
  }

}
