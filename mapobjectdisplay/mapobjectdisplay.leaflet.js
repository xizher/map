import $L from 'leaflet'
import { cloneLayer } from '../maputils/maputils.leaflet'

export class MapObjectDisplay {

  /** @type {import('../mapinit/mapinit.leaflet').$Map} */
  #map = null // 地图对象

  /** @type {$L.LayerGroup} */
  #layerGroup = null // 地图要素显示图层组

  /** @type {$L.LayerGroup} */
  #graphicGroup = null // 普通图形图层组

  /** @type {$L.LayerGroup} */
  #highlightGroup = null // 高亮图形图层组

  /** @type {$L.LayerGroup} */
  #tempGraphicGroup = null // 过渡图形图层组（如绘制过程中的图形状态示意）

  constructor (map) {

    this.#map = map
    this.#layerGroup = new $L.LayerGroup().addTo(this.#map)
    this.#graphicGroup = new $L.LayerGroup().addTo(this.#layerGroup)
    this.#highlightGroup = new $L.LayerGroup().addTo(this.#layerGroup)
    this.#tempGraphicGroup = new $L.LayerGroup().addTo(this.#layerGroup)

  }

  //#region 公有方法
  setTempGraphic (path) {
    this.clearTempGraphic()
    path.addTo(this.#tempGraphicGroup)
  }

  clearTempGraphic () {
    this.#tempGraphicGroup.clearLayers()
  }

  /**
   * 添加普通图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  addGraphic (path) {
    Array.isArray(path)
      ? path.forEach(p => p.addTo(this.#graphicGroup))
      : path.addTo(this.#graphicGroup)
  }

  /**
   * 设置普通图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  setGraphic (path) {
    this.clearGraphics()
    this.addGraphic(path)
  }

  /**
   * 移除指定的普通图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  removeGraphic (path) {
    if (path) {
      Array.isArray(path)
        ? path.forEach(p => this.#graphicGroup.removeLayer(p))
        : this.#graphicGroup.removeLayer(path)
    } else {
      this.clearGraphics()
    }
  }

  /** 清除所有普通图形 */
  clearGraphics () {
    this.#graphicGroup.clearLayers()
  }

  /**
   * 添加高亮图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  addHighlight (path) {
    Array.isArray(path)
      ? path.forEach(p => p.addTo(this.#highlightGroup))
      : path.addTo(this.#highlightGroup)
  }

  /**
   * 设置高亮图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  setHighlight (path) {
    this.clearHighlight()
    this.addHighlight(path)
  }

  /**
   * 移除指定的高亮图形
   * @param {$L.Path | Array<$L.Path>} path
   */
  removeHighlight (path) {
    if (path) {
      Array.isArray(path)
        ? path.forEach(p => this.#highlightGroup.removeLayer(p))
        : this.#highlightGroup.removeLayer(path)
    } else {
      this.clearHighlight()
    }
  }

  /** 清空高亮图形 */
  clearHighlight () {
    this.#highlightGroup.clearLayers()
  }

  /** 清除所有图形 */
  clear () {
    this.#tempGraphicGroup.clearLayers()
    this.#graphicGroup.clearLayers()
    this.#highlightGroup.clearLayers()
  }

  /**
   * 解析成高亮样式的leaflet Path对象
   * @param {$L.Path | Array<$L.Path>} path
   * @param {$L.PathOptions} options
   */
  parseHighlightGraphic (path, options = {}) {
    const newPath = cloneLayer(path)
    /**
     * @type {$L.PathOptions}
     */
    const pathOptions = {
      color: '#00ffff',
      fillColor: '#00ffff',
      radius: 8
    }
    if (path instanceof $L.CircleMarker) {
      pathOptions.fillOpacity = 1
    }
    Object.assign(pathOptions, options)
    Array.isArray(newPath)
      ? newPath.forEach(p => p.setStyle(pathOptions))
      : newPath.setStyle(pathOptions)
    return newPath
  }

  /**
   * 解析成特定样式的leaflet Path对象
   * @param {$L.Path | Array<$L.Path>} path
   * @param {$L.PathOptions} options
   */
  parseGraphic (path, options = {}) {
    const newPath = cloneLayer(path)
    const pathOptions = {
      radius: 4,
    }
    if (path instanceof $L.CircleMarker) {
      pathOptions.fillOpacity = 1
    }
    Object.assign(pathOptions, options)
    Array.isArray(path)
      ? newPath.forEach(p => p.setStyle(pathOptions))
      : newPath.setStyle(pathOptions)
    return newPath
  }
  //#endregion
}
