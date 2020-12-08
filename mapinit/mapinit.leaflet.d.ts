import $L from 'leaflet'
import { Basemap } from '../basemap/basemap.leaflet'
import { MapCursor } from '../mapcursor/mapcursor.leaflet'
import { MapObjectDisplay } from '../mapobjectdisplay/mapobjectdisplay.leaflet'
import { MapTools } from '../maptools/maptools.leaflet'

export class $Map extends $L.Map {
  owner: WebMap
  //#region 扩展 leaflet Map对象原型 的方法
  $setExtent (path: $L.Polyline | $L.Polygon | $L.Rectangle) : this
  //#endregion
}

export class WebMap {
  /**
   * 构造函数
   * @param divId 地图容器Id
   * @param mapConfig 配置项
   */
  constructor (divId: string, mapConfig: any)

  map: $Map
  basemap: Basemap
  mapCursor: MapCursor
  mapTools: MapTools
  mapObjectDisplay: MapObjectDisplay

}