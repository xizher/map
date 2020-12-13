export * from './mapinit/mapinit'

import { loadModules } from 'esri-loader'
import { apiConfig } from '../config/app.conf'

const { arcgisJsApiOptions } = apiConfig

const modules = [
  'esri/Map',
  'esri/views/MapView',
  'esri/layers/WebTileLayer',
]

function initEsriClasses (classes) {
  const [
    ArcGISMap,
    MapView,
    WebTileLayer
  ] = classes
  window.esri = {
    Map: ArcGISMap,
    views: {
      MapView
    },
    layers: {
      WebTileLayer
    }
  }
}

export function loadArcGISJsApiModules () {
  return new Promise((resolve, reject) => {
    loadModules(modules, arcgisJsApiOptions)
      .then(classes => {
        initEsriClasses(classes)
        resolve()
      })
      .catch(err => {
        console.warn(err)
        reject(err)
      })
  })

}
