import { esri } from '../loadmodules/loadmodules'

export class Basemap {

  //#region 私有变量

  /** 地图对象
   * @type {import('../mapinit/mapinit').$Map}
   */
  #map = null

  /** 可选的底图图层项
   * @type {Array<{ layer: import('esri/layers/Layer'), name: string, type: string, alias: string }>}
   */
  #basemapItems = {}

  /** 配置信息
   * @type {{visible: boolean, layers: Array<{ key: number, alias: string, name: string, type: string, options: Object }>, selectedKey: number}}
   */
  #options = {}

  // 白盒测试
  __test__ () {
    this._map = this.#map
    this._basemapItems = this.#basemapItems
    this._options = this.#options
  }

  //#endregion

  //#region 私有方法

  /** 初始化 */
  #init () {
    this.#options.layers.forEach(lyr => {
      if (lyr.type === 'webTileLayer') {
        const layer = new esri.layers.WebTileLayer(lyr.options)
        this.#basemapItems[lyr.key] = { layer, ...lyr }
      }
    })
    this.setBasemap (this.#options.selectedKey)
    this.setVisible (this.#options.visible)
    return this
  }

  //#endregion

  constructor (map, options) {
    this.#map = map
    this.#options = options
    this.#init()
  }

  //#region 公有方法

  /**
   * 切换底图项
   * @param {number} key 底图项key值
   * @returns {Basemap} this
   */
  setBasemap (key) {
    this.setVisible (true)
    if (this.#basemapItems[key]) {
      this.#map.basemap = {
        baseLayers: [
          this.#basemapItems[key].layer
        ]
      }
    }
    return this
  }

  /**
   * 设置底图可见性
   * @param {boolean} visible 可见性
   * @returns {Basemap} this
   */
  setVisible (visible) {
    for (const key in this.#basemapItems) {
      const item = this.#basemapItems[key]
      item.layer.visible = visible
    }
    return this
  }

  //#endregion

}
