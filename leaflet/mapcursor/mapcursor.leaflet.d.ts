/** 地图鼠标样式控制器 */
export declare class MapCursor {
  /**
   * 构造函数
   * @param mapDivId 地图容器Id
   */
  constructor (mapDivId: string)

  /**
   * 设置地图鼠标样式
   * @param type 鼠标样式
   */
  setCursor (type: 'default' | 'pan' | 'panning' | 'wait') : void

}