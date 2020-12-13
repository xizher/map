import { reactive, ref } from 'vue'

export class WebMap {

  /**
   * @type {import('esri/Map')}
   */
  #map = null

  /**
   * @type {import('esri/views/MapView')}
   */
  #view = null

  #divId = ''

  #options = {
    viewOptions: {
      center: [-118, 34],
      zoom: 1,
      ui: {
        components: [
          'zoom',
          'compass',
          'attribution',
        ]
      },
      constraints: {
        minZoom: 3
      }
    }
  }

  constructor (divId, options) {
    this.#divId = divId
    Object.assign(this.#options, options)

    const loaded = ref(false)
    const mouseLocation = reactive({
      lon: 0, lat: 0, x: 0, y: 0
    })
    this.useHooks = () => {
      return {
        loaded,
        mouseLocation
      }
    }
  }

  init () {
    const { loaded, mouseLocation } = this.useHooks()

    this.#map = new esri.Map({
      basemap: {
        baseLayers: [new esri.layers.WebTileLayer({
          opacity: 0.5,
          urlTemplate: 'http://192.168.65.130:6080/arcgis/rest/services/GLC30/WorldLand/MapServer/tile/{level}/{row}/{col}'
        })]
      }
    })

    this.#view = new esri.views.MapView({
      container: this.#divId,
      map: this.#map,
      ...this.#options.viewOptions
    })

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
  }

}
