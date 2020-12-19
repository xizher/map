import $L from 'leaflet'
import { EventManager } from '../../ext/customevent'

export class Layer extends EventManager {

  #visible = true
  /** @type {$L.LayerGroup} */
  #baseGroup = null
  /** @type {$L.LayerGroup} */
  #layerGroup = null
  /** @type {$L.Layer} */
  #layer = null

  /** @param {$L.Layer} layer */
  constructor (layer) {
    super()

    this.#baseGroup = new $L.LayerGroup()
    this.#layerGroup = new $L.LayerGroup().addTo(this.#baseGroup)
    this.#layer = layer.addTo(this.#layerGroup)

    // this._visible = this.#visible
    // this._baseGroup = this.#baseGroup
  }

  setVisible (visible) {
    this.fire('visible-changed', { visible })
    this.#visible = visible
    this.#baseGroup.clearLayers()
    if (visible) {
      this.#baseGroup.addLayer(this.#layerGroup)
    } else {
      this.#baseGroup.removeLayer(this.#layerGroup)
    }
    return this
  }

  getVisible () {
    return this.#visible
  }

  getSourceLayer () {
    return this.#layer
  }

  addTo (map) {
    if (map instanceof Layer && map.getSourceLayer() instanceof $L.LayerGroup) {
      this.#baseGroup.addTo(map.getSourceLayer())
    } else {
      this.#baseGroup.addTo(map)
    }
    return this
  }

  removeFrom (map) {
    this.#baseGroup.removeFrom(map)
    return this
  }

}
