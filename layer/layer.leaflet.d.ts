import $L from 'leaflet'
import { EventManager } from '../../ext/customevent'

/**
 * 图层类
 * @extends EventManager
 */
export declare class Layer extends EventManager {

  /** 图层类：构造函数 
   * @param layer leaflet 原生 Layer对象 
   */
  constructor (layer: $L.Layer)

  /** 设置图层可见性 
   * @param visible 图层可见性 
   */
  setVisible (visible: boolean) : this

  /** 获取图层可见性 */
  getVisible () : boolean

  /** 获取图层对象的leaflet 原生Layer对象 */
  getSourceLayer () : $L.Layer

  /** 添加到
   * @param map 添加到的载体
   */
  addTo (map: $L.LayerGroup | $L.Map | Layer) : this
  
  /** 移除自
   * @param map 移除自的载体
   */
  removeFrom (map: $L.LayerGroup | $L.Map | Layer) : this

  /** 绑定事件
   * @param name 事件名称
   * @param fn 事件处理函数
   * @param scope 事件处理函数上下文
   * @returns 事件处理函数
   */
  on (name: 'visible-changed', fn: (events: { name: string, origin: Object }) => void, scope?: Object): Function
}
