import $L from 'leaflet'
import { $Map } from '../mapinit/mapinit.leaflet';

/** 地图元素（图元）控制器 */
export declare class MapObjectDisplay {

  /**
   * 构造函数
   * @param map leaflet Map对象
   */
  constructor (map: $Map)

  /**
   * 添加普通图形
   * @param path leaflet Path对象
   */
  addGraphic (path: $L.Path | Array<$L.Path>) : void

  /**
   * 设置普通图形（清空已有普通图形基础上添加）
   * @param path leaflet Path对象
   */
  setGraphic (path: $L.Path | Array<$L.Path>) : void

  /**
   * 移除指定的普通图形
   * @param path leaflet Path对象，未设置则清空所有
   */
  removeGraphic (path?: $L.Path | Array<$L.Path>) : void

  /** 清除所有普通图形 */
  clearGraphics () : void

  /**
   * 添加高亮图形
   * @param path leaflet Path对象
   */
  addHighlight (path: $L.Path | Array<$L.Path>) : void

  /**
   * 设置高亮图形（清空已有高亮图形基础上添加）
   * @param path leaflet Path对象
   */
  setHighlight (path: $L.Path | Array<$L.Path>) : void

  /**
   * 移除指定的高亮图形
   * @param path leaflet Path对象，未设置则清空所有
   */
  removeHighlight (path?: $L.Path | Array<$L.Path>) : void

  /** 清除所有高亮图形 */
  clearHighlight () : void

  /**
   * 设置过渡图形
   * @param path leaflet Path对象
   */
  setTempGraphic (path: $L.Path | Array<$L.Path>) : void
  
  /** 清除所有过渡图形 */
  clearTempGraphic () : void

  /** 清空所有图形，包括普通图形、高亮图形和过渡图形 */
  clear () : void

  /**
   * 解析成高亮样式的leaflet Path对象
   * @param path leaflet Path对象
   * @param options 样式配置，默认值未 {}
   */
  parseHighlightGraphic (path: $L.Path | Array<$L.Path>, options?: $L.PathOptions) : $L.Path | Array<$L.Path>

  /**
   * 解析成特定样式的leaflet Path对象
   * @param path leaflet Path对象
   * @param options 样式配置，默认值未 {}
   */
  parseGraphic (path: $L.Path | Array<$L.Path>, options?: $L.PathOptions) : $L.Path | Array<$L.Path>

}