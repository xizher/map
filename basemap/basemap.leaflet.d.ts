import { $Map } from '../mapinit/mapinit.leaflet';

/** 底图项 */
interface BasemapItem {
  /** 底图项的Key值（唯一标识） */
  key: number | string
  /** 底图项的别名 */
  alias: string
  /** 底图项名称 */
  name: string
  /** 底图项类型 */
  type: 'TileLayer'
  /** 底图项服务地址 */
  url: string
}

/** 地图的底图控制器实例配置项 */
interface BasemapOptions {
  /** 底图可见性 */
  visible: boolean
  /** 当前激活的底图项的Key值 */
  activedKey: number | string
  /** 可选的底图项 */
  layers: Array<BasemapItem>
}

/** 地图的底图控制器 */
export declare class Basemap {

  /**
   * 构造函数
   * @param map leaflet地图对象
   * @param options 地图控制器配置项
   */
  constructor (map: $Map, options: BasemapOptions)

  /**
   * 根据key值切换对应的底图项
   * @param key 底图的key值
   */
  setBasemap (key: number | string) : void

  /** 清空底图项 */
  clearBasemap () : void

  /**
   * 设置底图的可见性（保留底图项的key值）
   * @param visible 底图的可见性
   */
  setVisible (visible: boolean) : void
}