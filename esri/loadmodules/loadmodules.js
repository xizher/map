import { loadModules } from 'esri-loader'
import { apiConfig } from '../../../config/app.conf'

const modules = [
  'esri/config',
  'esri/Map',
  'esri/views/MapView',
  'esri/views/SceneView',
  'esri/layers/WebTileLayer',
  'esri/layers/ImageryLayer',
  'esri/layers/GroupLayer',
  'esri/layers/GraphicsLayer',
  'esri/layers/FeatureLayer',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/symbols/SimpleLineSymbol',
  'esri/symbols/SimpleFillSymbol',
  'esri/geometry/Point',
  'esri/geometry/Polyline',
  'esri/geometry/Polygon',
  'esri/geometry/Circle',
  'esri/geometry/Extent',
  'esri/widgets/Swipe',
  'esri/core/watchUtils',
]

export const esri = {}

/**
 * 初始化esri模块
 * @param {Array<any>} classes esri模块
 */
function initEsriClasses (classes) {
  modules.forEach((item, index) => {
    regNamespace(item, classes[index])
  })
}

/**
 * 命名空间注册
 * @param {string} mouduleStr esri模块路由字符串
 */
function regNamespace (mouduleStr, classObj) {
  const arr = mouduleStr.split('/')
  let namespace = esri
  for (let i = 1; i < arr.length; i++) {
    if (typeof namespace[arr[i]] === 'undefined') {
      i === arr.length - 1 ? namespace[arr[i]] = classObj : namespace[arr[i]] = {}
    }
    namespace = namespace[arr[i]]
  }
}

export function loadEsriModules () {
  return new Promise((resolve, reject) => {
    loadModules(modules, apiConfig.arcgisJsApiOptions)
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
