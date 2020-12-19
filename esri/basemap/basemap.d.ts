import { $Map } from "../mapinit/mapinit";

/** 底图控制类 */
export declare class Basemap {
  constructor (map: $Map, options: Object)
  /** 地图对象（readonly） */
  get map () : $Map
  /** 可选底图项（readonly） */
  get basemapItems () : Object<string, {
    layer: import('esri/layers/Layer'),
    name: string,
    type: string,
    alias: string }
  >
  /** 当前选中的底图项（read & write） */
  get selectedKey () : number
  set selectedKey (key)
  /** 设置底图是否可见 */
  setVisible (visible: boolean) : this
}