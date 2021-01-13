import ArcGISMap from 'esri/Map'
import MapView from 'esri/views/MapView'
import Geometry from 'esri/geometry/Geometry'
import { ReactiveEffect, Ref } from 'vue'
import { Basemap } from '../basemap/basemap'
import { Hawkeye } from '../hawkeye/hawkeye'
import { MapCursor } from '../mapcursor/mapcursor'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'
import { MapTools } from '../maptools/maptools'
import { LayerOperation } from '../layeroperation/layeroperation'

export class $Map extends ArcGISMap {
  owner: WebMap
}

export class $View extends MapView {
  owner: WebMap
  homeExtent: Geometry
}

export class WebMap {
  /**
   * 构造函数
   * @param divId 地图容器Dom结点Id
   * @param options 配置项
   */
  constructor (divId: string, options: Object)

  /** 地图对象 */
  get map () : $Map

  /** 视图对象 */
  get view () : $View

  /** 地图鼠标样式控制对象 */
  get mapCursor () : MapCursor

  /** 底图控制对象 */
  get basemap () : Basemap

  /** 地图元素控制对象 */
  get mapElementDisplay () : MapElementDisplay

  /** 鹰眼对象 */
  get hawkeye () : Hawkeye
  
  /** 地图工具对象 */
  get mapTools () : MapTools

  /** 图层管理对象 */
  get layerOperation () : LayerOperation

  /**
   * 地图状态钩子
   */
  useHooks () : {
    loaded: Ref<boolean>
    cursor: Ref<string>
    basemapSelectedKey: Ref<number>
    activedMapToolKey: Ref<string>
    pointerLocation: ReactiveEffect<{
      lon: number
      lat: number
      x: number
      y: number
      lonInfo: string
      latInfo: string
      xInfo: string
      yInfo: string
    }>
    selectedThemeUid: Ref<number>
  }
}