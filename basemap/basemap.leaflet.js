import { ref, watch } from 'vue'
import { createTileLayer } from '../maputils/maputils.leaflet'
import $L from 'leaflet'

/**
 * leaflet 地图控制类
 */
export class Basemap {

  /**
   * @param {import('leaflet').Map} map leaflet地图对象
   * @param {Object} options 配置项
   * @param {boolean} options.visible 底图可见性
   * @param {number} options.activedKey 当前激活的底图项的Key值
   * @param {Object} options.layers 可选的底图项
   * @param {number} options.layers.key 底图项的Key值
   * @param {string} options.layers.alias 底图项的别名
   * @param {string} options.layers.name 底图项名称
   * @param {string} options.layers.type 底图项类型
   * @param {string} options.layers.url 底图项服务地址
   */
  constructor (map, options) {

    /**
     * leaflet地图对象
     * @type {import('leaflet').Map}
     */
    const _map = map
    this.getMap = () => _map

    /**
     * 底图图层组
     */
    const _layerGroup = new $L.LayerGroup().addTo(_map)
    this.getLayerGroup = () => this.getLayerGroup

    /**
     * 底图图层
     * @type {Array<{
     *  layer: import('leaflet').Layer
     *  actived: boolean
     *  name: string
     *  type: string
     *  alias: string
     *  key: string
     * }>}
     */
    const _basemapItems = []
    this.getBasemapItems = () => _basemapItems

    /**
     * 当前激活的底图项的Key值
     */
    const _activedKey = ref(-1)
    this.getActivedKey = () => _activedKey.value
    watch(_activedKey, val => { // 监听_activedKey值变化，并根据变化值更新底图
      const index = _basemapItems.findIndex(item => item.key === val)
      _basemapItems.forEach((item, i) => item.actived = i === index)
      _loadBasemap()
    })

    /**
     * 底图可见性
     */
    const _visible = ref(true)
    this.getVisible = () => _visible.value
    let _tempActivedKey = -1 // 底图激活项Key值缓存
    watch(_visible, val => {
      if (val) {
        _activedKey.value = _tempActivedKey
      } else {
        _tempActivedKey = _activedKey.value
        _activedKey.value = -1
      }
    })

    //#region 私有方法
    function _loadBasemap () {
      _basemapItems.forEach(item => {
        item.actived
          ? item.layer.addTo(_layerGroup)
          : item.layer.removeFrom(_layerGroup)
      })
    }
    //#endregion

    //#region 公有方法
    Object.assign(this, {
      setBasemap (key) {
        _activedKey.value = key
      },
      clearBasemap () {
        _activedKey.value = -1
      },
      setVisible (visible) {
        _visible.value = visible
      }
    })
    //#endregion


    const init = async () => {
      const { layers } = options
      for (let i = 0; i < layers.length ?? 0; i++) {
        const lyr = layers[i]
        if (lyr.type === 'tileLayer') {
          _basemapItems.push({
            layer: await createTileLayer(lyr.url, lyr.options),
            actived: false,
            ...lyr,
          })
        }
      }
      _activedKey.value = options.activedKey
    }
    init()
  }


}
