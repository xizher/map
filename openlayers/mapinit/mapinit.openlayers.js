import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import { fromLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'
import { defaults } from 'ol/control'

export class WebMap {
  constructor (divId, mapConfig) {

    const _divId = divId
    const _mapOptions = Object.assign({
      center: [0, 0],
      zoom: 1,
    }, mapConfig.mapOptions)

    /**
     * openlayers 地图（Map）对象
     */
    this.map = null

    this.initMap = () => {
      return new Map({
        target: _divId,
        layers: mapConfig.basemapLayers.map(lyr => {
          if (lyr.type === 'tileLayer') {
            return new TileLayer({
              source: new XYZ({ url: lyr.url }),
            })
          }
        }),
        controls: defaults({
          zoom: false,
          rotate: false,
          attribution: false
        }),
        view: new View({
          center: fromLonLat(_mapOptions.center),
          zoom: _mapOptions.zoom
        })
      })
    }
  }
}

