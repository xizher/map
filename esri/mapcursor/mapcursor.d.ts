/** 鼠标样式控制类 */
export declare class MapCursor {
  constructor (mapDivId: string)
  /** 鼠标样式 */
  get cursor () : 'default' | 'pan' | 'panning' | 'wait'
  set cursor (val)
}