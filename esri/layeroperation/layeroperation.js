import { deepExtent } from '../../../ext/js.utils'
import { esri } from '../loadmodules/loadmodules'

export class LayerOperation {
  //#region 私有属性
  // **********************************************************************

  /**
   * 图层容器
   * @type {import('esri/layers/GroupLayer')}
   */
  #layerGroup = null

  /**
   * 地图对象
   * @type {import('../mapinit/mapinit').$Map}
   */
  #map = null

  /**
   * 视图对象
   * @type {import('../mapinit/mapinit').$View}
   */
  #view = null

  /**
   * 视图对象
   * @type {Array<{
   *  targetLayer: import('esri/layers/Layer'),
   *  name: string
   *  description: string
   *  theme: string
   *  types: string
   *  options: Object
   * }>}
   */
  #layers = []

  /**
   * 配置项
   */
  #options = {}

  // ______________________________________________________________________
  //#endregion


  //#region getter only
  // **********************************************************************
  get layers () { return this.#layers }
  // ______________________________________________________________________
  //#endregion

  //#region getter and setter
  // **********************************************************************

  // ______________________________________________________________________
  //#endregion

  //#region 构造函数
  // **********************************************************************
  constructor (map, view, options) {
    this.#map = map
    this.#view = view
    deepExtent(true, this.#options, options)
    this.#init()
  }
  // ______________________________________________________________________
  //#endregion

  //#region 私有方法
  // **********************************************************************

  /** 初始化 */
  #init () {
    this.#layerGroup = new esri.layers.GroupLayer()
    this.#map.add(this.#layerGroup)
    this.#options.treeItems.forEach(item => {
      this.#loadLayer (item)
    })
  }

  #loadLayer (treeItem) {
    const { target, children, title, fromThemeUid } = treeItem
    if (target) {
      const { types, options } = target
      let layer = null
      if (types.includes('ImageryLayer')) {
        layer = new esri.layers.ImageryLayer(options)
        if (types.includes('GlobeLand30')) {
          layer.renderer = {
            type: 'unique-value',
            field: 'Value',
            defaultSymbol: { type: 'simple-fill' },
            uniqueValueInfos: this.#options.globeLand30Colormap.map(legendItem => ({
              value: legendItem.value,
              symbol: {
                type: 'simple-fill',
                color: legendItem.color
              }
            }))
          }
        }
      } else if (types.includes('FeatureLayer')) {
        layer = new esri.layers.FeatureLayer(options)
      }
      if (layer) {
        this.#layerGroup.add(layer)
        this.#layers.push({
          types, options, fromThemeUid,
          name: title,
          targetLayer: layer
        })
      }
    }
    if (children && Array.isArray(children)) {
      children.forEach(item => {
        this.#loadLayer (item)
      })
    }
  }
  // ______________________________________________________________________
  //#endregion


  //#region 公有方法
  // **********************************************************************
  /**
   * 通过图层名寻找图层对象
   * @param {string} name 图层名
   * @returns {import('esri/layers/Layer') | null}
   */
  findLayerByName (name) {
    const item = this.#layers.$findItem('name', name)
    if (item && item.targetLayer) {
      return item.targetLayer
    }
    return null
  }

  cloneLayer (layerName) {
    const item = this.#layers.$findItem('name', layerName)
    const { types, options } = item
    let layer = null
    if (types.includes('ImageryLayer')) {
      layer = new esri.layers.ImageryLayer(options)
      if (types.includes('GlobeLand30')) {
        layer.renderer = {
          type: 'unique-value',
          field: 'Value',
          defaultSymbol: { type: 'simple-fill' },
          uniqueValueInfos: this.#options.globeLand30Colormap.map(legendItem => ({
            value: legendItem.value,
            symbol: {
              type: 'simple-fill',
              color: legendItem.color
            }
          }))
        }
      }
    }
    return layer
  }

  // ______________________________________________________________________
  //#endregion
}
