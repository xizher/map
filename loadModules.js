import { loadModules } from 'esri-loader'
import { apiConfig } from '../config/app.conf'

const { arcgisJsApiOptions } = apiConfig

const modules = [
  'esri/Map',
  'esri/views/MapView',
]

function initEsriClasses (classes) {
  const [
    ArcGISMap,
    MapView,
  ] = classes
  window.esri = {
    Map: ArcGISMap,
    views: {
      MapView
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
