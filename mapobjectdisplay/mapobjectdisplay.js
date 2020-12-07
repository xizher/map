import $L from 'leaflet'


export class MapObjectDisplay {
  constructor (map) {

    /**
     * leaflet地图对象
     * @type {$L.Map}
     */
    const _map = map

    /**
     * 地图要素显示图层组
     * @type {$L.LayerGroup}
     */
    const _layerGroup = new $L.LayerGroup().addTo(_map)

    /**
     * 普通图形图层组
     * @type {$L.LayerGroup}
     */
    const _graphicGroup = new $L.LayerGroup().addTo(_layerGroup)

    /**
     * 高亮图形图层组
     * @type {$L.LayerGroup}
     */
    const _highlightGroup = new $L.LayerGroup().addTo(_layerGroup)

    Object.assign(this, {
      /**
       * 添加普通图形
       * @param {$L.Path | Array<$L.Path>} path
       */
      addGraphic (path) {
        Array.isArray(path)
          ? path.forEach(p => p.addTo(_graphicGroup))
          : path.addTo(_graphicGroup)
      },

      /**
       * 设置普通图形
       * @param {$L.Path | Array<$L.Path>} path
       */
      setGraphic (path) {
        this.clearGraphic()
        this.addGraphic(path)
      },

      /**
       * 移除指定的普通图形
       * @param {$L.Path | Array<$L.Path>} path
       */
      removeGraphic (path) {
        Array.isArray(path)
          ? path.forEach(p => _graphicGroup.removeLayer(p))
          : _graphicGroup.removeLayer(path)
      },

      /**
       * 清除所有普通图形
       */
      clearGraphics () {
        _graphicGroup.clearLayers()
      },

      /**
       * 设置高亮图形
       * @param {$L.Path | Array<$L.Path>} path
       */
      setHighlight (path) {
        this.clearHighlight()
        Array.isArray(path)
          ? path.forEach(p => p.addTo(_highlightGroup))
          : path.addTo(_highlightGroup)
      },

      /**
       * 清空高亮图形
       */
      clearHighlight () {
        _highlightGroup.clearLayers()
      },

      /**
       * 清除所有图形
       */
      clear () {
        _graphicGroup.clearLayers()
        _highlightGroup.clearLayers()
      },

      /**
       *
       * @param {$L.Path | Array<$L.Path>} path
       * @param {$L.PathOptions} options
       */
      parseHighlightGraphic (path, options = {}) {
        /**
         * @type {$L.PathOptions}
         */
        const pathOptions = {
          color: '#00ffff',
          fillColor: '#00ffff',
          fillOpacity: 1,
          radius: 8
        }
        Object.assign(pathOptions, options)
        Array.isArray(path)
          ? path.forEach(p => p.setStyle(pathOptions))
          : path.setStyle(pathOptions)
        return path
      },

      /**
       *
       * @param {$L.Path | Array<$L.Path>} path
       * @param {$L.PathOptions} options
       */
      parseGraphic (path, options = {}) {
        Array.isArray(path)
          ? path.forEach(p => p.setStyle(options))
          : path.setStyle(options)
        return path
      }
    })
  }
}
