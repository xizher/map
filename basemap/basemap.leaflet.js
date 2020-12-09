import { ref, watch } from 'vue'
import $L from 'leaflet'

const _map = Symbol('map')
const _layerGroup = Symbol('layerGroup')
const _basemapItems = Symbol('basemapItems')
const _activedKey = Symbol('activedKey')
const _visible = Symbol('visible')
const _tempActivedKey = Symbol('tempActivedKey')
const _options = Symbol('options')


/**
 * leaflet 地图控制类
 */
export class Basemap {

  /**
   * @param {import('../mapinit/mapinit.leaflet').$Map} map leaflet地图对象
   * @param {Object} options 配置项
   * @param {boolean} options.visible 底图可见性
   * @param {number} options.activedKey 当前激活的底图项的Key值
   * @param {Array} options.layers 可选的底图项
   */
  constructor (map, options) {

    //#region 私有方法（伪）
    /**
     * leaflet地图对象
     * @type {import('../mapinit/mapinit.leaflet').$Map}
     */
    this[_map] = map

    /** 底图配置项 */
    this[_options] = options

    /** 底图图层组 */
    this[_layerGroup] = new $L.LayerGroup().addTo(this[_map])

    /**
     * 底图图层
     * @type {Array<{
     *  layer: $L.Layer
     *  name: string
     *  type: string
     *  alias: string
     *  key: string
     * }>}
     */
    this[_basemapItems] = []

    /** 当前激活的底图项的Key值 */
    this[_activedKey] = ref(-1)

    /** 底图可见性 */
    this[_visible] = ref(true)
    this[_tempActivedKey] = -1 // 底图激活项Key值缓存
    //#endregion

    //#region 初始化
    const init = async () => {

      // 监听_activedKey值变化，并根据变化值更新底图
      watch(this[_activedKey], val => {
        this[_layerGroup].clearLayers()
        if (val !== -1) {
          const index = this[_basemapItems].findIndex(item => item.key === val)
          this[_basemapItems][index].layer.addTo(this[_layerGroup])
        }
      })

      // 监听_visible变化以更新底图的可见性
      watch(this[_visible], val => {
        if (val) {
          this[_activedKey].value = this[_tempActivedKey]
        } else {
          this[_tempActivedKey] = this[_activedKey].value
          this[_activedKey].value = -1
        }
      })

      // 初始化底图服务
      const { layers } = options
      for (let i = 0; i < layers.length ?? 0; i++) {
        const lyr = layers[i]
        if (lyr.type === 'tileLayer') {
          this[_basemapItems].push({
            // layer: await createTileLayer(lyr.url, lyr.options),
            layer: await $L.tileLayer(lyr.url, lyr.options || {}),
            ...lyr,
          })
        }
      }
      this[_activedKey].value = options.activedKey
    }
    init()
    //#endregion
  }

  setBasemap (key) {
    this[_activedKey].value = key
  }

  clearBasemap () {
    this[_activedKey].value = -1
  }

  setVisible (visible) {
    this[_visible].value = visible
  }

}
