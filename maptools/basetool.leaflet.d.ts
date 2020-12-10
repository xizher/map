import { EventManager } from '../../ext/customevent'
import { $Map } from '../mapinit/mapinit.leaflet';
import $L from 'leaflet'

/** 基础工具类 */
export class BaseTool extends EventManager {

  /**
   * 构造函数
   * @param map leaflet Map 对象
   * @param once 是否为一次性工具（一次性工具：工具激活事件完成后执行取消工具激活）
   */
  constructor (map: $Map, once: boolean)

  /** 获得当前工具的激活状态 */
  getActived () : boolean

  /** 获取绑定的 leaflet Map对象 */
  getMap () : $Map

  /** 工具是否为一次性工具 */
  isOnce () : boolean

  /**
   * 激活当前工具
   * @returns 工具对象本身
   */
  acitve () : this

  /** 取消当前工具的激活状态 */
  deactive () : void

  /** 工具被激活时触发的事件 */
  onToolActived () : void

  /** 工具取消激活时触发的事件 */
  onToolDeactive () : void

  /** 工具激活状态下，开始绘制图元触发的事件 */
  onDrawActived (event: { path?: $L.Path }) : void

  /** 工具激活状态下，绘制图元过程的事件 */
  onDrawMoving (event: { path?: $L.Path }) : void

  /** 工具激活状态下，图元绘制完成的事件 */
  onDrawCreated (event: { path?: $L.Path }) : void

  /** 工具激活状态下，执行工具状态清理的事件（状态清理并非取消激活，而是还原为工具的默认状态） */
  onToolClear () : void

}
