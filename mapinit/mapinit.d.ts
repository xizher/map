import ArcGISMap from 'esri/Map'
import { ReactiveEffect, Ref } from 'vue'

export class $Map extends ArcGISMap {
  owner: WebMap
}

export class WebMap {
  /**
   * 构造函数
   * @param divId 地图容器Dom结点Id
   * @param options 配置项
   */
  constructor (divId: string, options: Object)

  /**
   * 地图状态钩子
   */
  useHooks () : {
    loaded: Ref<boolean>
    mouseLocation: ReactiveEffect<{
      lon: number
      lat: number
      x: number
      y: number
    }>
  }
}