import $L from 'leaflet'
import { EventManager } from '../../ext/customevent'
import { Layer } from '../layer/layer.leaflet'
import { useAxios } from '../../hooks/useAjax'

/** 操作图层控制类 */
export class OperationLayers extends EventManager {

  /** @type {$L.LayerGroup} */
  #baseGroup = null

  /** @type {Array<Layer>} */
  #layers = []

  constructor (map, options) { // operationLayersOptions
    super()

    this.#baseGroup = new Layer(new $L.LayerGroup()).addTo(map)

    const { doAxios } = useAxios()

    ;(async () => {

      for (let i = 0; i < options.items.length; i++) {
        const item = options.items[i]
        const layerType = item.type
        if (layerType === 'tileLayer') {
          const layer = new Layer(await $L.tileLayer(item.url, item.options || {}))
          layer.addTo(this.#baseGroup)
        } else if (layerType === 'esri.DynamicMapLayer') {
          const layer = new Layer(new $L.esri.DynamicMapLayer(item.options))
          layer.addTo(this.#baseGroup)
        } else if (layerType === 'geojson') {
          const json = await doAxios({ url: item.url, byServerApi: false })
          const layer = new Layer($L.geoJSON(json, item.options || {}))
          layer.addTo(this.#baseGroup)
        }
      }

    })().then(() => {
      this.fire('load', { layers: this.#layers })
    })
  }

}
