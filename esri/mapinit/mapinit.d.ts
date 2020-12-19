import ArcGISMap from 'esri/Map'
import MapView from 'esri/views/MapView'
import { ReactiveEffect, Ref } from 'vue'
import { Basemap } from '../basemap/basemap'
import { Hawkeye } from '../hawkeye/hawkeye'
import { MapCursor } from '../mapcursor/mapcursor'
import { MapElementDisplay } from '../mapelementdisplay/mapelementdisplay'

export class $Map extends ArcGISMap {
  owner: WebMap
}

export class $View extends MapView {
  owner: WebMap
}

export class WebMap {
  /**
   * 构造函数
   * @param divId 地图容器Dom结点Id
   * @param options 配置项
   */
  constructor (divId: string, options: Object)

  /** 地图对象 */
  map: $Map

  /** 视图对象 */
  view: $View

  /** 地图鼠标样式控制对象 */
  mapCursor: MapCursor

  /** 底图控制对象 */
  basemap: Basemap

  /** 地图元素控制对象 */
  mapElementDisplay: MapElementDisplay

  /** 鹰眼对象 */
  hawkeye: Hawkeye

  /**
   * 地图状态钩子
   */
  useHooks () : {
    loaded: Ref<boolean>
    cursor: Ref<string>
    basemapSelectedKey: Ref<number>
  }
}